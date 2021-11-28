import { environment } from "./../../../../environments/environment.prod";
import { SocialService } from "./../../services/social.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotifiqService } from "./../../../common/services/notifiq.service";

import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  VERSION,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { first } from "rxjs/operators";
import { AbstractComponent } from "../../../common/components/abstract.component";
import { AuthService } from "../../../api/services/auth.service";
import { AuthService as ninja } from "../../services/auth.service";
import {
  CountryCode,
  CountryCodes,
} from "../../components/countries/country-codes";
import { PlatformService } from "src/app/common/services/platform.service";
import { Platform } from "@ionic/angular";

import { Subscription } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
declare let grecaptcha: any;
declare let ga: any;
declare let fbq: Function;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
};
@Component({
  templateUrl: "./signup-user.html",
  styleUrls: ["./signup-user.scss"],
})
export class SignupUserComponent
  extends AbstractComponent
  implements OnInit, OnDestroy
{
  countDownActive: boolean;
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
  repeatPassword: string;
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
    subHeader: "SELECT YOUR COUNTRY",
    cssClass: "customSelect",
  };
  routeObserver: Subscription;
  useMail = false;
  show = "password";
  repeatShow = "password";
  token: string;
  mmewa: string;
  mmewinterval: any;
  dangerInterval: any;
  showMmew = false;
  trying = false;
  chainId = 137;
  newsChecked = false;

  //password requirements
  passwordClicked = false;
  capitalLetter = false;
  smallLetter = false;
  oneNumber = false;
  specialCharacter = false;
  minLength = false;

  constructor(
    protected injector: Injector,
    private formBuilder: FormBuilder,
    private notify: NotifiqService,
    private router: Router,
    protected api: AuthService,
    protected route: ActivatedRoute,
    protected ioiapi: ninja,
    private pltfrm: PlatformService,
    private platform: Platform,
    private _http: HttpClient,
    private authsrvc: SocialService
  ) {
    super(injector);
    this.referralId = this.route.snapshot.paramMap.get("id");
  }
  ngAfterViewInit() {}

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
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.isStrong,
      ]),
      repeatPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.isStrong,
      ]),
      nickname: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
      ]),
    });
    this.mmewinterval = setInterval(() => {
      const mmew = JSON.parse(localStorage.getItem("mmea"));
      if (mmew) {
        this.showMmew = true;
        this.mmewa = mmew;
      }
      const chaind = JSON.parse(localStorage.getItem("chaind"));
      if (chaind) {
        this.chainId = Number(chaind);
        this.mmewa = mmew;
      }
    }, 2000);
    if (this.referralId) {
      this.resolvemeAffilate();
    }

    this.getAuthService().initSession();
  }

  recognizeDemo() {
    this.routeObserver = this.route.data.subscribe((v) => {
      if (v.type === "demo") {
        this.playedDemo = true;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.f.nickname.status === "INVALID") {
      this.notify.error(
        "validation error",
        "Invalid nickname format. min 8 - max 20 characters. Follow requirements!"
      );
      return;
    }
    if (
      this.f.email.value === "" ||
      this.f.email.value == undefined ||
      this.validateEmail(this.f.email.value) === false
    ) {
      this.notify.error(
        "validation error",
        "Invalid email format. Please use standard xxx@xxx.xx format"
      );
      return;
    }
    if (this.f.password.status === "INVALID" && !this.mmewa) {
      this.notify.error(
        "validation error",
        "Invalid password format. Min 8 characters, 1 number, 1 small, 1 capital letter and 1 special character are required. (example: ioiGame123*)"
      );
      return;
    }
    if (this.f.password.value !== this.f.repeatPassword.value && !this.mmewa) {
      this.notify.error("validation error", "Passwords do not match");
      return;
    }
    this.submitted = true;
    this.passone = "";
    this.passonelength = this.passone.length;
    this.loading = true;
    this.executeImportantAction();

    this.dangerInterval = setInterval(() => {
      if (this.trying === false && this.token) {
        this.trySignup();
      }
    }, 300);
    setTimeout(() => {
      this.loading = false;
      this.trying = false;
    }, 3000);
  }

  trySignup() {
    this.trying = true;
    clearInterval(this.dangerInterval);
    if (this.mmewa) {
      this.signupWithMetamask().subscribe({
        next: (data) => this.doLogin(data),
        error: (error) => this.clearMetamask(error),
      });
    } else {
      this.api
        .authUsersCreateDesktop({
          email: this.f.email.value,
          password: this.f.password.value,
          nick: this.f.nickname.value,
          country: this.selectedCountry,
          recaptchaToken: this.token,
          news_agree: this.newsChecked,
        })
        .subscribe(
          (datax) => {
            const data: any = datax;
            this.trying = false;
            this.loading = false;
            this.token = null;
            clearInterval(this.dangerInterval);

            localStorage.setItem("first-time", JSON.stringify("yes"));
            fbq("track", "CompleteRegistration");

            this.ioiapi.setToken(data.authKey);
            this.router.navigate(["/user/verify-code"]);
            ga("event", "nedokoncena", {
              eventCategory: "registrace",
              eventAction: "nedokoncena",
              value: "registrace dokoncena",
            });
          },
          (error) => {
            this.notify.error("Error", error.error.message);
          }
        );
    }
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
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
    this.token = null;
    grecaptcha.enterprise
      .execute("6LdgmbUaAAAAAEqxCqDgS3MbmPN_Y18URkBaTpNE", { action: "signUp" })
      .then((token) => {
        this.token = token;
      });
  }

  signupWithMetamask() {
    return this._http.post(
      environment.api_url + "/account/metamask-sign-up",
      {
        password: this.mmewa,
        recaptchaToken: this.token,
        email: this.f.email.value,
        nick: this.f.nickname.value,
        chain_id: this.chainId,
        news_agree: this.newsChecked,
      },
      httpOptions
    );
  }

  setMeAsAffilate() {
    return this._http.post(
      environment.api_url + "/set-ref",
      {
        nick: this.referralId,
      },
      httpOptions
    );
  }

  clearMetamask(error) {
    //this.getErrorService().apiError(error);

    this.notify.error("", error.error.description);
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

    localStorage.setItem("first-time", JSON.stringify("yes"));
    fbq("track", "CompleteRegistration");
    this.ioiapi.login(data.authkey);
    ga("event", "nedokoncena", {
      eventCategory: "registrace",
      eventAction: "nedokoncena",
      value: "registrace dokoncena",
    });
  }

  isStrong(control: FormControl): any {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      control.value
    );
    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return null;
  }

  resolvemeAffilate() {
    if (this.referralId) {
      this.setMeAsAffilate().subscribe({
        next: (data) => this.affSetDone(),
        error: (error) => console.log(error),
      });
    }
  }

  affSetDone() {
    // localStorage.setItem('affilate_set', JSON.stringify(true));
    //  localStorage.setItem('affilate', JSON.stringify(this.referralId));
  }
  scrollTop(elem1: HTMLElement) {
    let timeout1 = window.setTimeout(() => {
      elem1.scrollIntoView({ behavior: "smooth", block: "start" });
      clearTimeout(timeout1);
    }, 200);
  }
  //countdown event
  resolveDate() {
    var date2 = new Date();
    var date1 = new Date(2021, 10, 25, 8, 0, 0, 0);
    var date2value = date2.getTime();
    var date1value = date1.getTime();
    var dif = date1value - date2value;
    if (date2value < date1value) {
      this.countDownActive = true;
    } else {
      this.countDownActive = false;
    }
    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    interface TickEvent {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }

    interface CountdownEvents {
      tick(values: TickEvent): void;
      expired(): void;
      stop(): void;
    }

    type EventMap<T> = { [K in keyof T]: Function[] };

    class Countdown {
      public listeners: EventMap<CountdownEvents> = {
        tick: [],
        expired: [],
        stop: [],
      };

      public timer?: any;

      on<K extends keyof CountdownEvents>(
        eventName: K,
        listener: CountdownEvents[K]
      ): void {
        this.listeners[eventName].push(listener);
      }

      off<K extends keyof CountdownEvents>(
        eventName: K,
        listener: CountdownEvents[K]
      ): void {
        const listeners = this.listeners[eventName];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }

      start(date: Date) {
        const end = Math.floor(date.getTime() / 1000);
        const daysValue: any = document.getElementById("days");
        const hoursValue: any = document.getElementById("hours");
        const minutesValue: any = document.getElementById("minutes");
        const secondsValue: any = document.getElementById("seconds");

        const tick = () => {
          const now = Date.now();
          const nowSec = Math.floor(now / 1000);
          const time = end - nowSec;

          if (time <= 0) {
            delete this.timer;
            this.listeners.expired.forEach((listener) => listener());
            return;
          }

          const minute = 60;
          const hour = minute * 60;
          const day = hour * 24;

          const days = Math.floor(time / day);
          const hours = Math.floor((time % day) / hour);
          const minutes = Math.floor((time % hour) / minute);
          const seconds = time % minute;

          this.listeners.tick.forEach((listener) =>
            listener({ days, hours, minutes, seconds })
          );

          const timeToNextSecond = (nowSec + 1) * 1000 - now;
          this.timer = setTimeout(tick, timeToNextSecond);
          daysValue.innerHTML = days;
          hoursValue.innerHTML = hours;
          minutesValue.innerHTML = minutes;
          secondsValue.innerHTML = seconds;
        };

        tick();
      }

      stop() {
        if (this.timer) {
          clearTimeout(this.timer);
          delete this.timer;
          this.listeners.stop.forEach((listener) => listener());
        }
      }
    }

    const countdown = new Countdown();
    // countdown.on("tick", (event) => console.log("tick", event));
    countdown.on("expired", () => {
      // console.log("expired");
      this.countDownActive = false;
    });
    // countdown.on('stop', () => console.log('stopped'));

    const date = new Date();

    if (date2value < date1value) {
      this.countDownActive = true;
      date.setSeconds(date.getMinutes() + Seconds_Between_Dates);
      countdown.start(date);
    } else {
      this.countDownActive = false;
    }
  }
  checkPasswordRequirements() {
    if (/[A-Z]/.test(this.password) === true) {
      this.capitalLetter = true;
    } else {
      this.capitalLetter = false;
    }
    if (/[a-z]/.test(this.password) === true && this.password != undefined) {
      this.smallLetter = true;
    } else {
      this.smallLetter = false;
    }
    if (/[1-9]/.test(this.password) === true) {
      this.oneNumber = true;
    } else {
      this.oneNumber = false;
    }
    if (
      /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.password) === true
    ) {
      this.specialCharacter = true;
    } else {
      this.specialCharacter = false;
    }
    if (this.password.length >= 8) {
      this.minLength = true;
    } else {
      this.minLength = false;
    }
  }
  openLink(url: string) {
    window.open(url, "_blank");
  }
}
