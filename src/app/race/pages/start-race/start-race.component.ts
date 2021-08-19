import { AuthService } from "./../../../user/services/auth.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from "@angular/core";
import {
  RacesService,
  DriversService,
  AuthService as ninja,
  CarsService,
  LeaderboardService,
  TeamsService,
} from "src/app/api/services";
import { NftsService } from "../../../api/services/nfts.service";
import { AuthService as driver } from "./../../../user/services/auth.service";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-start-race",
  templateUrl: "./start-race.component.html",
  styleUrls: ["./start-race.component.scss"],
})
export class StartRaceComponent implements OnInit, OnDestroy {
  @ViewChild("carousel") carousel: ElementRef;

  constructor(
    protected api: RacesService,
    private apin: NftsService,
    private drvrsrvc: DriversService,
    protected notify: NotifiqService,
    private identityService: AuthService,
    private uapi: ninja,
    private dapi: driver,
    private capi: CarsService,
    private router: Router,
    private tsapi: TeamsService,
    private lead: LeaderboardService
  ) {
    this.assets = this.apin.getAssets();

    this.getMyAssets();
    this.getTeams();
    this.getMyTem();
    this.getCryptoStats();
    this.accountInfo = this.dapi.getDriverMe();
  }

  activityData: any;
  reward = 1;
  tip = 1;
  allTeams: any;
  myTeamAllData: any;
  filter = "all";
  bannerType = "tournament";
  raceObserver: Subscription;
  liveObserver: Subscription;
  walletSubscription: Subscription;
  merewardObserver: Subscription;
  transObserver: Subscription;
  rdObserver: Subscription;
  firstLoginObserver: Subscription;
  teamSubscription: Subscription;
  raceData: any;
  modalActive = true;
  myDriver: any;
  interval: any;
  tipsInterval: any;
  accountInfo: any;
  liveRacesData: any;
  myRewards: any;
  myNick = "";
  display = window.innerWidth;
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
  trxBalance = 0;
  visibleCardIndex = 0;
  theta = 0;
  cellTheta = 0;
  radius = 0;
  selectRaceIndex = 0;
  startingValue = 0;
  topBannerIndex = 3;
  tutorialStep = 1;
  nickname: string;
  date: any;
  tutorialStarted = false;
  assets = [];
  myAssets: any;
  myFavRaces = [];
  tickets = 0;
  tutorialInterval: any;
  animationInterval: any;
  hwdays: any;
  ldrbrd: any;
  myCarsvals = 0;
  carBonus = 0;
  activityObserver: Subscription;
  myCarsObserver: Subscription;
  eventSubscription: Subscription;
  myCars = [];
  myDriverOld: any;
  bestRacer: any;
  myTeamReward: number;
  dailyReward: number;
  isOwner = false;
  isPremium = false;
  tips = [];
  teamId: number;
  myTeam: any;
  myId: string;
  meManager = false;
  ownedCars: any;
  ownedRacers: any;
  ppes: any;
  ngOnInit() {
    console.log(this.assets);
    const data = JSON.parse(localStorage.getItem("first-time"));
    const notFinishedrace = JSON.parse(localStorage.getItem("first-race"));
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

    this.toggleTip(1);
    // this.getActivity();
    this.getMyOwner();
    this.launchTutorial();
    this.interval = setInterval(() => {
      this.getCryptoStats();
    }, 15000);
    // this.tutorialInterval = setInterval(() => {
    //   this.checkTutorial();
    // }, 3000);
    this.getMydriver();
    this.myDriverOld = this.identityService.getDriverMe();
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

    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    clearInterval(this.interval);
    clearInterval(this.tutorialInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    clearInterval(this.tutorialInterval);
  }
  width() {
    this.display = window.innerWidth;
  }
  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
  }

  //MODAL
  showModal() {
    if (this.modalActive === true) {
      this.modalActive = false;
    } else {
      this.modalActive = true;
    }
  }
  closeModal() {
    this.modalActive = false;
  }

