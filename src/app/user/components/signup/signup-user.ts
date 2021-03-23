
import { environment } from './../../../../environments/environment.prod';
import { SocialService } from './../../services/social.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifiqService } from './../../../common/services/notifiq.service';

import { Component, Injector, OnInit, OnDestroy, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AbstractComponent } from '../../../common/components/abstract.component';
import { AuthService } from '../../../api/services/auth.service';
import { AuthService as ninja } from '../../services/auth.service';
import { CountryCode, CountryCodes } from '../../components/countries/country-codes';
import { PlatformService } from 'src/app/common/services/platform.service';
import { Platform } from '@ionic/angular';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
declare let fbq:Function;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
};
@Component({
    templateUrl: './signup-user.html',
    styleUrls: ['./signup-user.scss']
})
export class SignupUserComponent extends AbstractComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    passone: string;
    passonex: string;
    referralId: string;
    passonelength: number;
    passonexlength: number;
    countryCodes: Array<CountryCode> = CountryCodes;
    searchText: string;
    selectedCountry: string;
    agreeChecked = false;
    reactiveForm: FormGroup;
    username: string;
    email: string;
    password: string;
    refferal: string;
    myDomain: string;
    disCap = false;
    usingCap = true;
    playedDemo = false;
    myCap: string;
    public version = VERSION.full;
    public response: string;
    metaSwitch = false;
    selectStyling: any = {
        subHeader: 'SELECT YOUR COUNTRY',
        cssClass: 'customSelect'
    };
    routeObserver: Subscription;
    useMail = false;
    show = 'password';
    token: string;
    mmewa: string;
    mmewinterval: any;
    dangerInterval: any;
    showMmew = false;
    trying = false;
    chainId = 137;
    constructor(protected injector: Injector, private formBuilder: FormBuilder,
        private notify: NotifiqService,
        private router: Router, protected api: AuthService, protected route: ActivatedRoute,
        protected ioiapi: ninja, private pltfrm: PlatformService,
        private platform: Platform,
        private _http: HttpClient,
        private recaptchaV3Service: ReCaptchaV3Service,
        private authsrvc: SocialService) {
        super(injector);
        this.referralId = this.route.snapshot.paramMap.get('id');


    }
    ngAfterViewInit() {

    }

    ngOnDestroy() {
        clearInterval(this.mmewinterval);
        clearInterval(this.dangerInterval);
    }

    public checkEmail(obj, valid) {
        if (valid) {

        }
    }

    ngOnInit() {
        this.recognizeDemo();

        this.registerForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.isStrong]),
            nickname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)])
        });
        this.mmewinterval = setInterval(() => {
            const mmew = JSON.parse(localStorage.getItem('mmea'));
            if (mmew) {
                this.showMmew = true;
                this.mmewa = mmew;
            }
            const chaind = JSON.parse(localStorage.getItem('chaind'));
            if (chaind) {
                this.chainId = Number(chaind);
                this.mmewa = mmew;
            }
        }, 2000);
       // const cook = JSON.parse(localStorage.getItem('afilate'));
        //if (cook) {
        //    this.referralId = cook;
        //}
        //const aff_set = JSON.parse(localStorage.getItem('affilate_set'));
        if (this.referralId) {
            this.resolvemeAffilate();
        }

    }

    recognizeDemo() {
        this.routeObserver = this.route.data
            .subscribe(v => {
                if (v.type === 'demo') {
                    this.playedDemo = true;
                }
            });
    }


    get f() {
        return this.registerForm.controls;
    }




    onSubmit() {
        if (this.f.nickname.status === 'INVALID') {
            this.notify.error('validation error', 'Invalid nickname format. Only letters and numbers, min 5 - max 20 digits.');
            return; 
        }
        if (this.f.email.value === '') {
            this.notify.error('validation error', 'Invalid email format. Please use standard xxx@xxx.xx format');
            return; 
        }
        if (this.f.password.status === 'INVALID') {
            this.notify.error('validation error', 'Invalid password format. Min 8 digits, 1 number, 1 small, 1 capital letter are required. (example: ioiGame1)');
            return; 
        }
        this.submitted = true;
        this.passone = '';
        this.passonelength = this.passone.length;
        this.loading = true;
        this.executeImportantAction();

        this.dangerInterval = setInterval(() => {
            if (this.trying === false && this.token) {
              this.trySignup();
            }
        }, 300);

    }

    trySignup() {
        this.trying = true;
        if (this.mmewa) {
            this.signupWithMetamask().subscribe({
                next: data => this.doLogin(data),
                error: error => this.clearMetamask(error.body)
            });
        } else {
            this.api.authUsersCreateDesktop({
                email: this.f.email.value, password: this.f.password.value,
                nick: this.f.nickname.value, country: this.selectedCountry, recaptchaToken: this.token
            }).subscribe(datax => {
                const data: any = datax;
                this.trying = false;
                this.loading = false;
                this.token = null;
                clearInterval(this.dangerInterval);
            
                localStorage.setItem('first-time', JSON.stringify('yes'));
                fbq('track', 'CompleteRegistration');

                this.ioiapi.setToken(data.authKey);
                this.router.navigate(['/user/verify-code']);    
            });
        }
    }


    countryChange(event) {
        this.selectedCountry = event.value.code;
    }

    public facebookOauth() {
        this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_FACEBOOK);
    }

    public googleOauth() {
        this.authsrvc.oauthSocial(SocialService.LOGIN_METHOD_GOOGLE);

    }


    executeImportantAction(): void {
        this.recaptchaV3Service.execute('signUp')
            .subscribe((token) => {

                this.token = token
            });
    }

    signupWithMetamask() {
        return this._http.post(environment.api_url + '/account/metamask-sign-up', {
            password: this.mmewa,
            recaptchaToken: this.token,
            email: this.f.email.value,
            nick: this.f.nickname.value,
            chain_id: this.chainId
        },
            httpOptions);
    }


    setMeAsAffilate() {
        return this._http.post(environment.api_url + '/set-ref', {
            nick: this.referralId
        },
            httpOptions);
    }


    clearMetamask(error) {
        this.getErrorService().apiError(error);
        this.mmewa = null;
        this.metaSwitch = false;
        this.trying = false;
        this.loading = false;
        this.token = null;
        clearInterval(this.dangerInterval);
    }

    
    doLogin(data) {
        this.trying = false;
        this.loading = false;
        this.token = null;
        clearInterval(this.dangerInterval);
       
        localStorage.setItem('first-time', JSON.stringify('yes'));
        fbq('track', 'CompleteRegistration');
        this.ioiapi.login(data.authkey);
    }

    isStrong(control: FormControl): any {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }

    resolvemeAffilate() {
        if (this.referralId) {
            this.setMeAsAffilate().subscribe({
                next: data => this.affSetDone(),
                error: error => console.log(error)
            });
        } 
    }

    affSetDone() {
       // localStorage.setItem('affilate_set', JSON.stringify(true));
      //  localStorage.setItem('affilate', JSON.stringify(this.referralId));
    }
}
