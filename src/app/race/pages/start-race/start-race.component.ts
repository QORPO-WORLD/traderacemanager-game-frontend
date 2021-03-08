import { AuthService } from './../../../user/services/auth.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RacesService, DriversService, RewardsService, AuthService as ninja, CarsService, LeaderboardService } from 'src/app/api/services';
import { NotifiqService } from './../../../common/services/notifiq.service';
import { Subscription } from 'rxjs';
import { FavRaces, NextRaceV2, RewardsMe } from 'src/app/api/models';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExperienceService, Experience } from 'src/app/common/services/experience.service';

@Component({
  selector: 'app-start-race',
  templateUrl: './start-race.component.html',
  styleUrls: ['./start-race.component.scss'],
})
export class StartRaceComponent implements OnInit, OnDestroy {

  @ViewChild('carousel', { static: false }) carousel: ElementRef;

  constructor(protected api: RacesService, private rwrdsrvc: RewardsService,
    private platform: Platform, private drvrsrvc: DriversService, protected notify: NotifiqService, private identityService: AuthService,
    private uapi: ninja, private experience: ExperienceService, private capi: CarsService, private router: Router, private lapi: LeaderboardService) {


    this.getCryptoStats();


    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }

  filter = 'all';
  bannerType = 'tournament';
  raceObserver: Subscription;
  liveObserver: Subscription;
  walletSubscription: Subscription;
  merewardObserver: Subscription;
  transObserver: Subscription;
  rdObserver: Subscription;
  favObserver: Subscription;
  updateFavCoinsObserver: Subscription;
  firstLoginObserver: Subscription;
  myLdrbrdObserver: Subscription;
  teamSubscription: Subscription;
  raceData: any;
  myDriver: any;
  interval: any;
  liveRacesData: any;
  myRewards: any;
  myLdrbrd: any;
  myNick = '';
  timerReady = false;
  dataReady = false;
  bonusTicketOpened = false;
  firstLogin = false;
  introModal = false;
  signedIntoRace = false;
  bigVersion = true;
  pageOpen = true;
  verifyModal = false;
  verifyModalTutorial = false;
  isManager = false;
  showDayTipModal = false;
  editTips = false;
  trxBalance = 0;
  visibleCardIndex = 0;
  theta = 0;
  cellTheta = 0;
  radius = 0;
  selectRaceIndex = 0;
  startingValue = 0;
  topBannerIndex = 1;
  tutorialStep = 1;
  nextInterval: any;
  selectedrace: NextRaceV2;
  newNextData: NextRaceV2[];
  rewardsMe: RewardsMe;
  nickname: string;
  myAffilateLevel: any;
  astart: any;
  bstart: any;
  cstart: any;
  dstart: any;
  estart: any;
  fstart: any;
  gstart: any;
  hstart: any;
  istart: any;
  jstart: any;
  kstart: any;
  ioistarta: any;
  ioistartb: any;
  ioistartc: any;
  myAffilate: any;
  tutorialStarted = false;
  baseFavRaces = [
    { type: 'car_race_short_0', fav: false },
    { type: 'car_race_short_10', fav: false },
    { type: 'car_race_short_50', fav: false },
    { type: 'car_race_short_100', fav: false },
    { type: 'car_race_short_500', fav: false },
    { type: 'car_race_short_1000', fav: false },
    { type: 'car_race_24hrs_1000', fav: false },
    { type: 'wednesday_party_race_0', fav: false },
    { type: 'classic_tournament_0', fav: false },
    { type: 'classic_tournament_10', fav: false },
    { type: 'classic_tournament_100', fav: false },
    { type: 'classic_tournament_1000', fav: false },
    { type: 'golden_ticket_0', fav: false },
    { type: 'car_race_ioi_1', fav: false },
    { type: 'car_race_ioi_3', fav: false },
    { type: 'car_race_ioi_5', fav: false },
  ];
  myFavRaces = [];
  tickets = 0;
  selRaceType: string;
  currentExpLevel: number;
  ioioreward: number;
  actualIoiReward = 1000000;
  displayReward = 0;
  tutorialInterval: any;
  animationInterval: any;
  hwdays: any;
  ldrbrd: any;
  myCarsvals = 0;
  carBonus = 0;
  myCarsObserver: Subscription;
  myCars = [];
  rewardLevel = 0;
  rewardLevelMax = 0;
  rewardLevelSum = 0;
  myDriverOld: any;
  myTeamReward: number;
  dailyReward: number;
  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('first-time'));
    const notFinishedrace = JSON.parse(localStorage.getItem('first-race'));
    const dataNick = this.identityService.getStorageIdentity();
    if (data) {
      this.verifyModal = true;
    }
    if (notFinishedrace) {
      this.verifyModalTutorial = true;
    }
    if (dataNick) {
      this.nickname = dataNick.nickname;
    }
    this.getAllRaces();
    //this.getLiveRaces();
    this.getMyRewards();
    this.getRewards();
    //this.getmyFavRaces();
    this.launchTutorial();
    this.getMyLevel();
    this.getMyLeaderboard();
    this.interval = setInterval(() => {
      this.getCryptoStats();
    }, 15000);
    this.tutorialInterval = setInterval(() => {
      this.checkTutorial();
    }, 3000);
    //this.getRacerOfTheDay();
    this.recognizeBanner();
    this.getDaysToDividens();
    this.getMyCars();
    this.myDriverOld = this.identityService.getDriverMe();
    console.log(this.myDriverOld);
    this.getMyTeamReward();
  }
  ngOnDestroy() {
    if (this.raceObserver) {
      this.raceObserver.unsubscribe();
    }
    if (this.liveObserver) {
      this.liveObserver.unsubscribe();
    }
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
    if (this.merewardObserver) {
      this.merewardObserver.unsubscribe();
    }
    if (this.rdObserver) {
      this.rdObserver.unsubscribe();
    }
    if (this.favObserver) {
      this.favObserver.unsubscribe();
    }
    if (this.updateFavCoinsObserver) {
      this.updateFavCoinsObserver.unsubscribe();
    }
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    clearInterval(this.interval);
    clearInterval(this.nextInterval);
    clearInterval(this.tutorialInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    clearInterval(this.nextInterval);
    clearInterval(this.tutorialInterval);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateValue(0, this.actualIoiReward, 1000);
    }, 1500);
  }

  getAllRaces() {

    this.astart = null;
    this.bstart = null;
    this.cstart = null;
    this.dstart = null;
    this.estart = null;
    this.fstart = null;
    this.gstart = null;
    this.hstart = null;
    this.istart = null;
    this.jstart = null;
    this.ioistarta = null;
    this.ioistartb = null;
    this.ioistartc = null;

    this.visibleCardIndex = 0;
    this.raceObserver = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;

      for (let x = 0; x < nedata.length; x++) {
        if (nedata[x].race_identifier === 'car_race_ioi_1') { this.ioistarta = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_3') { this.ioistartb = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_5') { this.ioistartc = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_0') { this.astart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_10') { this.bstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_50') { this.cstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_100') { this.dstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_500') { this.estart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_1000') { this.fstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_24hrs_1000') { this.gstart = nedata[x]; }
        if (nedata[x].race_identifier === 'wednesday_party_race_0') { this.hstart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_0') { this.jstart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_10') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_100') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_1000') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_0') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_10') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_100') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_1000') { this.kstart = nedata[x]; }
      }
      this.newNextData = nedata;

      this.dataReady = true;
      this.timerReady = true;
    });
  }

  getLiveRaces() {
    this.timerReady = false;
    this.liveObserver = this.api.racesCurrentV2List().subscribe(data => {
      const nedata: any = data;
      nedata.sort((a, b) =>
        a.bet_amount - b.bet_amount);
      const live = nedata.filter(word => word.finishing_in_seconds > 0 && word.is_canceled === false);
      this.liveRacesData = live;

      this.dataReady = true;
      this.timerReady = true;
    });
  }

  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
    this.getrewardLevel(this.myDriver.game_wallet_ioi);
  }

  selectNext() {
    this.selectedrace = this.newNextData[this.selectRaceIndex];
  }

  nextRace() {
    this.visibleCardIndex += 1;
    this.selectRaceIndex += 1;
    if (this.selectRaceIndex > this.newNextData.length - 1) {
      this.selectRaceIndex = 0;
    }
    this.selectNext();
  }
  prevRace() {
    this.visibleCardIndex -= 1;
    this.selectRaceIndex -= 1;
    if (this.selectRaceIndex < 0) {
      this.selectRaceIndex = this.newNextData.length - 1;
    }
    this.selectNext();
  }

  carManualChange(index: number) {
    this.visibleCardIndex = index;
    this.selectRaceIndex = index;
    this.selectNext();
  }

  completeTimer() {
    this.timerReady = false;

    this.getAllRaces();

  }

  getMyLeaderboard() {
    const data = this.identityService.getLeaderboardMe();
    console.log(data);
    this.myLdrbrd = data;

  }

  filterRace(mtype: string) {
    const filtered = this.newNextData;
    filtered.filter(race => race.race_identifier === mtype);
    return filtered;
  }

  getMyRewards() {
    this.merewardObserver = this.rwrdsrvc.rewardsMeList()
      .subscribe(data => {
        this.rewardsMe = data;
      });
  }
  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList()
      .subscribe(datax => {
        const data: any = datax;
        this.myRewards = data;
        this.ioioreward = Number(data.ioi_bonus);
      });
  }

  getrewardLevel(data: number) {
    if (data < 100) {
      this.rewardLevelMax = 100;
    }
    if (data === 0) {
      this.rewardLevelMax = 0;
    }
    if (data > 100 && data < 1000) {
      this.rewardLevelMax = 1000;
      this.rewardLevelSum
    }
    if (data > 999) {
      this.rewardLevelMax = 10000;

    }
    this.rewardLevel = data;
    this.rewardLevelSum = (this.rewardLevel / this.rewardLevelMax) * 100;
  }


  getmyFavRaces() {
    this.favObserver = this.drvrsrvc.driversFavRacesList().subscribe(data => {
      const nn: any = data;
      this.myFavRaces = nn;
      this.resortFavRaces();
    });

  }

  resortFavRaces() {
    for (let x = 0; x < this.myFavRaces.length; x++) {

      for (let y = 0; y < this.baseFavRaces.length; y++) {
        if (this.baseFavRaces[y].type === this.myFavRaces[x]) {
          this.baseFavRaces[y].fav = true;
        }
      }
    }

  }



  updateFavRaces() {


    const data: any = [];
    for (let y = 0; y < this.baseFavRaces.length; y++) {
      if (this.baseFavRaces[y].fav === true) {
        data.push(this.baseFavRaces[y].type);
      }
    }

    this.updateFavCoinsObserver = this.drvrsrvc.driversFavRacesUpdate(
      { race_identifiers: data }
    ).subscribe(datax => {
      this.getmyFavRaces();
    });
  }

  getMyLevel() {
    this.myAffilate = this.identityService.getStorageAff();
  }

  launchTutorial() {

    const data = this.identityService.getStorageIdentity();
    this.myNick = data.nickname;
    data.is_in_tutorial === true ? this.tutorialStarted = true : this.tutorialStarted = false;

    //this.firstLogin = false;
    this.tickets = data.golden_tickets;
    if (this.firstLogin === true) {
      if (this.verifyModal === false) {
        this.introModal = true;
      }
    }
    if (this.tutorialStarted === true && window.innerWidth > 1024) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
      this.introModal = false;
    }
  }

  checkTutorial(){
    const data = this.identityService.getStorageIdentity();
    data.is_in_tutorial === true ? this.tutorialStarted = true : this.tutorialStarted = false;

    if (this.tutorialStarted === true && window.innerWidth > 1024) {
      this.introModal = true;
      this.tutorialStep = 1;
      clearInterval(this.tutorialInterval);
    } else {
      this.tutorialStep = -1;
      this.introModal = false;
    }
  }

  skipModal() {
    clearInterval(this.tutorialInterval);
    this.introModal = false;
    this.tutorialStarted = true;
    this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe(data => { this.identityService.meUpdate(); });
  }


  resendActivation() {
    this.uapi.authVerificationCreate().subscribe(data => {
      this.notify.success('email_sent', 'open_mail');

      localStorage.removeItem('first-time');
      this.verifyModal = false;
      this.launchTutorial();
    });
  }

  recognizeBanner() {
    const d = new Date();
    const n = d.getDay();
    if (n === 3) {
      this.bannerType = 'wednesday';
    } else if (n !== 3) {
      this.bannerType = 'tournament';
    }
  }

  closeTutorial() {
    localStorage.removeItem('first-time');
  }

  realCloseTutorial() {
    this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe(datax => {
      this.identityService.meUpdate();
      localStorage.removeItem('first-race');
    });
  }

  animateValue(start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = Math.floor((end / 2) / 100);
    var stepTime = 10;
    if (increment === 0) {
      increment = 0.5;
    }
    this.startingValue = 100;

    this.animationInterval = setInterval(() => {
      current += increment;
      this.displayReward = current;
      if (current > end) {
        clearInterval(this.animationInterval);
        this.displayReward = this.actualIoiReward;
      }
    }, stepTime);
  }

  getDaysToDividens() {
    const _initial = '2021-04-01T10:17:28.593Z';
    const fromTime = new Date();
    const toTime = new Date(_initial);

    this.hwdays = (toTime.getTime() - fromTime.getTime()) / 1000;
    console.log(this.hwdays);
  }

  calcCarsValue() {
    for (let x = 0; x < this.myCars.length; x++) {
      if (this.myCars[x].car_id < 7 && this.myCars[x].car_id > 0) {
        this.myCarsvals += 600;
      }
      if (this.myCars[x].car_id >= 7 && this.myCars[x].car_id < 13) {
        this.myCarsvals += 1000;
      }
      if (this.myCars[x].car_id >= 13 && this.myCars[x].car_id < 19) {
        this.myCarsvals += 1600;
      }
      if (this.myCars[x].car_id >= 19 && this.myCars[x].car_id < 25) {
        this.myCarsvals += 2600;
      }
      if (this.myCars[x].car_id === 25) {
        this.myCarsvals += 3600;
      }
      if (this.myCars[x].car_id === 26) {
        this.myCarsvals += 6000;
      }
      if (this.myCars[x].car_id === 27) {
        this.myCarsvals += 9600;
      }
      if (this.myCars[x].car_id === 28) {
        this.myCarsvals += 15600;
      }
    }

    this.getCarBonus();
  }

  getCarBonus() {
    if (this.myCarsvals > 0 && this.myCarsvals < 1000) { this.carBonus = 6 }
    if (this.myCarsvals > 1000 && this.myCarsvals < 5000) { this.carBonus = 12 }
    if (this.myCarsvals > 5000 && this.myCarsvals < 10000) { this.carBonus = 18 }
    if (this.myCarsvals > 10000) { this.carBonus = 24 }
  }

  getMyCars() {

    this.myCarsObserver = this.capi.carsMineList().subscribe(datax => {
      const data: any = datax;
      const objs: any = data.cars;
      this.dailyReward = data.daily_staking_reward;
      const haha = objs.sort((a, b) =>
        b.car_id - a.car_id
      );
      haha.reverse();
      this.myCars = haha;
      this.calcCarsValue();

    });
  }

  nextBanner() {
    if (this.topBannerIndex === 2) {
      this.topBannerIndex = 1;
    } else this.topBannerIndex++;
  }
  prevBanner() {
    if (this.topBannerIndex === 1) {
      this.topBannerIndex = 2;
    } else this.topBannerIndex--;
  }

  nextTimers() {
    setTimeout(() => {
      this.getLiveRaces();
    }, 1000);
  }

  tipsSaved(myBool: boolean){
    this.showDayTipModal = myBool;
  }

  nextTutorialStep(){
    if (this.tutorialStep === 4) {
      this.router.navigate(['/other/tasks']);
    }
    this.tutorialStep++;
  }

  getMyTeamReward() {
    this.teamSubscription = this.lapi.leaderboardTeamInternalList().subscribe(
      data => {
        this.myTeamReward = data.team_bonus;
      }
    );
  }

}
