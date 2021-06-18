import { WalletBalance } from './../../api/models/wallet-balance';
import { Muser } from './../models/identity';

import { AuthService as Ninja } from 'src/app/api/services/auth.service';
import { Injectable, Injector } from '@angular/core';
import { Token } from 'src/app/user/models/token';
import { Observable } from 'rxjs';
import { AuthResource } from 'src/app/user/resources/auth.resource';
import { AbstractService } from 'src/app/common/services/abstract.service';

import { Router } from '@angular/router';
import { Identity } from 'src/app/user/models/identity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DriversService, AffiliatesService, LeaderboardService } from 'src/app/api/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
declare let ga: any;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Injectable()
export class AuthService extends AbstractService {
  expirationDate: Date;
  isExpired: boolean;
  identity: Muser;
  helper = new JwtHelperService();
  public data = {};
  decodedToken: any;
  token: Token;
  balanceInterval: any;
  driverBalance: WalletBalance;

  constructor(private injector: Injector, private resource: AuthResource, private router: Router, protected api: Ninja,
    private drvrsrvc: DriversService, private affisrvc: AffiliatesService, private ldrbrdSrvc: LeaderboardService,
    private _http: HttpClient) {
    super();
  }


  public login(token) {
    localStorage.setItem('bal-first-time', 'true');
    this.setToken(token);
    setTimeout(() => {
      this.me();
     }, 10);


    
    return null;

  }

  loginGWithSignup(token) {

    localStorage.setItem('bal-first-time', 'true');
    this.setToken(token.jwt);
    this.me();
    return token.jwt;

  }
  loginGWithNoSignup(token) {

    localStorage.setItem('bal-first-time', 'true');
    this.setToken(token.jwt);
    this.me();
    return token.jwt;

  }




  autologin(): void {
    this.me();
  }

  /**
   * get logged user data
   */
  me() {

    this.drvrsrvc.driversInitial().subscribe(data => {
      this.setIdentity(data);
      this.drvrsrvc.driversBalances().subscribe(bal => {
        this.setBalance(bal);

        this.ldrbrdSrvc.leaderboardMe({
          page: 1, lastMonth: false
        })
          .subscribe(ldata => {
            this.setLeaderboardMe(ldata);
            const hasLastRoute =  JSON.parse(localStorage.getItem('last-route'));
   
            if (hasLastRoute) {
              this.router.navigate([hasLastRoute]);
              setTimeout(() => { localStorage.removeItem('last-route'); }, 200);
            } else {
              this.router.navigate(['/race/start-race']);
            }
            ga('event', 'prihlaseni', {
              'eventCategory': 'prihlaseni',
              'eventAction': 'prihlaseni',
              'value': 'prihlaseni dokonceno'
            });
          });
      });

    });

  }

  updateBalance() {
    this.drvrsrvc.driversBalances().subscribe(bal => {
      this.setBalance(bal);
    });
  }

  setBalance(bal) {
    localStorage.setItem('user-balance', JSON.stringify(bal));
    this.driverBalance = bal;
  }

  getBalance() {
    const balance = JSON.parse(localStorage.getItem('user-balance'));
    this.driverBalance = balance;
    return balance;

  }


  updateDriverMe() {
    this.drvrsrvc.driversInitial().subscribe(data => {
      this.setIdentity(data);
    });
  }

  setDriverMe(driver) {
    localStorage.setItem('driver-me', JSON.stringify(driver));
  }

  getDriverMe() {
    const balance = JSON.parse(localStorage.getItem('auth-us'));
    return balance;
  }

  updateLeaderboardMe() {
    this.ldrbrdSrvc.leaderboardMe({
      page: 1, lastMonth: false
    })
      .subscribe(data => {
        this.setLeaderboardMe(data);
      });
  }

  setLeaderboardMe(driver) {
    localStorage.setItem('ldrbrd-me', JSON.stringify(driver));
  }

  getLeaderboardMe() {
    const balance = JSON.parse(localStorage.getItem('ldrbrd-me'));
    return balance;
  }

  meUpdate() {
    this.drvrsrvc.driversInitial().subscribe(data => {
      this.setIdentity(data);
    });

  }

