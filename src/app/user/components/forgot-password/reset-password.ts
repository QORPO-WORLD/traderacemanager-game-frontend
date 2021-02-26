import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NotifyService } from './../../../common/services/notify.service';
import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/api/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './reset-password.html',
    styleUrls: ['./forgot-password.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    passone = '';
    passonex = '';
    hashId: string;
    uId: string;
    hashObserver: Subscription;
    token: string;
    capInterval: any;
    constructor(protected injector: Injector, private formBuilder: FormBuilder,
                private router: Router, private actv: ActivatedRoute,
                protected api: AuthService, private notify: NotifyService, 
                protected translate: TranslateService, private recaptchaV3Service: ReCaptchaV3Service) {
                this.hashId = this.actv.snapshot.paramMap.get('id');
                this.uId = this.actv.snapshot.paramMap.get('uid');
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            password: [this.passone, Validators.required]
        });

    }

    ngOnDestroy() {
        if (this.hashObserver) {
            this.hashObserver.unsubscribe();
        }
        clearInterval(this.capInterval);
    }



    ngAfterViewInit() {
        setTimeout(() => {
            this.executeImportantAction();
        }, 500);
        this.capInterval = setInterval(() => {
            this.executeImportantAction();
        }, 30000);

    }

    get f() {
        return this.registerForm.controls;
    }


    onSubmit() {
        this.submitted = true;

        if ((this.passone !== this.passonex) || (this.passonex.length < 5 || this.passone.length < 5)) {
            return;
        }

        this.loading = true;

        this.hashObserver = this.api.authUsersResetPasswordConfirm({
            code: this.hashId,
            email: this.uId,
            password: this.passonex,
            recaptchaToken: this.token
        }).subscribe(data => {
            this.translate.get('nitro_notifiq').subscribe((res) => {
                this.notify.error(res.sucess_redirect);
            });
            setTimeout(() => {
                this.router.navigate(['/user/sign-in']);
            }, 2000);
        });

    }

    
  executeImportantAction(): void {
    this.recaptchaV3Service.execute('signIn')
      .subscribe((token) => {

        this.token = token
      });
  }

}
