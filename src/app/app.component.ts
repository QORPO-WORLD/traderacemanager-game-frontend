import { BalanceService } from './common/services/balance.service';
import { AuthService } from 'src/app/user/services/auth.service';
//import { Component, ChangeDetectorRef } from '@angular/core';
import { Component, HostListener, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';
//import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
//import { Network } from '@ionic-native/network/ngx';
import { NgxHotjarService } from 'ngx-hotjar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  leave = false;
  log: Array<Array<any>>;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    //private ga: GoogleAnalytics,
    private uapi: AuthService,
    public hjService: NgxHotjarService,
    private cdr: ChangeDetectorRef,
    private balanceService: BalanceService
  ) {
    translate.setDefaultLang('en');
    this.initializeApp();
  }
 //hotjar
  @HostListener('click')
  onClick() {
    try {
      console.log((window as any).hj.q);
      this.log = (window as any).hj.q;
      this.cdr.detectChanges();
    } catch (err) {
      console.error(err);
    }
  }

  initializeApp() {
    const myDomain = window.location.href;
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);
    }

  }

  onExit() {
    setTimeout(() => {
      if (this.leave === true) {
        this.uapi.logout();
      }
    }, 600000);
  }

}