  refreshToken(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('auth-token'));
    if (!token) {
      this.logout();
      return Observable.of(false);
    } else {
      //const identity = new Identity({});
      //token.refresh = this.getToken().refresh;
      const backuprefresh = token.refresh;
      const isExpiredToken = this.decodeToken(token.refresh);
      if (isExpiredToken === true) {
        this.logout();
      } else {
        this.api.authJwtRefreshCreate({ refresh: token.refresh }).subscribe(data => {
          if (data.access) {
            this.setToken({ access: data.access, refresh: backuprefresh });
            return data;
          } else {
            this.logout();
            return Observable.of(data);
          }
        });
      }
    }
  }



  logout(): Observable<any> {
    this.clearToken();
    this.clearIdentity();
    this.logOutApi().subscribe({
      next: data => this.router.navigate(['/user/welcome']),
      error: error => this.router.navigate(['/user/welcome'])
    });
    


    return Observable.of({
      action: 'signout'
    });
 
  }

  initSession() {

    this.api.initSession().subscribe(data => {
      console.log('session initialized');
    });
  }


  setToken = function (token) {
    if (token) {
      this.token = token;
      localStorage.setItem('auth-token', JSON.stringify(token));
      localStorage.setItem('ndate', JSON.stringify(Date.now()));
    }
  };

  refreshingGone() {
    localStorage.setItem('refresh-used', 'true');
  }

  getToken() {
    const data = JSON.parse(localStorage.getItem('auth-token'));
    return data;
  }


  clearToken() {
    this.token = undefined;
    localStorage.removeItem('refresh-used');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('ndate');
  }


  hasToken() {
    this.getStorageToken();
    if (this.token === null) {
      return false;
    } else {
      return true;
    }
  }

  hasRefreshedTooMuch() {
    const data = localStorage.getItem('auth-token');
    if (data === null) {
      return false;
    } else {
      return true;
    }
  };


  getStorageToken = function () {
    const data = localStorage.getItem('auth-us');
    if (data !== undefined) {
      this.token = JSON.parse(data);
    }
    return this.token;
  };


  setIdentity = function (identity) {
    this.identity = identity;
    localStorage.setItem('auth-us', JSON.stringify(identity));
/*
    if (identity.is_verified === false) {
      localStorage.setItem('first-time', JSON.stringify('yes'));
    }

    */
  };

  getIdentity = function (): Identity {
    return this.identity;
  };

  clearIdentity = function () {
    this.identity = undefined;
    localStorage.removeItem('auth-us');
    localStorage.removeItem('aff');
    localStorage.removeItem('bal-first-time');
    localStorage.removeItem('used-lang');
    localStorage.removeItem('user-balance');
    localStorage.removeItem('driver-me');
    localStorage.removeItem('ldrbrd-me');

    localStorage.removeItem('first-time');
    localStorage.removeItem('mmea');
    localStorage.clear();
  };

  hasIdentity = function (): boolean {
    this.getStorageIdentity();
    return this.identity !== undefined;
  };

  getStorageIdentity = function () {
    const data = localStorage.getItem('auth-us');
    if (data) {
      this.identity = JSON.parse(data);
    } else {

      return;
    }
    return this.identity;
  };

  getStorageAff = function () {
    const data = localStorage.getItem('auth-us');
    let afx: any = null;
    if (data) {
      afx = JSON.parse(data);
    }
    return afx;
  };

  decodeToken(tkn: string) {
    if (tkn) {
      this.decodedToken = this.helper.decodeToken(tkn);
      this.expirationDate = this.helper.getTokenExpirationDate(tkn);
      this.isExpired = this.helper.isTokenExpired(tkn);

      return this.isExpired;
    }
  }

  tokenExpires(tkn: string) {
    if (tkn) {
      this.expirationDate = this.helper.getTokenExpirationDate(tkn);


      const dateNow = new Date();
      const secondsNow = dateNow.getTime() / 1000;
      const newdate = new Date(this.expirationDate).getTime() / 1000;
      const finalDate = newdate - secondsNow;
    }
  }

  
  logOutApi() {
    return this._http.get(environment.api_url + '/me/sign-out', 
      httpOptions);

  }

  setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}
