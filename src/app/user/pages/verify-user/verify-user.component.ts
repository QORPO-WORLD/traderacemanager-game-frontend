import { Router } from '@angular/router';
import { NotifyService } from './../../../common/services/notify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent implements OnInit {

  myCode = '';

  constructor(private _http: HttpClient, private notify: NotifyService, private router: Router, private auth: AuthService) { }

  ngOnInit() { }

  activate() {
    return this._http.put('/api/me/activate-account', {
      code: this.myCode
    }, httpOptions );
  }

  resend() {
    return this._http.put('/api/me/resend-account-activation-code', {
      code: this.myCode
    },
      httpOptions);
  }

  tryActivation() {
    this.activate().subscribe({
      next: data => this.resolveActivation(data),
      error: error => this.notify.error(error.description)
    });
  }

  resolveActivation(data) {
    console.log(data);
    this.auth.login(null);
  }

  resendActivation() {
    this.resend().subscribe({
      next: data => console.log(data),
      error: error => this.notify.error(error.description)
    });
    this.myCode = '';
  }
}
