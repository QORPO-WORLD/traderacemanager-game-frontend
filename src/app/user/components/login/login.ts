import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../api/services/auth.service';
import { Subscription } from 'rxjs';
import { Component, Injector, OnInit, OnDestroy, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { AbstractComponent } from '../../../common/components/abstract.component';

import { SocialService } from '../../services/social.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformService } from 'src/app/common/services/platform.service';
import { Platform } from '@ionic/angular';
import { ReCaptchaV3Service } from 'ng-recaptcha';
//import { ReCaptchaV3Service } from 'ngx-captcha';
//import { RecaptchaService } from '../../services/recaptcha.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Component({
  selector: 'app-login',
  styleUrls: ['./login.scss'],
  templateUrl: './login.html'
})
export class LoginComponent extends AbstractComponent implements OnInit, OnDestroy, AfterViewInit {
  public username: string;
  public password: string;
  public error: string;
  submitted = false;
  subsqription: Subscription;
  msg: any;
  reactiveForm: FormGroup;
  cap = '';
  gauthfired = false;
  usinggauth = false;
  gkey: string;
  myDomain: string;
  disCap = false;
  loading = false;
  usingCap = true;
  myCap: string;
  public version = VERSION.full;
  public response: string;
  //@ViewChild('invisible', { static: false })
  //private invisibleRecaptcha: RecaptchaComponent;
  show = 'password';

  mmewa: string;
  mmewinterval: any;
  token: string = undefined;
  gfbfired = false;
  capInterval: any;
  metaSwitch = false;
  constructor(protected injector: Injector, private api: AuthService, private authsrvc: SocialService,
    private formBuilder: FormBuilder, private _http: HttpClient, private pltfrm: PlatformService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private platform: Platform) {
    super(injector);

  }

  get f() {
    return this.reactiveForm.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.executeImportantAction();
    }, 500);
    this.capInterval = setInterval(() => {
      this.executeImportantAction();
    }, 30000);

  }

  ngOnInit() {
    this.reactiveForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptchaReactive: new FormControl(this.myCap, Validators.required)
    });
    this.mmewinterval = setInterval(() => {
      const mmew = JSON.parse(localStorage.getItem('mmea'));
      if (mmew && this.submitted === false) {
        this.submitted = true;
        this.mmewa = mmew;
        this.submit();
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.subsqription) {
      this.subsqription.unsubscribe();
    }
    clearInterval(this.capInterval);
    clearInterval(this.mmewinterval);
  }

  public submit() {
    if (this.mmewa) {
      this.signinWithMetamask().subscribe({
        next: data => this.getAuthService().login(data),
        error: error => error.status === 456 ? this.fireGAuth() : this.clearMetamask(error.body)
      });
      return;
    }
    if (this.usinggauth === false) {
      if (this.f.username.value === '' || this.f.password.value === '') {
        return;
      }
      this.loading = true;
      this.loginAuthNoCapV2(this.f.username.value, this.f.password.value).subscribe({
        next: data => this.getAuthService().login(data),
        error: error => error.status === 456 ? this.fireGAuth() : this.getErrorService().apiError(error)
      });
    } else {
      if (this.f.username.value === '' || this.f.password.value === '' || this.gkey === '') {

        return;
      }
      this.loading = true;



      this.loginAuthUsingGNoCapV2(this.gkey).subscribe({
        next: data => this.getAuthService().login(data),
        error: error => this.getErrorService().apiError(error)
      });
    }

    setTimeout(() => {
      this.executeImportantAction();
      this.loading = false;
    }, 10000);
  }


  public facebookOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_FACEBOOK);
  }

  public googleOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_GOOGLE);
  }

  loginAuth(user, pass) {
    return this._http.post('/api/auth/jwt/create/', {
      email: user, password: pass,
      recaptchaToken: this.token
    },
      httpOptions);

  }

  loginAuthUsingG(user, pass, gcode) {
    return this._http.post('/api/auth/jwt/create/', {
      email: user, password: pass, authcode: gcode,
      recaptchaToken: this.token
    },
      httpOptions);
  }
  loginAuthNoCap(user, pass) {
    return this._http.post('/api/auth/jwt/create-in-desktop/', {
      email: user, password: pass,
      recaptchaToken: this.token
    },
      httpOptions);
  }
  loginAuthUsingGNoCap(user, pass, gcode) {
    return this._http.post('/api/auth/jwt/create-in-desktop/', {
      email: user, password: pass, authcode: gcode,
      recaptchaToken: this.token
    },
      httpOptions);
  }

  loginAuthNoCapV2(user, pass) {
    return this._http.post('/api/account/sign-in', {
      email: user, password: pass,
      recaptchaToken: this.token
    },
      httpOptions);
  }
  loginAuthUsingGNoCapV2(gcode) {
    return this._http.post('/api/me/validate-mfa-code', {
      authcode: gcode
    },
      httpOptions);
  }



  fireGAuth() {
    this.loading = false;
    this.usinggauth = true;
    this.gauthfired = true;
  }

  get capxx() {
    return this.reactiveForm.controls;
  }

  capAndError(error) {
    this.getErrorService().apiError(error);
  }


  executeImportantAction(): void {
    this.recaptchaV3Service.execute('signIn')
      .subscribe((token) => {

        this.token = token
      });
  }


  signinWithMetamask() {
    return this._http.post('/api/account/metamask-sign-in', {
      password: this.mmewa,
      recaptchaToken: this.token

    },
      httpOptions);
  }

  tryMetamaskSign() {
    this.signinWithMetamask();
  }

  clearMetamask(error) {
    this.getErrorService().apiError(error);
    localStorage.removeItem('mmea');
    this.mmewa = null;
    this.metaSwitch = false;
  }
}
