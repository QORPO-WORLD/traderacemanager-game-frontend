import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NotifyService } from './../../../common/services/notify.service';
import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AbstractComponent } from '../../../common/components/abstract.component';
import { AuthService } from '../../../api/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './forgot-password.html',
    styleUrls: ['./forgot-password.scss']
})
export class ForgotPasswordComponent extends AbstractComponent implements OnInit, OnDestroy {
    forgotForm: FormGroup;
    loading = false;
    submitted = false;
    email: string;
    token: string;
    capInterval: any;
    constructor(protected injector: Injector, private formBuilder: FormBuilder,
        private router: Router, protected api: AuthService, private notify: NotifyService,
        protected translate: TranslateService, private recaptchaV3Service: ReCaptchaV3Service) {
        super(injector);
    }

    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    ngOnDestroy() {
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
        return this.forgotForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }

        this.loading = true;
        const data = this.forgotForm.controls['email'].value;

        this.api.authUsersResetPassword({
            email: data,
            recaptchaToken: this.token
        }).subscribe(datanext => {
            this.translate.get('nitro_notifiq').subscribe((res) => {
                this.notify.error(res.open_link_follow);
                this.loading = false;
            });
        });
    }


    executeImportantAction(): void {
        this.recaptchaV3Service.execute('signIn')
            .subscribe((token) => {

                this.token = token
            });
    }

}
