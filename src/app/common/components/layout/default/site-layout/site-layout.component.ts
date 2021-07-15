import { environment } from "./../../../../../../environments/environment.prod";
import { NextRaceV2 } from "./../../../../../api/models/next-race-v2";
import { RacesService } from "src/app/api/services";
import { NotifiqService } from "./../../../../services/notifiq.service";
import { BalanceService } from "./../../../../services/balance.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AbstractComponent } from "../../../abstract.component";
import { Identity } from "../../../../../user/models/identity";
import {
  DriversService,
  AffiliatesService,
  CarsService,
  AuthService as ninja,
} from "../../../../../api/services";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/user/services/auth.service";
import {
  Experience,
  ExperienceService,
} from "src/app/common/services/experience.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TeamsService } from "../../../../../api/services/teams.service";

declare let $: any;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
};

@Component({
  selector: "app-site-layout",
  templateUrl: "./site-layout.component.html",
  styleUrls: ["./site-layout.component.scss"],
})
export class SiteLayoutComponent
  extends AbstractComponent
  implements OnInit, OnDestroy
{
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
  verifyStep = 2;
  settingsShown = false;
  selectStyling = {
    subHeader: "Select token type",
    cssClass: "customSelect profileSelect",
  };

  myAffilate: any;
  myDriver: any;
  myDriverStats: any;
  myDriverAff: any;
  interval: any;
  refreshInterval: any;
  myTeams: any;
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
  menuType = "races";
  selectedMode = "owner";
  myAddressClass = "";
  selectedTeam = 0;
  animateState = 0;
  animateTeamState = 0;
  sumUsers = 0;
  trxUsdt = 3;
  startTeamIndex = 0;
  sliceBalancer = 3;
  tickInterval: any;
  managerInterval: any;
  depositInterval: any;
  depos = false;
  Affilate: any;
  deposTime: any;
  balanceInterval: any;
  metaEth = { ioi: 0, eth: 0, matic: 0 };
  shaking = false;
  introModal = false;
  tutorialStarted = false;
  tutorialStep = 1;
  ownedRacers: any;
  myCarsObserver: Subscription;
  products: Array<object> = [
    //bronze

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
  constructor(
    public router: Router,
    protected driverSrvc: DriversService,
    protected affisrvc: AffiliatesService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    private uapi: ninja,
    private notify: NotifiqService,
    private experience: ExperienceService,
    private rservice: RacesService,
    private _http: HttpClient,
    protected teams: TeamsService,
    private capi: CarsService
  ) {
    super();
    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }
  get isSidebarVisible(): boolean {
    return this.balanceService.balanceChanged;
  }

  ngOnInit() {
    const metaBalance = JSON.parse(localStorage.getItem("meta-balance"));
    const mmea = JSON.parse(localStorage.getItem("mmea"));
    const tick = JSON.parse(localStorage.getItem("trxusdt"));
    const data = JSON.parse(localStorage.getItem("first-time"));
    this.getTeams();
    if (data) {
      this.verifyModal = true;
      this.getTeams();
    }
    this.balanceInterval = setInterval(() => {
      this.identityService.updateBalance();
    }, 60000);
    this.getCryptoStats();

    if (tick) {
      this.trxUsdt = tick;
      this.tickInterval = setInterval(() => {
        this.getCryptoStats();
        const tickn = JSON.parse(localStorage.getItem("trxusdt"));
        this.trxUsdt = tickn;
      }, 3000);
    }
    this.getMyAssets();
    this.getMyLevel();
    this.getMydriverAff();
    this.getMydriver();
    this.recognizeManager();
    this.managerInterval = setInterval(() => {
      this.getCryptoStats();
      this.recognizeManager();
    }, 2000);

    this.balanceService.balanceChange.subscribe((data) => {
      this.getCryptoStats();
    });
    const brec = JSON.parse(localStorage.getItem("ndate"));
    const bnowx = Date.now();
    const bdiff = Number(bnowx) - Number(brec);
    if (brec && bdiff > 20000) {
      this.checkUser();
      this.getNextraces();
    }
    if (brec === undefined) {
      this.checkUser();
    }
    this.nxInterval = setInterval(() => {
      const rec = JSON.parse(localStorage.getItem("ndate"));
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
    this.sumUsers = 173;

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
    clearInterval(this.balanceInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);

    clearInterval(this.nxInterval);
    clearInterval(this.ninterval);
    clearInterval(this.tickInterval);
    clearInterval(this.managerInterval);
    clearInterval(this.depositInterval);
    clearInterval(this.balanceInterval);
  }

  logout() {
    clearInterval(this.interval);

    clearInterval(this.nxInterval);
    clearInterval(this.ninterval);
    clearInterval(this.tickInterval);
    clearInterval(this.managerInterval);
    clearInterval(this.depositInterval);
    clearInterval(this.balanceInterval);
    this.identityService.logout();
  }

  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
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
    elem1.scrollIntoView({ behavior: "auto", block: "start" });
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
    this.notiObserver = this.driverSrvc
      .driversNotificationsList()
      .subscribe((data) => {
        this.countNotifications(data);
      });
  }

  getNotificationsAndClear() {
    this.notiObserver = this.driverSrvc
      .driversNotificationsList()
      .subscribe((data) => {
        this.countNotifications(data);
        setTimeout(() => {
          localStorage.setItem("ndate", JSON.stringify(Date.now()));
        }, 500);
      });
  }

  countNotifications(data) {
    this.numOfNotifications = data.length;
    for (let x = 0; x < data.length; x++) {
      if (data[x].event === "deposit") {
        this.checkDeposit(data[x].created);
      }
    }

    if (this.numOfNotifications > this.numOfNotificationsBack) {
      this.numOfNotificationsBack = this.numOfNotifications;
      this.shakeBell();
    }
  }

  getNextraces() {
    this.raceDriverObserver = this.rservice
      .racesNextV2List()
      .subscribe((data) => {
        this.calcInterestedRaces(data);
      });
  }

  calcInterestedRaces(data: NextRaceV2[]) {
    const filteredFree = data.filter((item) => {
      return item.race_identifier === "tournament_for_ticket_0";
    });
    const filteredFreeTime = filteredFree[0].starts_in_seconds;

    const filteredTrx = data.filter((item) => {
      return item.race_identifier === "classic_tournament_10";
    });
    const filteredTrxTime = filteredTrx[0].starts_in_seconds;

    const filteredIoi = data.filter((item) => {
      return item.race_identifier === "classic_tournament_0";
    });
    const filteredIoiTime = filteredIoi[0].starts_in_seconds;

    let magicArray = [];

    magicArray.push(filteredFreeTime);
    magicArray.push(filteredTrxTime);
    magicArray.push(filteredIoiTime);

    const lowestTime = Math.min(...magicArray);

    if (lowestTime === filteredFreeTime) {
      this.nextTour = filteredFree[0];
    }
    if (lowestTime === filteredTrxTime) {
      this.nextTour = filteredTrx[0];
    }
    if (lowestTime === filteredIoiTime) {
      this.nextTour = filteredIoi[0];
    }
  }

  toggleSettings() {
    if (this.settingsShown === true) {
      this.settingsShown = false;
    } else {
      this.settingsShown = true;
    }
  }
  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance =
      this.myDriverBalances.game_wallet_ioi +
      this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
    const datax = this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }

  closeTutorial() {
    localStorage.removeItem("first-time");
  }

  changeManager() {
    this.isManager = !this.isManager;
    if (this.isManager) {
      localStorage.setItem("manager", JSON.stringify(this.isManager));
    } else {
      localStorage.removeItem("manager");
    }
    this.recognizeManager();
  }

  recognizeManager() {
    const man = this.identityService.getDriverMe().mode;
    if (man === "owner") {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }

  checkDeposit(checker: string) {
    if (this.deposTime) {
      if (checker > this.deposTime) {
        this.depos = false;
        localStorage.removeItem("depos");
      }
    }
  }

  copyMyAddress() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.myDriverStats.my_crypto_address;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  animateOnClick() {
    this.myAddressClass = "animate";
    setTimeout(() => {
      this.myAddressClass = "";
    }, 1000);
  }

  getMetamaskBalance() {
    this.getMeta().subscribe({
      next: (data) => this.setupMetaBalance(data),
      error: (error) => this.getErrorService().apiError(error),
    });
    localStorage.setItem("meta-balance", JSON.stringify(true));
  }

  setupMetaBalance(data) {
    this.metaEth = data;
    this.isUsingMetamask = true;
  }

  getMeta() {
    return this._http.get(
      environment.api_url + "/me/metamask-balances",
      httpOptions
    );
  }

  closeFirstModal(myBool: boolean) {
    this.closeTutorial();
    this.verifyModal = myBool;
  }

  setManager(wantToBeManager: boolean) {
    this.isManager = wantToBeManager;
    if (this.isManager) {
      localStorage.setItem("manager", JSON.stringify(this.isManager));
    } else {
      localStorage.removeItem("manager");
    }
    this.recognizeManager();
  }

  animateManagerMode(wantToBeManager: boolean) {
    if (wantToBeManager === true) {
      this.setManager(true);
      this.animateState = 1;
    } else if (wantToBeManager === false) {
      this.setManager(false);
      this.animateState = 2;
    }
    setTimeout(() => {
      this.verifyStep = 2;
    }, 2800);
  }

  closeMenu(myBool: boolean) {
    this.menuOpen = myBool;
  }

  setMode(type: string) {
    this.driverSrvc.driversSetMode({ mode: type }).subscribe((data) => {
      this.verifyStep = 2;
    });
  }

  shakeBell() {
    this.shaking = true;
    setTimeout(() => {
      this.shaking = false;
    }, 1000);
  }

  joinTeamFree(teamId: number) {
    this.teams
      .teamsJoinCreate({
        join_team_id: teamId,
        join_paid_membership: false,
        month_count: 1,
        join_now: true,
      })
      .subscribe((data) => {
        setTimeout(() => {
          this.identityService.updateLeaderboardMe();
          this.identityService.updateDriverMe();
          this.getMydriver();
          this.verifyStep = 3;
        }, 100);
      });
  }

  nextTeam() {
    if (this.selectedTeam > 2) {
      this.selectedTeam = 1;
    } else {
      this.selectedTeam++;
    }
  }

  prevTeam() {
    if (this.selectedTeam === 1) {
      this.selectedTeam = 3;
    } else {
      this.selectedTeam--;
    }
  }

  nextTeamPc() {
    if (this.startTeamIndex < this.myTeams.length - this.sliceBalancer) {
      this.startTeamIndex++;
    } else this.startTeamIndex = 0;
  }

  prevTeamPc() {
    if (this.startTeamIndex > 0) {
      this.startTeamIndex--;
    } else this.startTeamIndex = this.myTeams.length - this.sliceBalancer;
  }

  getTeams() {
    if (window.innerWidth < 641) {
      this.sliceBalancer = 1;
    }
    this.teams.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.myTeams = data.results;
    });
  }
  filterHighestValue() {
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
    this.ownedRacers = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "racer"
    );
  }

  getMyAssets() {
    this.myCarsObserver = this.capi.carsMineList().subscribe((data) => {
      if (data.length === 0) {
        null;
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.racers.length; x++) {
          if (objs.racers[x].car_id === 1) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 2) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 3) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 4) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 5) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 6) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 7) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 8) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
        }
      }
      this.filterMyAssets();
      this.filterHighestValue();

    });
  }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    data.is_in_tutorial === true
      ? (this.tutorialStarted = true)
      : (this.tutorialStarted = false);

    if (this.tutorialStarted === true) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
      this.introModal = false;
    }
  }

  onboardingClose(event: any) {
    if (event === true) {
      this.closeFirstModal(false);
      this.router.navigate(["/car/nft-market"]);
    } else {
      this.closeFirstModal(false);
    }
  }

}
