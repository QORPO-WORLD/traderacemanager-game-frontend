import { SocialService } from './../../services/social.service';
import { HttpClient } from '@angular/common/http';
import { NotifiqService } from './../../../common/services/notifiq.service';

import { Component, Injector, OnInit, OnDestroy, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AbstractComponent } from '../../../common/components/abstract.component';
import { AuthService } from '../../../api/services/auth.service';
import { AuthService as ninja } from '../../../api/services';
import { CountryCode, CountryCodes } from '../../components/countries/country-codes';
import { PlatformService } from 'src/app/common/services/platform.service';
import { Platform } from '@ionic/angular';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './signup-user.html',
    styleUrls: ['./signup-user.scss']
})
export class SignupUserComponent extends AbstractComponent implements OnInit {
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
    showMmew = false;
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
        setTimeout(() => {
            this.executeImportantAction();
        }, 500);
    }

    public checkEmail(obj, valid) {
        if (valid) {

        }
    }

    ngOnInit() {
        this.recognizeDemo();

        this.registerForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            nickname: new FormControl('', Validators.required)
        });
        this.mmewinterval = setInterval(() => {
            const mmew = JSON.parse(localStorage.getItem('mmea'));
            if (mmew) {
                this.showMmew = true;
                this.mmewa = mmew;
            }
        }, 5000);
        if (this.referralId) {
            const cname = 'affiliate_reference';
            const d  = new Date();
            const expires = d.setTime(d.getTime() + (100*24*60*60*1000));;
            document.cookie = cname + "=" + this.referralId + "; expires=" + expires + ";domain=.traderacemanager.com;path=/;";
            console.log(document.cookie);
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
    get xf() {
        return this.reactiveForm.controls;
    }



    onSubmit() {

        this.submitted = true;
        this.passone = '';


        this.passonelength = this.passone.length;

        // stop here if form is invalid

        this.loading = true;


            this.api.authUsersCreateDesktop({
                email: this.f.email.value, password: this.f.password.value, 
                nick: this.f.nickname.value, country: this.selectedCountry, recaptchaToken: this.token
            }).subscribe(datax => {
                const xxx: any = datax;
                localStorage.setItem('first-time', JSON.stringify('yes'));

                this.router.navigate(['/user/verify-code']);
                // this.notify.info('info', 'Activation email has been sent to your registration email.', 2000);

            });
        
        this.executeImportantAction();
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
}
