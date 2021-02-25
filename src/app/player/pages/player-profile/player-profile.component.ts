import { AuthService as ninja } from './../../../user/services/auth.service';
import { LeaderboardService, TeamsService, NitroWalletService, BlockchainService, AuthService } from 'src/app/api/services';
import { NotifiqService } from './../../../common/services/notifiq.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriversService } from '../../../api/services/drivers.service';
import { CarsService, AffiliatesService } from '../../../api/services';
import { CountryCode, CountryCodes } from '../../../user/components/countries/country-codes';
import { MfaService } from 'src/app/api/services/mfa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit, OnDestroy {
  myDriverObserver: Subscription;
  myDriverOldObserver: Subscription;
  myDriverBoostObserver: Subscription;
  myDriverBalanceObserver: Subscription;
  myLevelObserver: Subscription;
  myLdrbrdObserver: Subscription;
  teamsObserver: Subscription;
  nitroObserver: Subscription;
  transferSubscription: Subscription;
  myDriver: any;
  actualCarIndex = 0;
  bestIndex = 0;
  myCars: any;
  myCar: any;
  dataReady = false;
  profileReady = false;
  myAffilate: any;
  is24race = false;
  isLastMonth = false;
  myLdrbrd: any;
  myTeam: any;
  editingWallet = false;
  cryptoMtfrckr: string;
  myDriverBoost: any;
  myDriverBalances: any;
  myDriverOld: any;
  tutorialStarted: boolean;
  countryCodes: Array<CountryCode> = CountryCodes;
  searchText: string;
  selectedCountry: string;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: "customSelect profileSelect"
  };
  waletsTypes = [
    { type: 'nitro_wallet_trx', name: 'Nitro wallet' },
    { type: 'game_wallet_trx', name: 'Game wallet' },
    { type: 'nitro_wallet_ioi', name: 'Nitro wallet' },
    { type: 'game_wallet_ioi', name: 'Game wallet' }
  ];
  nitroToGame = true;
  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  amount = 0;
  walletSelected = this.waletsTypes[1].name;
  walletToSelected = this.waletsTypes[0].name;
  tokenSelected = this.tokenTypes[1].name;
  togetherSum: number;
  depositFrom: string;
  authcode: string;
  cryptoAddress = '';
  assets = 0;
  authenabled: boolean;
  editionAvailableSlides: number;
  editionStylePx = 0;
  editionSlideIndex = 0;
  constructor(protected api: DriversService, protected notify: NotifiqService, protected carsApi: CarsService,
    protected affisrvc: AffiliatesService, protected ldrbrdSrvc: LeaderboardService,
    protected teamsrvc: TeamsService, protected ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService, private mfsrvc: MfaService, private route: Router,
    private uapi: AuthService, private identityService: ninja) {
    this.getMydriver();
    this.getMyLevel();
    this.getMyCars();
    this.getMyLeaderboard();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
    if (this.myLevelObserver) {
      this.myLevelObserver.unsubscribe();
    }
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.teamsObserver) {
      this.teamsObserver.unsubscribe();
    }
    if (this.nitroObserver) {
      this.nitroObserver.unsubscribe();
    }
    if (this.myDriverOldObserver) {
      this.myDriverOldObserver.unsubscribe();
    }
    if (this.myDriverBoostObserver) {
      this.myDriverBoostObserver.unsubscribe();
    }
    if (this.myDriverBalanceObserver) {
      this.myDriverBalanceObserver.unsubscribe();
    }
    if (this.transferSubscription) {
      this.transferSubscription.unsubscribe();
    }
  }

  getMyLevel() {
    this.myLevelObserver = this.affisrvc.affiliatesMe()
      .subscribe(data => {
        this.myAffilate = data;
      });
  }

  getMyLeaderboard() {
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardMe({
      page: 1, lastMonth: this.isLastMonth
    })
      .subscribe(data => {
        this.myLdrbrd = data;
        this.getTeams();
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
    this.myDriverOld = this.identityService.getDriverMe();
    //this.getMydriverBalances();
    // this.getMydriverBoost();

  }



  getMydriverBalances() {
    this.myDriverBalanceObserver = this.api.driversBalances().subscribe(data => {
      this.myDriverBalances = data;
      this.profileReady = true;
    });

  }

  deposit() {
    this.notify.info('', 'com_soon');
  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'TE6xjUSpFJJvgy7fAFkNxePwsi4AA1s21D';
    document.body.appendChild(selBox);
    selBox.select();
    selBox.focus();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notify.info('copied', 'be_sure');
  }

  nextCar() {
    if (this.bestIndex === this.actualCarIndex) {
      this.actualCarIndex = 0;
      this.selectMyCarSPecial(0);
    } else {
      this.actualCarIndex++;
      this.selectMyCarSPecial(this.actualCarIndex);
    }
  }
  prevCar() {
    if (this.actualCarIndex === 0) {
      this.actualCarIndex = 0;
      this.selectMyCarSPecial(0);
    } else {
      this.actualCarIndex--;
      this.selectMyCarSPecial(this.actualCarIndex);
    }
  }

  selectMyCarSPecial(index) {
    this.myCar = this.myCars[index];
  }

  getMyCars() {
    this.carsApi.carsMineList().subscribe(data => {

      const objs: any = data;
      const haha = objs.sort((a, b) => {
        return a.car_id > b.car_id;
      });
      haha.reverse();
      this.selectCar(haha);
    });
  }

  selectCar(data) {
    this.bestIndex = data.length - 1;
    this.myCars = data;
    this.calcAvaliableSlides();
    this.myCar = this.myCars[this.bestIndex];
    this.dataReady = true;
  }

  getTeams() {
    this.teamsObserver = this.teamsrvc.teamsList()
      .subscribe(data => {
        for (let x = 0; x < data.results.length; x++) {
          if (this.myLdrbrd.team_id === data.results[x].id) {
            this.myTeam = data.results[x].name;
          }
        }
      });
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

  switchTutorial() {
    let bol: boolean;
    this.tutorialStarted === true ? bol = false : bol = true;
    this.api.driversTutorialPartialUpdate(bol).subscribe(data => {
      this.identityService.meUpdate();
    });
  }
  switchAuthenticator(event) {
    if (this.authenabled === false) {
      this.route.navigate(['/player/setup-auth']);
    } else {
      this.route.navigate(['/player/disable-auth']);
    }


  }

  nextEdition() {
    for (let x = 0; x < 3; x++) {
      if (this.editionSlideIndex < this.editionAvailableSlides) {
        this.editionSlideIndex++;
        this.editionStylePx += 217;
      }
    }
  }
  prevEdition() {
    for (let x = 0; x < 3; x++) {
      if (this.editionSlideIndex > 0) {
        this.editionSlideIndex--;
        this.editionStylePx -= 217;
      }
    }
  }

  calcAvaliableSlides() {
    this.editionAvailableSlides = (this.myCars.length / 2) - 3;
  }

  countryChange(event) {
    this.selectedCountry = event.value.code;
  }

  resendActivation() {
    this.uapi.authVerificationCreate().subscribe(data => {
      this.notify.success('email_sent', 'open_mail');
    });
  }

}
