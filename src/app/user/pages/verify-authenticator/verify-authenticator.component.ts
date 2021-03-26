import { Router } from '@angular/router';
import { NotifyService } from './../../../common/services/notify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment.prod';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Component({
  selector: 'app-verify-authenticator',
  templateUrl: './verify-authenticator.component.html',
  styleUrls: ['./verify-authenticator.component.scss'],
})
export class VerifyauthenticatorComponent implements OnInit {

  myCode = '';
  loading = false;
  constructor(private _http: HttpClient, private notify: NotifyService, private router: Router, private auth: AuthService) { }

  ngOnInit() { }

  activate() {
    return this._http.post(environment.api_url + '/me/validate-mfa-code', {
      code: this.myCode
    }, httpOptions);
  }

  resend() {
    return this._http.post(environment.api_url + '/me/resend-account-activation-code', {
      code: this.myCode
    },
      httpOptions);
  }

  tryActivation() {
    this.loading = true;
    this.activate().subscribe({
      next: data => this.resolveActivation(data),
      error: error => this.notify.error(error.message)
    });
    setTimeout(() => { this.loading = false; }, 5000);
  }

  resolveActivation(data) {
    if (data.result === false) {
      this.notify.error('Invalid code');
      this.loading = false;
    }
    this.auth.login(null);
  }

  resendActivation() {
    this.resend().subscribe({
      next: data => console.log(data),
      error: error => this.notify.error(error.message)
    });
    this.myCode = '';
  }

  signout() {
    this.auth.logout();
  }
}
