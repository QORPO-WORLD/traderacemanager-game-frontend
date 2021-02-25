import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../api/services/auth.service';
import { Subscription } from 'rxjs';
import { Component, Injector, OnInit, OnDestroy, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { AbstractComponent } from '../../../common/components/abstract.component';

import { SocialService } from '../../services/social.service';
import { HttpClient } from '@angular/common/http';
import { PlatformService } from 'src/app/common/services/platform.service';
import { Platform } from '@ionic/angular';
//import { RecaptchaComponent } from 'ng-recaptcha';
@Component({
  selector: 'app-wlogin',
  styleUrls: ['./wlogin.scss'],
  templateUrl: './wlogin.html'
})
export class WloginComponent extends AbstractComponent implements OnInit, OnDestroy, AfterViewInit {
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
 // private invisibleRecaptcha: RecaptchaComponent;

  constructor(protected injector: Injector, private api: AuthService, private authsrvc: SocialService,
    private formBuilder: FormBuilder, private _http: HttpClient, private pltfrm: PlatformService,
    private platform: Platform) {
    super(injector);
  }

  get f() {
    return this.reactiveForm.controls;
  }

  ngAfterViewInit() {
    this.myDomain = window.location.hostname;
  /*  if (this.myDomain === 'localhosts') {
      this.disCap = true;
      this.usingCap = false;
      this.myCap = 'vnwiovniorw89545489';
      setTimeout(() => {
        this.invisibleRecaptcha.execute();
      }, 500);
    }
*/
  }

  ngOnInit() {
    this.reactiveForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptchaReactive: new FormControl(this.myCap, Validators.required)
    });
  }

  ngOnDestroy() {
    if (this.subsqription) {
      this.subsqription.unsubscribe();
    }
  }

  public submit() {
    if (this.usingCap === false) {
      if (this.usinggauth === false) {
        if (this.f.username.value === '' || this.f.password.value === '') {
          return;
        }

        this.loading = true;
        this.loginAuth(this.f.username.value, this.f.password.value).subscribe({
          next: data => this.getAuthService().login(data.body),
          error: error => error.status === 456 ? this.fireGAuth() : this.capAndError(error)
        });

      } else {
        if (this.f.username.value === '' || this.f.password.value === '' || this.gkey === '') {
          return;
        }

        this.loading = true;

        this.loginAuthUsingG(this.f.username.value, this.f.password.value, this.gkey).subscribe({
          next: data => this.getAuthService().login(data.body),
          error: error => this.capAndError(error)
        });

      }
    } else {
      if (this.usinggauth === false) {
        if (this.f.username.value === '' || this.f.password.value === '') {
          return;
        }
        this.loading = true;
        this.loginAuthNoCapV2(this.f.username.value, this.f.password.value).subscribe({
          next: data => this.getAuthService().login(data.body),
          error: error => error.status === 456 ? this.fireGAuth() : this.getErrorService().apiError(error)
        });
      } else {
        if (this.f.username.value === '' || this.f.password.value === '' || this.gkey === '') {

          return;
        }
        this.loading = true;

        this.loginAuthUsingGNoCapV2(this.f.username.value, this.f.password.value, this.gkey).subscribe({
          next: data => this.getAuthService().login(data.body),
          error: error => this.getErrorService().apiError(error)
        });
      }
    }
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }


  public facebookOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_FACEBOOK);
  }

  public googleOauth() {
    this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_GOOGLE);
  }

  loginAuth(user, pass) {
    console.log(1);
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create/', {
      email: user, password: pass,
      recaptcha_token: this.response
    },
      { observe: 'response' });

  }

  loginAuthUsingG(user, pass, gcode) {
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create/', {
      email: user, password: pass, authcode: gcode,
      recaptcha_token: this.response
    },
      { observe: 'response' });
  }
  loginAuthNoCap(user, pass) {
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create-in-desktop/', {
      email: user, password: pass,
      recaptcha_token: this.response
    },
      { observe: 'response' });
  }
  loginAuthUsingGNoCap(user, pass, gcode) {
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create-in-desktop/', {
      email: user, password: pass, authcode: gcode,
      recaptcha_token: this.response
    },
      { observe: 'response' });
  }

  loginAuthNoCapV2(user, pass) {
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create-in-desktop/', {
      email: user, password: pass,
      recaptcha_token: this.capxx.recaptchaReactive.value
    },
      { observe: 'response' });
  }
  loginAuthUsingGNoCapV2(user, pass, gcode) {
    return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/jwt/create-in-desktop/', {
      email: user, password: pass, authcode: gcode,
      recaptcha_token: this.capxx.recaptchaReactive.value
    },
      { observe: 'response' });
  }



  fireGAuth() {
    this.usinggauth = true;
    this.gauthfired = true;
  }

  get capxx() {
    return this.reactiveForm.controls;
  }

  capAndError(error) {
    this.getErrorService().apiError(error);
  }

}
