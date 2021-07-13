import { NotifyService } from "./../../../common/services/notify.service";
import { Component, Injector, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/api/services";
import { TranslateService } from "@ngx-translate/core";
declare let grecaptcha: any;
@Component({
  templateUrl: "./reset-password.html",
  styleUrls: ["./forgot-password.scss"],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  passone = "";
  passonex = "";
  hashId: string;
  uId: string;
  hashObserver: Subscription;
  token: string;
  capInterval: any;
  constructor(
    protected injector: Injector,
    private formBuilder: FormBuilder,
    private router: Router,
    private actv: ActivatedRoute,
    protected api: AuthService,
    private notify: NotifyService,
    protected translate: TranslateService
  ) {
    this.hashId = this.actv.snapshot.paramMap.get("id");
    this.uId = this.actv.snapshot.paramMap.get("uid");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      password: [this.passone, Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.hashObserver) {
      this.hashObserver.unsubscribe();
    }
    clearInterval(this.capInterval);
  }

  ngAfterViewInit() {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.passonex.length < 5 || this.passone.length < 5) {
      this.notify.error("Password is too short");
      return;
    }
    if (this.passone !== this.passonex) {
      this.notify.error("Passwords are not matching");
      return;
    }

    this.loading = true;
    this.executeImportantAction();
    setTimeout(() => {
      this.hashObserver = this.api
        .authUsersResetPasswordConfirm({
          code: this.hashId,
          email: this.uId,
          password: this.passonex,
          recaptchaToken: this.token,
        })
        .subscribe((data) => {
          this.translate.get("nitro_notifiq").subscribe((res) => {
            this.notify.error(res.sucess_redirect);
          });
          setTimeout(() => {
            this.router.navigate(["/user/sign-in"]);
          }, 2000);
        });
    }, 1400);
  }

  executeImportantAction(): void {
    this.token = null;
    grecaptcha.enterprise
      .execute("6LdgmbUaAAAAAEqxCqDgS3MbmPN_Y18URkBaTpNE", {
        action: "resetPassword",
      })
      .then((token) => {
        this.token = token;
      });
  }
  scrollTop(elem1: HTMLElement) {
    let timeout1 = window.setTimeout(() => {
      elem1.scrollIntoView({ behavior: "smooth", block: "start" });
      clearTimeout(timeout1);
    }, 200);
  }
}
