import { NextRaceV2 } from './../../../../api/models/next-race-v2';
import { RacesService } from 'src/app/api/services';
import { NotifiqService } from './../../../services/notifiq.service';
import { BalanceService } from './../../../services/balance.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractComponent } from '../../abstract.component';
import { Identity } from '../../../../user/models/identity';
import { DriversService, AffiliatesService, AuthService as ninja } from '../../../../api/services';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { Experience, ExperienceService } from 'src/app/common/services/experience.service';

declare let $: any;


@Component({
  selector: 'app-race-layout',
  templateUrl: './race-layout.component.html',
  styleUrls: ['./race-layout.component.scss']
})
export class RaceLayoutComponent extends AbstractComponent implements OnInit {

  public identity: Identity;
  public menuVisible = false;
  profileObservable: Subscription;
  routeObservable: Subscription;
  myLevelObserver: Subscription;
  myDriverObserver: Subscription;
  raceDriverObserver: Subscription;
  myCarBoost = 0;
  myTeamBoost = 0;
  myTokenBoost = 0;
  myAffilateBoost = 0;
  showChat = false;
  switchBalance = false;
  showMySettings = false;
  menuOpen = false;
  openNotifiq = false;
  isManager = false;
  isSound = false;
  popupClosed = true;
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
  notiObserver: Subscription;
  notifications: Notification[];
  nexts: NextRaceV2[];
  nextTour: NextRaceV2;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  myDriverBalances: any;
  menuType = 'races';
  sumUsers = 0;
  trxUsdt = 3;
  constructor(public router: Router,
    protected driverSrvc: DriversService, protected affisrvc: AffiliatesService,
    private identityService: AuthService, private balanceService: BalanceService,
    private uapi: ninja, private notify: NotifiqService, private experience: ExperienceService,
    private rservice: RacesService) {
    super();
    this.balanceChanged = this.balanceService.balanceChanged;

    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }
  get isSidebarVisible(): boolean {
    return this.balanceService.balanceChanged;
  }


  ngOnInit() {
    this.recognizeManager();
    const balFirst = JSON.parse(localStorage.getItem('bal-first-time'));
    const tick = JSON.parse(localStorage.getItem('trxusdt'));
    if (balFirst) {
      // console.log('ok');
    } else {
      this.getCryptoStats();
    }

    if (balFirst) {
      this.getCryptoStats();
    }
    if (tick) {
      this.trxUsdt = tick;
    }
    this.getMyLevel();
    this.getMydriverAff();
    this.getMydriver();
    this.balanceService.balanceChange.subscribe(data => {
      this.getCryptoStats();
    });
    const brec = JSON.parse(localStorage.getItem('ndate'));
    const bnowx = Date.now();
    const bdiff = Number(bnowx) - Number(brec);
    if (brec && bdiff > 10000) {
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

    this.sumUsers  = Math.floor(Math.random() * (300 - 260 + 1)) + 260;
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
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    
  }

  logout() {
    clearInterval(this.interval);
    
    this.identityService.logout();
  }




  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
    this.getMydriverBalances();
  }

  getMyLevel() {
    this.myAffilate = this.identityService.getStorageAff();
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



    if (lowestTime === filteredFreeTime) { this.nextTour = filteredFree[0];}
    if (lowestTime === filteredTrxTime) { this.nextTour = filteredTrx[0];}
    if (lowestTime === filteredIoiTime) { this.nextTour = filteredIoi[0]; }
    


  }


  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance = this.myDriverBalances.game_wallet_ioi + this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
      const datax =  this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }

  recognizeManager() {
    const man = this.identityService.getDriverMe().mode;
    if (man === 'owner') {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }

  changeSound() {
    this.isSound = !this.isSound;
    if (this.isSound) {
      localStorage.setItem('useSound', JSON.stringify(this.isSound))
    } else {
      localStorage.removeItem('useSound');
    }
    this.recognizeSound();
  }

  recognizeSound() {
    const man = JSON.parse(localStorage.getItem('manager'));
    if (man) {
      this.isSound = true;
    } else {
      this.isSound = false;
      }
  }

  


}
