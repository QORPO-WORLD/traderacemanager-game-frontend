import { BalanceService } from "./common/services/balance.service";
import { AuthService } from "src/app/user/services/auth.service";
//import { Component, ChangeDetectorRef } from '@angular/core';
import { Component, HostListener, ChangeDetectorRef } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { TranslateService } from "@ngx-translate/core";
//import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
//import { Network } from '@ionic-native/network/ngx';

import { Router, NavigationEnd } from "@angular/router";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  leave = false;
  log: Array<Array<any>>;
  showCookieBox = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    //private ga: GoogleAnalytics,
    private uapi: AuthService,
    private cdr: ChangeDetectorRef,
    private balanceService: BalanceService,
    public router: Router
  ) {
    translate.setDefaultLang("en");
    this.initializeApp();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-192445220-1", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  initializeApp() {
    const myDomain = window.location.href;
    this.calculateCorrectVh();
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
      window.addEventListener("keyboardDidShow", (event: any) => {
        // Describe your logic which will be run each time when keyboard is about to be shown.
      });
      setInterval(() => {
        this.balanceService.balanceHasbeenChanged();
      }, 5000);
      /*
            this.ga.startTrackerWithId('UA-105777953-2')
              .then(() => {
                this.ga.trackView('test');
                // Tracker is ready
                // You can now track pages or set additional information such as AppVersion or UserId
              });
      */
    });
    /* android only
    this.platform.pause.subscribe(e => {
      this.leave = true;
      this.onExit();
    });
    this.platform.resume.subscribe(() => {
      this.leave = false;
    });
    window.addEventListener('beforeunload', () => {
      this.onExit();
    });
    */
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.checkCookie();
    toggleDarkTheme(prefersDark.matches);

    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle("dark", shouldAdd);
    }

    if (
      location.href === "https://www.traderacemanager.com" ||
      location.href === "http://traderacemanager.com"
    ) {
      location.href = "https://traderacemanager.com";
    }
  }

  onExit() {
    setTimeout(() => {
      if (this.leave === true) {
        this.uapi.logout();
      }
    }, 600000);
  }

  checkCookie() {
    var x = this.uapi.getCookie("consentC");
    if (!x) {
      this.showCookieBox = true;
    } else {
      this.showCookieBox = false;
    }
  }

  cookieConsent() {
    this.uapi.setCookie("consentC", "granted", 1000);
    this.checkCookie();
  }

  onActivate(e, elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "auto", block: "start" });
  }

  calculateCorrectVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
