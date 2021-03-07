import { environment } from './../../../../../../environments/environment.prod';
import { NextRaceV2 } from './../../../../../api/models/next-race-v2';
import { RacesService } from 'src/app/api/services';
import { NotifiqService } from './../../../../services/notifiq.service';
import { BalanceService } from './../../../../services/balance.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractComponent } from '../../../abstract.component';
import { Identity } from '../../../../../user/models/identity';
import { DriversService, AffiliatesService, AuthService as ninja } from '../../../../../api/services';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { Experience, ExperienceService } from 'src/app/common/services/experience.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


declare let $: any;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends AbstractComponent implements OnInit, OnDestroy {

  public identity: Identity;
  public menuVisible = false;
  isUsingMetamask = false;
  showMetaBalance = false;
  profileObservable: Subscription;
  routeObservable: Subscription;
  myLevelObserver: Subscription;
  myDriverObserver: Subscription;
  raceDriverObserver: Subscription;
  showChat = false;
  switchBalance = false;
  showMySettings = false;
  showAff = false;
  menuOpen = false;
  openNotifiq = false;
  isManager = false;
  popupClosed = true;
  verifyModal = false;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: "customSelect profileSelect"
  };
  myAffilate: any;
  myDriver: any;
  myDriverStats: any;
  myDriverAff: any;
  interval: any;
  refreshInterval: any;
  walletSubscription: Subscription;
  // @Output() valueChange = new EventEmitter();
  balanceChanged: boolean;
  currentExpLevel: number;
  liveOpened = false;
  countSum = 0;
  dateX: number;
  ninterval: any;
  nxInterval: any;
  numOfNotifications = 0;
  numOfNotificationsBack = 0;
  notiObserver: Subscription;
  notifications: Notification[];
  nexts: NextRaceV2[];
  nextTour: NextRaceV2;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  myDriverBalances: any;
  menuType = 'me';
  myAddressClass = '';
  sumUsers = 0;
  trxUsdt = 3;
  tickInterval: any;
  managerInterval: any;
  depositInterval: any;
  depos = false;
  Affilate: any;
  deposTime: any;
  metaEth = { "ioi": 0, "eth": 0, "matic": 0 };
  constructor(public router: Router,
    protected driverSrvc: DriversService, protected affisrvc: AffiliatesService,
    private identityService: AuthService, private balanceService: BalanceService,
    private uapi: ninja, private notify: NotifiqService, private experience: ExperienceService,
    private rservice: RacesService, private _http: HttpClient) {
    super();
    this.calculateCorrectVh();
    this.balanceChanged = this.balanceService.balanceChanged;

    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }
  get isSidebarVisible(): boolean {
    return this.balanceService.balanceChanged;
  }


  ngOnInit() {

    const metaBalance = JSON.parse(localStorage.getItem('meta-balance'));
    const mmea = JSON.parse(localStorage.getItem('mmea'));
    const tick = JSON.parse(localStorage.getItem('trxusdt'));
    const data = JSON.parse(localStorage.getItem('first-time'));
    if (data) {
      this.verifyModal = true;
    }

    this.getCryptoStats();

    this.calculateCorrectVh();
    if (tick) {
      this.trxUsdt = tick;
      this.tickInterval = setInterval(() => {
        this.getCryptoStats();
        const tickn = JSON.parse(localStorage.getItem('trxusdt'));
        this.trxUsdt = tickn;
      }, 3000);
    }
    this.getMyLevel();
    this.getMydriverAff();
    this.getMydriver();
    this.recognizeManager();
    this.managerInterval = setInterval(() => {
      this.recognizeManager();
    }, 2000);

    this.balanceService.balanceChange.subscribe(data => {
      this.getCryptoStats();
    });
    const brec = JSON.parse(localStorage.getItem('ndate'));
    const bnowx = Date.now();
    const bdiff = Number(bnowx) - Number(brec);
    if (brec && bdiff > 20000) {
      this.checkUser();
      this.getNextraces();
    }
    this.nxInterval = setInterval(() => {
      const rec = JSON.parse(localStorage.getItem('ndate'));
      const nowx = Date.now();
      const diff = Number(nowx) - Number(rec);
      if (rec && diff > 29485) {
        this.checkUserAndClear();
      }
    }, 2473);
/*
    this.depositInterval = setInterval(() => {
      const rec = JSON.parse(localStorage.getItem('depos'));
      if (rec) {
        this.depos = true;
        this.deposTime = rec;
      }
    }, 10000);
*/
    this.sumUsers = Math.floor(Math.random() * (300 - 260 + 1)) + 260;

    this.notiObserver = this.driverSrvc.driversNotificationsList().subscribe(datax => {

      this.numOfNotifications = 0;
      for (let x = 0; x < datax.length; x++) {
        if (datax[x].event !== 'race_signup' && datax[x].event !== 'game_reward') {
          this.numOfNotifications = this.numOfNotifications + 1;
        }
      }
      this.numOfNotificationsBack = this.numOfNotifications;
    });
    if (mmea && !metaBalance) {
      this.getMetamaskBalance();
    }
  }

  ngOnDestroy() {
    if (this.profileObservable) {
      this.profileObservable.unsubscribe();
    }
    if (this.routeObservable) {
      this.routeObservable.unsubscribe();
    }
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
    if (this.myLevelObserver) {
      this.myLevelObserver.unsubscribe();
    }
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
    if (this.raceDriverObserver) {
      this.raceDriverObserver.unsubscribe();
    }
    clearInterval(this.interval);

    clearInterval(this.nxInterval);
    clearInterval(this.ninterval);
    clearInterval(this.tickInterval);
    clearInterval(this.managerInterval);
    clearInterval(this.depositInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);

    clearInterval(this.nxInterval);
    clearInterval(this.ninterval);
    clearInterval(this.tickInterval);
    clearInterval(this.managerInterval);
    clearInterval(this.depositInterval);
  }

  logout() {
    clearInterval(this.interval);

    this.identityService.logout();
  }




  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
    console.log(data);
    this.getMydriverBalances();
  }

  getMyLevel() {
    this.Affilate = this.identityService.getStorageAff();
  }
  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }

  getMydriverAff() {
    this.myDriverAff = this.identityService.getDriverMe();
  }

  onActivate(e, elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: 'auto', block: 'start' });
  }


  checkUser() {

    if (this.identityService.hasToken()) {
      this.getNotifications();
    }
  }

  checkUserAndClear() {
    if (this.identityService.hasToken()) {
      this.getNotificationsAndClear();
    }
  }

  getNotifications() {
    this.notiObserver = this.driverSrvc.driversNotificationsList().subscribe(data => {
      this.countNotifications(data);


    });
  }

  getNotificationsAndClear() {
    this.notiObserver = this.driverSrvc.driversNotificationsList().subscribe(data => {
      this.countNotifications(data);
      setTimeout(() => { localStorage.setItem('ndate', JSON.stringify(Date.now())); }, 500);

    });
  }

  countNotifications(data) {
    this.numOfNotifications = 0;
    for (let x = 0; x < data.length; x++) {
      if (data[x].event !== 'race_signup' && data[x].event !== 'game_reward') {
        this.numOfNotifications = this.numOfNotifications + 1;
      }
      if (data[x].event === 'balance_deposit') {
        this.checkDeposit(data[x].created);
      }
    }

    if (this.numOfNotifications > this.numOfNotificationsBack) {


      const obj = document.createElement('audio');
      obj.src = './assets/base/sounds/notification.mp3';
      obj.play();
      this.numOfNotificationsBack = this.numOfNotifications;
    }

  }

  getNextraces() {
    this.raceDriverObserver = this.rservice.racesNextV2List().subscribe(data => {
      this.calcInterestedRaces(data);
    });
  }

  calcInterestedRaces(data: NextRaceV2[]) {
    const filteredFree = data.filter((item) => {
      return item.race_identifier === 'tournament_for_ticket_0'
    });
    const filteredFreeTime = filteredFree[0].starts_in_seconds;

    const filteredTrx = data.filter((item) => {
      return item.race_identifier === 'classic_tournament_10'
    });
    const filteredTrxTime = filteredTrx[0].starts_in_seconds;

    const filteredIoi = data.filter((item) => {
      return item.race_identifier === 'classic_tournament_0'
    });
    const filteredIoiTime = filteredIoi[0].starts_in_seconds;

    let magicArray = [];

    magicArray.push(filteredFreeTime);
    magicArray.push(filteredTrxTime);
    magicArray.push(filteredIoiTime);

    const lowestTime = Math.min(...magicArray);


    if (lowestTime === filteredFreeTime) { this.nextTour = filteredFree[0]; }
    if (lowestTime === filteredTrxTime) { this.nextTour = filteredTrx[0]; }
    if (lowestTime === filteredIoiTime) { this.nextTour = filteredIoi[0]; }

  }


  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance = this.myDriverBalances.game_wallet_ioi + this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
    const datax = this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }

  closeTutorial() {
    localStorage.removeItem('first-time');
    setTimeout(() => { window.location.reload() }, 500);
  }

  changeManager() {
    this.isManager = !this.isManager;
    if (this.isManager) {
      localStorage.setItem('manager', JSON.stringify(this.isManager))
    } else {
      localStorage.removeItem('manager');
    }
    this.recognizeManager();
  }

  setManager(wantToBeManager: boolean) {
    this.isManager = wantToBeManager;
    if (this.isManager) {
      localStorage.setItem('manager', JSON.stringify(this.isManager))
    } else {
      localStorage.removeItem('manager');
    }
    this.recognizeManager();
  }

  recognizeManager() {
    const man = JSON.parse(localStorage.getItem('manager'));
    if (man) {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }

  calculateCorrectVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }

  checkDeposit(checker: string) {
    if (this.deposTime) {
      if (checker > this.deposTime) {
        this.depos = false;
        localStorage.removeItem('depos');
      }
    }
  }

  copyMyAddress() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.myDriverStats.my_crypto_address;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  animateOnClick() {
    this.myAddressClass = 'animate';
    setTimeout(() => {
      this.myAddressClass = '';
    }, 1000);
  }

  getMetamaskBalance() {

    this.getMeta().subscribe({
      next: data => this.setupMetaBalance(data),
      error: error => this.getErrorService().apiError(error)
    });
    localStorage.setItem('meta-balance', JSON.stringify(true));
  }

  setupMetaBalance(data) {
    this.metaEth = data;
    this.isUsingMetamask = true;
  }


  getMeta() {
    return this._http.get(environment.api_url + '/me/metamask-balances',
      httpOptions);
  }

}