  // getActivity() {
  //   this.activityObserver = this.drvrsrvc.activityList().subscribe((data) => {
  //     const objs: any = data;
  //     this.activityData = objs;
  //     console.log(this.activityData);
  //   });
  //   const seconds = new Date();
  //   seconds.setHours(2, 0, 0, 0);
  //   this.date = seconds.getTime() / 1000;
  // }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    this.myNick = data.nickname;
    data.is_in_tutorial === true
      ? (this.tutorialStarted = true)
      : (this.tutorialStarted = false);

    this.tickets = data.golden_tickets;
    if (this.tutorialStarted === true && window.innerWidth > 1024) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
      this.introModal = false;
    }
  }

  checkTutorial() {
    const data = this.identityService.getStorageIdentity();
    data.is_in_tutorial === true
      ? (this.tutorialStarted = true)
      : (this.tutorialStarted = false);

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
    this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe((data) => {
      this.identityService.meUpdate();
    });
  }

  resendActivation() {
    this.uapi.authVerificationCreate().subscribe((data) => {
      this.notify.success("email_sent", "open_mail");

      localStorage.removeItem("first-time");
      this.verifyModal = false;
      this.launchTutorial();
    });
  }
  closeTutorial() {
    localStorage.removeItem("first-time");
  }
  realCloseTutorial() {
    this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe((datax) => {
      this.identityService.meUpdate();
      localStorage.removeItem("first-race");
    });
  }
  filterHighestValue() {
    //highest price car
    const maxValueOfCar = Math.max(...this.ownedCars.map((o) => o.price), 0);

    this.ownedCars = this.ownedCars.filter(
      (item) => item["price"] === maxValueOfCar
    );

    //highest price racer
    const maxValueOfRacer = Math.max(
      ...this.ownedRacers.map((o) => o.price),
      0
    );

    this.ownedRacers = this.ownedRacers.filter(
      (item) => item["price"] === maxValueOfRacer
    );
  }
  filterMyAssets() {
    this.ownedCars = this.assets.filter(
      (item) => item["amount"] > 0 && item["type"] === "car"
    );
    this.ownedRacers = this.assets.filter(
      (item) => item["amount"] > 0 && item["type"] === "racer"
    );
  }
  getMyAssets() {
    this.myCarsObserver = this.capi.carsMineList().subscribe((data) => {
      const objsx: any = data;
      const myCars: any = objsx.cars;
      const myRacers: any = objsx.racers;
      for (let x = 0; x < myCars.length; x++) {
        for (let y = 0; y < this.assets.length; y++) {
          if (
            myCars[x].car_id === this.assets[y].tier &&
            this.assets[y].type === "car"
          ) {
            this.assets[y].amount++;
          }
        }
      }
      for (let x = 0; x < myRacers.length; x++) {
        for (let y = 0; y < this.assets.length; y++) {
          if (
            myRacers[x].car_id === this.assets[y].tier &&
            this.assets[y].type === "racer"
          ) {
            this.assets[y].amount++;
          }
        }
      }
      this.filterMyAssets();
      this.filterHighestValue();
    });
  }
  nextTutorialStep() {
    if (this.tutorialStep === 4) {
      this.router.navigate(["/race/race-selection"]);
    }
    this.tutorialStep++;
  }
  getMyOwner() {
    const data = this.identityService.getLeaderboardMe();
    const user = this.identityService.getDriverMe();
    this.myId = user.id;
    this.teamId = data.team_id;
    if (user.is_paid_membership === "Free" || !user.is_paid_membership) {
      this.isPremium = false;
    } else {
      this.isPremium = true;
    }
  }
  getMydriver() {
    this.accountInfo = this.identityService.getDriverMe();
  }
  getTeams() {
    this.tsapi.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.allTeams = data.results;
    });
  }
  getMyTem() {
    this.teamSubscription = this.lead
      .leaderboardTeamInternalList()
      .subscribe((datax) => {
        const data: any = datax;
        this.myTeamAllData = data;
      });
  }
  toggleTip(tipId: number) {
    this.clearIntervalTip();
    this.tip = tipId;
    this.tipsInterval = window.setInterval(() => {
      if (this.tip === 3) {
        this.tip = 1;
      } else {
        this.tip++;
      }
    }, 5000);
  }
  clearIntervalTip() {
    clearInterval(this.tipsInterval);
  }
  navigateToToken() {
    window.open("https://ioi-token.com", "_blank");
  }
}
