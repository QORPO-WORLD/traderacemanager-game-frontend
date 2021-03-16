import { environment } from './../../../../environments/environment.prod';
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
  chainId = 137;
  trying = false;
  dangerInterval: any;
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
  }

  ngOnInit() {
    this.reactiveForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptchaReactive: new FormControl(this.myCap, Validators.required)
    });
    this.mmewinterval = setInterval(() => {
      const mmew = JSON.parse(localStorage.getItem('mmealq'));
      if (mmew && this.submitted === false) {
        this.submitted = true;
        this.mmewa = mmew;
        if (location.href === 'https://traderacemanager.com/user/sign-in') {
          this.submit();
        }
        
      }
      const chaind = JSON.parse(localStorage.getItem('chaind'));
      if (chaind) {
        this.chainId = Number(chaind);
        this.mmewa = mmew;
      }
    }, 800);
  }

  ngOnDestroy() {
    if (this.subsqription) {
      this.subsqription.unsubscribe();
    }
    clearInterval(this.capInterval);
    clearInterval(this.mmewinterval);
    clearInterval(this.dangerInterval);
    this.token = null;
  }

  public submit() {
    if (this.f.username.value === '' || this.f.password.value === '') {
      return;
    }
    this.loading = true;
    this.executeImportantAction();

    this.dangerInterval = setInterval(() => {
      if (this.trying === false && this.token) {
        this.tryLogin();
      }
    }, 300);
  }

  tryLogin() {
    this.trying = true;
    if (this.mmewa) {
      this.signinWithMetamask().subscribe({
        next: data => this.finalizeLogin(data),
        error: error => this.handleError(error)
      });
      return;
    }
    if (this.usinggauth === false) {
      this.loginAuthNoCapV2(this.f.username.value, this.f.password.value).subscribe({
        next: data => this.finalizeLogin(data),
        error: error => this.handleError(error)
      });
    } else {
      this.loginAuthUsingGNoCapV2(this.gkey).subscribe({
        next: data => this.finalizeLogin(data),
        error: error =>  this.handleError(error)
      });
    }
  }

  finalizeLogin(data) {
    this.trying = false;
    this.loading = false;
    this.token = null;
    clearInterval(this.dangerInterval);
    this.getAuthService().login(data);
  }


  public facebookOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_FACEBOOK);
  }

  public googleOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_GOOGLE);
  }

  loginAuthNoCapV2(user, pass) {
    return this._http.post(environment.api_url + '/account/sign-in', {
      email: user, password: pass,
      recaptchaToken: this.token
    },
      httpOptions);
  }
  loginAuthUsingGNoCapV2(gcode) {
    return this._http.post(environment.api_url + '/me/validate-mfa-code', {
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
    return this._http.post(environment.api_url + '/account/metamask-sign-in', {
      password: this.mmewa,
      recaptchaToken: this.token,
      chain_id: this.chainId
    },
      httpOptions);
  }

  tryMetamaskSign() {
    this.signinWithMetamask();
  }

  clearMetamask(error) {
    this.getErrorService().apiError(error);
    //localStorage.removeItem('mmea');
    this.mmewa = null;
    this.metaSwitch = false;
  }

  handleError(error: any) {
    this.trying = false;
    this.loading = false;
    this.token = null;
    clearInterval(this.dangerInterval);
    error.code === 456 ? this.fireGAuth() : this.getErrorService().apiError(error);
  }
}
