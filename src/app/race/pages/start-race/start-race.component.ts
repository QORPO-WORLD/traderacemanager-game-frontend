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
  RewardsService,
  AuthService as ninja,
  CarsService,
  LeaderboardService,
  TeamsService,
} from "src/app/api/services";
import { AuthService as driver } from "./../../../user/services/auth.service";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { Subscription } from "rxjs";
import { FavRaces, NextRaceV2, RewardsMe } from "src/app/api/models";
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import {
  ExperienceService,
  Experience,
} from "src/app/common/services/experience.service";

@Component({
  selector: "app-start-race",
  templateUrl: "./start-race.component.html",
  styleUrls: ["./start-race.component.scss"],
})
export class StartRaceComponent implements OnInit, OnDestroy {
  @ViewChild("carousel") carousel: ElementRef;

  constructor(
    protected api: RacesService,
    private rwrdsrvc: RewardsService,
    private platform: Platform,
    private drvrsrvc: DriversService,
    protected notify: NotifiqService,
    private identityService: AuthService,
    private uapi: ninja,
    private dapi: driver,
    private experience: ExperienceService,
    private capi: CarsService,
    private router: Router,
    private lapi: LeaderboardService,
    private tsapi: TeamsService,
    private lead: LeaderboardService
  ) {
    this.getTeams();
    this.getMyTem();
    this.getCryptoStats();
    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
    this.accountInfo = this.dapi.getDriverMe();    
  }
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
  favObserver: Subscription;
  updateFavCoinsObserver: Subscription;
  firstLoginObserver: Subscription;
  myLdrbrdObserver: Subscription;
  teamSubscription: Subscription;
  raceData: any;
  modalActive: any;
  myDriver: any;
  interval: any;
  rewardInterval: any;
  tipsInterval: any;
  accountInfo: any;
  liveRacesData: any;
  myRewards: any;
  myLdrbrd: any;
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
    { type: "car_race_short_0", fav: false },
    { type: "car_race_short_10", fav: false },
    { type: "car_race_short_50", fav: false },
    { type: "car_race_short_100", fav: false },
    { type: "car_race_short_500", fav: false },
    { type: "car_race_short_1000", fav: false },
    { type: "car_race_24hrs_1000", fav: false },
    { type: "wednesday_party_race_0", fav: false },
    { type: "classic_tournament_0", fav: false },
    { type: "classic_tournament_10", fav: false },
    { type: "classic_tournament_100", fav: false },
    { type: "classic_tournament_1000", fav: false },
    { type: "golden_ticket_0", fav: false },
    { type: "car_race_ioi_1", fav: false },
    { type: "car_race_ioi_3", fav: false },
    { type: "car_race_ioi_5", fav: false },
  ];
  products: Array<object> = [
    //bronze
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      price: 600,
      image: "car1",
      gif: "car1-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car rhino",
      likes: "2k",

      ability: "pes je pes",
    },
    {
      id: 10,
      position: 1,
      free: 12000,
      collection: "Common",
      name: "PANTHER",
      price: 600,
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car panther",
      likes: "2k",
    },
    {
      id: 11,
      position: 2,
      free: 24000,
      collection: "Common",
      name: "ONYX",
      price: 600,
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car onyx",
      likes: "2k",
    },
    {
      id: 12,
      position: 3,
      free: 48000,
      collection: "Common",
      name: "ZANDER",
      price: 600,
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car zander",
      likes: "2k",
    },
    {
      id: 13,
      position: 4,
      free: 96000,
      collection: "Common",
      name: "CYBORG",
      price: 600,
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car cyborg",
      likes: "2k",
    },
    {
      id: 14,
      position: 5,
      free: 192000,
      collection: "Common",
      name: "VULCANIC",
      price: 600,
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car vulcanic",
      likes: "2k",
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      price: 3600,
      image: "car25",
      gif: "car25-animation",
      type: "car",
      rare: true,
      ability1: 0.6,
      ability2: 6,
      amount: [],
      alt: "nft car luna",
      likes: "2k",
    },
    //silver
    {
      id: 16,
      position: 6,
      free: 288000,
      collection: "Super",
      name: "DORIAN",
      price: 1000,
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car dorian",
      likes: "2k",
    },
    {
      id: 17,
      position: 7,
      free: 432000,
      collection: "Super",
      name: "PANTHER",
      price: 1000,
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car panther",
      likes: "2k",
    },
    {
      id: 18,
      position: 8,
      free: 648000,
      collection: "Super",
      name: "ONYX",
      price: 1000,
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car onyx",
      likes: "2k",
    },
    {
      id: 19,
      position: 9,
      free: 972000,
      collection: "Super",
      name: "ZANDER",
      price: 1000,
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car zander",
      likes: "2k",
    },
    {
      id: 20,
      position: 10,
      free: 1458000,
      collection: "Super",
      name: "PYTHON",
      price: 1000,
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car python",
      likes: "2k",
    },
    {
      id: 21,
      position: 11,
      free: 2187000,
      collection: "Super",
      name: "VULCANIC",
      price: 1000,
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car vulcanic",
      likes: "2k",
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: 6000,
      image: "car26",
      gif: "car26-animation",
      type: "car",
      rare: true,
      ability1: 1.98,
      ability2: 12,
      amount: [],
      alt: "nft car silver knight",
      likes: "2k",
    },
    //gold
    {
      id: 23,
      position: 12,
      free: 3000000,
      collection: "Epic",
      name: "CYBORG",
      price: 1600,
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car cyborg",
      likes: "2k",
    },
    {
      id: 24,
      position: 13,
      free: 3600000,
      collection: "Epic",
      name: "RHINO",
      price: 1600,
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car rhino",
      likes: "2k",
    },
    {
      id: 25,
      position: 14,
      free: 4320000,
      collection: "Epic",
      name: "HYPER",
      price: 1600,
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hyper",
      likes: "2k",
    },
    {
      id: 26,
      position: 15,
      free: 5184000,
      collection: "Epic",
      name: "BULL",
      price: 1600,
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car bull",
      likes: "2k",
    },
    {
      id: 27,
      position: 16,
      free: 6220000,
      collection: "Epic",
      name: "PYTHON",
      price: 1600,
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car python",
      likes: "2k",
    },
    {
      id: 28,
      position: 17,
      free: 7465000,
      collection: "Epic",
      name: "HITMAN",
      price: 1600,
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hitman",
      likes: "2k",
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      price: 9600,
      image: "car27",
      gif: "car27-animation",
      type: "car",
      rare: true,
      ability1: 4.74,
      ability2: 18,
      amount: [],
      alt: "nft car midas",
      likes: "2k",
    },
    //platinum
    {
      id: 30,
      position: 18,
      free: 8200000,
      collection: "Legendary",
      name: "HYPER",
      price: 2600,
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car hyper",
      likes: "2k",
    },
    {
      id: 31,
      position: 19,
      free: 9000000,
      collection: "Legendary",
      name: "DORIAN",
      price: 2600,
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car dorian",
      likes: "2k",
    },
    {
      id: 32,
      position: 20,
      free: 9900000,
      collection: "Legendary",
      name: "VULCANIC",
      price: 2600,
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car vulcanic",
      likes: "2k",
    },
    {
      id: 33,
      position: 21,
      free: 10890000,
      collection: "Legendary",
      name: "BULL",
      price: 2600,
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car bull",
      likes: "2k",
    },
    {
      id: 34,
      position: 22,
      free: 12000000,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: 2600,
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car knockout",
      likes: "2k",
    },
    {
      id: 35,
      position: 23,
      free: 13200000,
      collection: "Legendary",
      name: "LARA",
      price: 2600,
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car lara",
      likes: "2k",
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: 15600,
      image: "car28",
      gif: "car28-animation",
      type: "car",
      rare: true,
      ability1: 10.25,
      ability2: 24,
      amount: [],
      alt: "nft car blue storm",
      likes: "2k",
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      price: 100,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Axle",
      likes: "2k",
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      price: 100,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Flash",
      likes: "2k",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      price: 100,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Octane",
      likes: "2k",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      price: 100,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Punisher",
      likes: "2k",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 1000,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Lady Rich",
      likes: "2k",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 1000,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Rich Junior",
      likes: "2k",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 1000,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Mrs. Rich",
      likes: "2k",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 10000,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
      alt: "nft racer mr. rich",
      likes: "2k",
    },
  ];
  myAssets: any;
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
  eventSubscription: Subscription;
  myCars = [];
  rewardLevel = 0;
  rewardLevelMax = 0;
  rewardLevelSum = 0;
  myDriverOld: any;
  bestRacer: any;
  myTeamReward: number;
  dailyReward: number;
  isOwner = false;
  isPremium = false;
  tips = [];
  teamId: number;
  myTeam: any;
  bannerInterval: any;
  myId: string;
  meManager = false;
  ownedCars: any;
  ownedRacers: any;
  ppes: any;
  ngOnInit() {
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
    this.setRewardInterval();
    this.getMyAssets();
    this.getAllRaces();
    this.getMyOwner();
    this.getMyRewards();
    this.getRewards();
    // this.launchTutorial();
    this.getMyLevel();
    this.getMyLeaderboard();
    this.interval = setInterval(() => {
      this.getCryptoStats();
    }, 15000);
    // this.tutorialInterval = setInterval(() => {
    //   this.checkTutorial();
    // }, 3000);
    this.recognizeBanner();
    this.getMydriver();
    this.getDaysToDividens();
    this.getMyCars();
    this.myDriverOld = this.identityService.getDriverMe();
    this.getMyTeamReward();
    this.getbestRacer();
    this.getMyLeaderboard();
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
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    clearInterval(this.interval);
    clearInterval(this.nextInterval);
    clearInterval(this.tutorialInterval);
    clearInterval(this.bannerInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    clearInterval(this.nextInterval);
    clearInterval(this.tutorialInterval);
    clearInterval(this.bannerInterval);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateValue(0, this.actualIoiReward, 1000);
    }, 1500);
  }

  width() {
    this.display = window.innerWidth;
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
    this.raceObserver = this.api.racesNextV2List().subscribe((data) => {
      const nedata: any = data;

      for (let x = 0; x < nedata.length; x++) {
        if (nedata[x].race_identifier === "car_race_ioi_1") {
          this.ioistarta = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_ioi_3") {
          this.ioistartb = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_ioi_5") {
          this.ioistartc = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_0") {
          this.astart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_10") {
          this.bstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_50") {
          this.cstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_100") {
          this.dstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_500") {
          this.estart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_1000") {
          this.fstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_24hrs_1000") {
          this.gstart = nedata[x];
        }
        if (nedata[x].race_identifier === "wednesday_party_race_0") {
          this.hstart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_0") {
          this.jstart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_10") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_100") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_1000") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_0") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_10") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_100") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_1000") {
          this.kstart = nedata[x];
        }
      }
      this.newNextData = nedata;

      this.dataReady = true;
      this.timerReady = true;
    });
  }

  getLiveRaces() {
    this.timerReady = false;
    this.liveObserver = this.api.racesCurrentV2List().subscribe((data) => {
      const nedata: any = data;
      nedata.sort((a, b) => a.bet_amount - b.bet_amount);
      const live = nedata.filter(
        (word) => word.finishing_in_seconds > 0 && word.is_canceled === false
      );
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
    this.myLdrbrd = data;
  }

  filterRace(mtype: string) {
    const filtered = this.newNextData;
    filtered.filter((race) => race.race_identifier === mtype);
    return filtered;
  }

  getMyRewards() {
    this.merewardObserver = this.rwrdsrvc.rewardsMeList().subscribe((data) => {
      this.rewardsMe = data;
    });
  }
  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList().subscribe((datax) => {
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
      this.rewardLevelSum;
    }
    if (data > 999) {
      this.rewardLevelMax = 10000;
    }
    this.rewardLevel = data;
    this.rewardLevelSum = (this.rewardLevel / this.rewardLevelMax) * 100;
    if (this.rewardLevelSum > 100) {
      this.rewardLevelSum = 100;
    }
  }
  showModal() {
    if (this.modalActive === 1) {
      this.modalActive = 0;
    } else {
      this.modalActive = 1;
    }
  }
  closeModal() {
    this.modalActive = false;
  }
  getmyFavRaces() {
    this.favObserver = this.drvrsrvc.driversFavRacesList().subscribe((data) => {
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

    this.updateFavCoinsObserver = this.drvrsrvc
      .driversFavRacesUpdate({ race_identifiers: data })
      .subscribe((datax) => {
        this.getmyFavRaces();
      });
  }

  getMyLevel() {
    this.myAffilate = this.identityService.getStorageAff();
  }

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
      // this.launchTutorial();
    });
  }

  recognizeBanner() {
    const d = new Date();
    const n = d.getDay();
    if (n === 3) {
      this.bannerType = "wednesday";
    } else if (n !== 3) {
      this.bannerType = "tournament";
    }
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

  animateValue(start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = Math.floor(end / 2 / 100);
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
    const _initial = "2021-07-01T10:17:28.593Z";
    const fromTime = new Date();
    const toTime = new Date(_initial);

    this.hwdays = (toTime.getTime() - fromTime.getTime()) / 1000;
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
    if (this.myCarsvals > 0 && this.myCarsvals < 1000) {
      this.carBonus = 6;
    }
    if (this.myCarsvals > 1000 && this.myCarsvals < 5000) {
      this.carBonus = 12;
    }
    if (this.myCarsvals > 5000 && this.myCarsvals < 10000) {
      this.carBonus = 18;
    }
    if (this.myCarsvals > 10000) {
      this.carBonus = 24;
    }
  }
  getFreeCar() {
    this.capi.carsBuyList("0").subscribe((mycar) => {
      this.getMyCars();
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
    this.ownedCars = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "car"
    );
    this.ownedRacers = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "racer"
    );
  }
  getMyAssets() {
    this.myCarsObserver = this.capi.carsMineList().subscribe((data) => {
      if (data.length === 0) {
        this.getFreeCar();
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.cars.length; x++) {
          if (objs.cars[x].car_id === 1) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 2) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 3) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 4) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 5) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 6) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 7) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 8) {
            this.products[8]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 9) {
            this.products[9]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 10) {
            this.products[10]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 11) {
            this.products[11]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 12) {
            this.products[12]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 13) {
            this.products[14]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 14) {
            this.products[15]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 15) {
            this.products[16]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 16) {
            this.products[17]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 17) {
            this.products[18]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 18) {
            this.products[19]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 19) {
            this.products[21]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 20) {
            this.products[22]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 21) {
            this.products[23]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 22) {
            this.products[24]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 23) {
            this.products[25]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 24) {
            this.products[26]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 25) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 26) {
            this.products[13]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 27) {
            this.products[20]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 28) {
            this.products[27]["amount"].push(objs.cars[x]);
          }
        }

        for (let x = 0; x < objs.racers.length; x++) {
          if (objs.racers[x].car_id === 1) {
            this.products[28]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 2) {
            this.products[29]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 3) {
            this.products[30]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 4) {
            this.products[31]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 5) {
            this.products[32]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 6) {
            this.products[33]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 7) {
            this.products[34]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 8) {
            this.products[35]["amount"].push(objs.cars[x]);
          }
        }
      }
      this.filterMyAssets();
      this.filterHighestValue();
    });
  }

  getMyCars() {
    this.myCarsObserver = this.capi.carsMineList().subscribe((datax) => {
      const data: any = datax;
      const objs: any = data.cars;
      this.dailyReward = data.daily_staking_reward;
      const haha = objs.sort((a, b) => b.car_id - a.car_id);
      haha.reverse();
      this.myCars = haha;
      this.calcCarsValue();
    });
  }

  setBannerInterval() {
    this.bannerInterval = setInterval(() => {
      if (this.topBannerIndex === 3) {
        this.topBannerIndex = 1;
      } else {
        this.topBannerIndex++;
      }
    }, 6000);
  }

  nextBanner() {
    if (this.topBannerIndex === 3) {
      this.topBannerIndex = 1;
    } else this.topBannerIndex++;
    clearInterval(this.bannerInterval);
    this.setBannerInterval();
  }
  prevBanner() {
    if (this.topBannerIndex === 1) {
      this.topBannerIndex = 3;
    } else this.topBannerIndex--;
    clearInterval(this.bannerInterval);
    this.setBannerInterval();
  }

  manualBannerChange(index: number) {
    this.topBannerIndex = index;
    clearInterval(this.bannerInterval);
    this.setBannerInterval();
  }

  nextTimers() {
    setTimeout(() => {
      this.getLiveRaces();
    }, 1000);
  }

  tipsSaved(myBool: boolean) {
    this.showDayTipModal = myBool;
  }

  nextTutorialStep() {
    if (this.tutorialStep === 4) {
      this.router.navigate(["/other/tasks"]);
    }
    this.tutorialStep++;
  }

  getMyTeamReward() {
    this.teamSubscription = this.lapi
      .leaderboardTeamInternalList()
      .subscribe((datax) => {
        const data: any = datax;
        this.myTeamReward = data.team_bonus;
        this.myTeam = data;

        if (data.manager_user_id === this.myId) {
          this.meManager = true;
        }
        this.getTips();
        //this.recognizeOwnerMe();
      });
  }

  getbestRacer() {
    this.lapi.bestRider().subscribe((data) => {
      this.bestRacer = data;
    });
  }

  recognizeOpenTips() {
    if (this.meManager === false && this.isPremium === false) {
      this.notify.error(
        "premium needed",
        "You need to become a premium team member, to see Tip of the day"
      );
      this.router.navigate(["/teams/join-teams"]);
      return;
    }
    if (this.meManager === true && this.isPremium === true) {
      this.showDayTipModal = true;
    }
  }

  recognizeOwner() {}

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

  getTips() {
    this.eventSubscription = this.tsapi.getTips().subscribe((data) => {
      this.tips = data;
    });
  }

  recognizeOwnerMe() {
    let sum = 0;
    for (let x = 0; x < this.myTeam.owners.length; x++) {
      if (this.myId === this.myTeam.owners[x].user_id) {
        sum = sum + 1;
      }
    }
    if (sum > 0) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

    //this.getTips();
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
  setRewardInterval() {
    this.rewardInterval = window.setInterval(() => {
      this.toggleReward();
    }, 5000);
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
  toggleReward() {
    this.clearIntervalReward();

    if (this.reward === 1) {
      this.reward = 2;
    } else {
      this.reward = 1;
    }
    this.setRewardInterval();
  }
  clearIntervalReward() {
    clearInterval(this.rewardInterval);
  }
  navigateToToken() {
    window.open("https://ioi-token.com", "_blank");
  }
}
