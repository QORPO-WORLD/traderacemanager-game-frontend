import { Router } from '@angular/router';
import { NotifyService } from './../../../common/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
    return this._http.put('https://dev-api.traderacemanager.com/me/activate-account', {
      code: this.myCode
    },
      { observe: 'response' });
  }

  tryActivation() {
    this.activate().subscribe({
      next: data => this.resolveActivation(data),
      error: error => this.notify.error(error.description)
    });
  }

  resolveActivation(data) {
    this.auth.login(null);
  }
}
