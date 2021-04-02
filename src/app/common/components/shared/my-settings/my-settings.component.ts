import { Component, OnInit } from '@angular/core';

import { NitroWalletService, AuthService } from 'src/app/api/services';
import { NotifiqService } from '../../../services/notifiq.service';
import { Router } from '@angular/router';
import { AuthService as ninja } from '../../../../user/services/auth.service';
import { DriversService } from '../../../../api/services/drivers.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent implements OnInit {

  tutorialStarted = false;
  authenabled: boolean;
  editingWallet = false;
  profileReady = false;
  isManager = true;
  nitroObserver: Subscription;
  myDriverOldObserver: Subscription;
  myDriverBalanceObserver: Subscription;
  cryptoMtfrckr: string;
  myDriver: any;
  myDriverBalances: any;
  myDriverOld: any;

  constructor(private uapi: AuthService, protected notify: NotifiqService, protected api: DriversService,
    private identityService: ninja, private route: Router, protected ntrsrvc: NitroWalletService) { }

  ngOnInit() {
    this.getMydriver();
    this.launchTutorial();
    this.recognizeManager();
  }

  resendActivation() {
    this.uapi.authVerificationCreate().subscribe(data => {
      this.notify.success('email_sent', 'open_mail');
    });
  }

  switchTutorial() {
    const data = this.identityService.getStorageIdentity();
    let bol: boolean;
    this.tutorialStarted === false ? bol = true : bol = false;

    if (window.innerWidth > 1024) {
      this.api.driversTutorialPartialUpdate(bol).subscribe(dataxz => {
        this.identityService.meUpdate();
        setTimeout(() => {
          if (bol === true) {
            this.launchTutorial();
            this.route.navigate(['/race/start-race']);
          } else {
            this.launchTutorial();
          }

        }, 500);
      });
    }
  }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    if (window.innerWidth > 1024){
      data.is_in_tutorial === true ? this.tutorialStarted = false : this.tutorialStarted = true;
    }
  }

  switchAuthenticator(event) {
    if (this.authenabled === false) {
      this.route.navigate(['/player/setup-auth']);
    } else {
      this.route.navigate(['/player/disable-auth']);
    }
  }

  patchWallet() {
    this.nitroObserver = this.ntrsrvc.nitroWalletPartialUpdate({
      my_crypto_address: this.cryptoMtfrckr
    }).subscribe(data => {
      this.identityService.meUpdate();

      setTimeout(() => {
        this.getMydriver();
        this.editingWallet = false;
      }, 1500);

    });
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.myDriver = data;
    data.is_in_tutorial === true ? this.tutorialStarted = false : this.tutorialStarted = true;
    data.is_using_authenticator === true ? this.authenabled = false : this.authenabled = true;

    this.cryptoMtfrckr = data.my_crypto_address;
    this.getMyOldDriver();
  }

  getMyOldDriver() {
    const data = this.identityService.getDriverMe();
    this.myDriverOld = data;
    this.getMydriverBalances();

  }

  getMydriverBalances() {
    this.myDriverBalanceObserver = this.api.driversBalances().subscribe(data => {
      this.myDriverBalances = data;
      this.profileReady = true;
    });
  }

  changeManager() {
    if (this.isManager === false) {
      this.setMode('manager');
    } else {
      this.setMode('owner')
    }
  }


  recognizeManager() {
    const man = this.identityService.getDriverMe().mode;
    if (man === 'manager') {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }


  setMode(type: string) {
    this.api.driversSetMode({ mode: type }).subscribe(
      data => {
        console.log(data);
      }
    )
  }


}
