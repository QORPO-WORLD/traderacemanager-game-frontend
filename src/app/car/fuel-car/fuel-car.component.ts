import { BalanceService } from "./../../common/services/balance.service";
import { AuthService } from "./../../user/services/auth.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../common/services/notifiq.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  CarsService,
  RacesService,
  DriversService,
  RacesV2Service,
} from "../../api/services";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";
import { FavCoins, MultiCanJoinV2, NextRaceV2 } from "src/app/api/models";
import { TeamsService } from "src/app/api/services";
declare let gtag: Function;
@Component({
  selector: "app-fuel-car",
  templateUrl: "./fuel-car.component.html",
  styleUrls: ["./fuel-car.component.scss"],
})
export class FuelCarComponent implements OnInit, OnDestroy {
  selectedChart = "chart";
  myCars: any;
  myCarsInEdition: any;
  myCar: any;
  dataReady = false;
  timerReady = false;
  fuel = 0;
  raceId: string;
  pricePool: number;
  betAmount: number;
  raceData: NextRaceV2[];
  raceStarts: any;
  activeFuelType: number;
  activeFuel = true;
  actualCarIndex = 0;
  bestIndex = 0;
  editionIndex = 1;
  tutorialStep = 1;
  availableCars = [];
  selectedCarToRace: any;
  pageOpen = true;
  noMultibet = false;
  myCarsInGame: any;
  walleteOpen = true;
  driverObservable: Subscription;
  myCarsObservable: Subscription;
  signupObservable: Subscription;
  racesObservable: Subscription;
  balanceObservable: Subscription;
  canJoinObservable: Subscription;
  firstLoginObserver: Subscription;
  updateFavCoinsObserver: Subscription;
  getFavCoinsObserver: Subscription;
  mostFueledObserver: Subscription;
  myteamObserver: Subscription;
  eventSubscription: Subscription;
  tips = [];
  teamId: number;
  myBalance = 0;
  actualRaceAmount: any;
  nextRaceHash: string;
  numOfBets = 0;
  trxneeded: number;
  validerr: string;
  showPulse = true;
  carsCanJoin: MultiCanJoinV2;
  introModal = false;
  firstLogin = false;
  introModalSecond = false;
  favCoins: FavCoins;
  myFavCoins = [];
  sortingStarted = false;
  scrollAnimation = false;
  myBetInput = [];
  myMultiBetAmounts = [];
  mostFueled: any;
  myTeam: string;
  selectStyling = {
    subHeader: "Play more races with the same bet.",
    cssClass: "customSelect",
  };
  multibetOptions = [];
  isSpecial = false;
  canJoin1: any;
  canJoin2: any;
  canJoin3: any;
  canJoin4: any;
  canJoin5: any;
  canJoin6: any;
  canJoinIoi1: any;
  canJoinIoi2: any;
  canJoinIoi3: any;
  animationInterval: any;
  newCars = [];
  chosenRace: any;
  xtrx: number;
  calc1: any;
  calc2: any;
  calc3: any;
  calc4: any;
  calc5: any;
  calc6: any;
  calc7: any;
  calc8: any;
  usedCars = [];
  animatedCurrIndex = 20;
  windowSelectCarIndex = 0;
  windowFuelCarIndex = 0;
  isWnd = false;
  animatingSlider = false;
  tutorialIndex: number;
  tickets: number;
  selectedSymbol: string;
  myBet: Array<any> = [
    {
      symbol: "BTCUSDT",
      desc: "BTC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 0,
    },
    {
      symbol: "ETHUSDT",
      desc: "ETH",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 1,
    },
    {
      symbol: "XRPUSDT",
      desc: "XRP",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 2,
    },
    {
      symbol: "BCHUSDT",
      desc: "BCH",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 3,
    },
    {
      symbol: "LTCUSDT",
      desc: "LTC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 4,
    },
    {
      symbol: "EOSUSDT",
      desc: "EOS",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 5,
    },
    {
      symbol: "BNBUSDT",
      desc: "BNB",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 6,
    },
    {
      symbol: "XMRUSDT",
      desc: "XMR",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 7,
    },
    {
      symbol: "ADAUSDT",
      desc: "ADA",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 8,
    },
    {
      symbol: "TRXUSDT",
      desc: "TRX",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 9,
    },
    {
      symbol: "BATUSDT",
      desc: "BAT",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 10,
    },
    {
      symbol: "XLMUSDT",
      desc: "XLM",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 11,
    },
    {
      symbol: "XTZUSDT",
      desc: "XTZ",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 12,
    },
    {
      symbol: "ENJUSDT",
      desc: "ENJ",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 13,
    },
    {
      symbol: "MATICUSDT",
      desc: "MATIC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 14,
    },
    {
      symbol: "LINKUSDT",
      desc: "LINK",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 15,
    },
    {
      symbol: "WAVESUSDT",
      desc: "WAVES",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 16,
    },
    {
      symbol: "ZILUSDT",
      desc: "ZIL",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 17,
    },
    {
      symbol: "VETUSDT",
      desc: "VET",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 18,
    },
    {
      symbol: "USDTUSDT",
      desc: "USDT",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 19,
    },
  ];
  selectedBets: Array<number> = [];
  order = "favourite";
  reverse = true;
  isPremium = false;
  editionStylePx = 0;
  editionAvailableSlides: number;
  currAvailableSlides: number;
  carSlideIndex = 0;
  selectedSlideIndex = 0;
  currSlideIndex = 0;
  selectedCarIndex = 0;
  stepIndex = 1;
  favFilter = false;
  useTicket = false;
  selectedCarsToRace = [];
  sumFuel: number;
  sumlength: number;
  isIoi: boolean;
  currency = "TRX";
  raceMode = "3d";
  ioiBalance: number;
  summaryCarIndex = 0;
  isLoading = false;
  hideConfirm = true;
  summaryTrxAmount = 0;
  summaryIoiAmount = 0;
  newEditionIndex = 0;
  bottomCarsBalancer = 4;
  bottomPercentBalancer = 25;
  slidePercent = 20;
  rareAdjustNum = 3;
  myDriverStats: any;
  myAffilate: any;
  players = 0;
  trDate: number;
  trsDate: number;
  redirecting = false;
  useUnity = false;
  myCars1 = [];
  myCars2 = [];
  myCars3 = [];
  myCars4 = [];
  displayArray = [];

  constructor(
    private router: Router,
    protected api: CarsService,
    protected raceApi: RacesService,
    protected route: ActivatedRoute,
    protected notify: NotifiqService,
    protected driverSrvc: DriversService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    private racetwoapi: RacesV2Service,
    private teamsServ: TeamsService
  ) {
    this.raceId = this.route.snapshot.paramMap.get("id");

    this.trxneeded = 0;
    /*
    if (this.raceId === 'car_race_ioi_1' || this.raceId === 'car_race_ioi_3' || this.raceId === 'car_race_ioi_5') {
      this.isIoi = true;
      this.currency = 'IOI';
    }
*/
  }

  ngOnInit(): void {
    this.getCanJoin();
    this.getfirstraces();
    this.getMyDriverStats();
    this.getMyBalance();
    this.fuelBest();
    this.launchTutorial();
    this.getMyTeam();
    this.getMyLeaderboard();
    this.trDate = Date.now();
    this.trsDate = Date.now();
    this.recognizeGame();
    this.getTickets();
  }

  ngOnDestroy() {
    this.pageOpen = false;
    if (this.driverObservable) {
      this.driverObservable.unsubscribe();
    }
    if (this.myCarsObservable) {
      this.myCarsObservable.unsubscribe();
    }
    if (this.signupObservable) {
      this.signupObservable.unsubscribe();
    }
    if (this.racesObservable) {
      this.racesObservable.unsubscribe();
    }
    if (this.balanceObservable) {
      this.balanceObservable.unsubscribe();
    }
    if (this.canJoinObservable) {
      this.canJoinObservable.unsubscribe();
    }
    if (this.firstLoginObserver) {
      this.firstLoginObserver.unsubscribe();
    }
    if (this.updateFavCoinsObserver) {
      this.updateFavCoinsObserver.unsubscribe();
    }
    if (this.getFavCoinsObserver) {
      this.getFavCoinsObserver.unsubscribe();
    }
    if (this.mostFueledObserver) {
      this.mostFueledObserver.unsubscribe();
    }
    if (this.myteamObserver) {
      this.myteamObserver.unsubscribe();
    }
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.redirecting = true;
  }

  getCanJoin() {
    this.canJoinObservable = this.raceApi
      .racesMultiCanJoinV2List()
      .subscribe((data) => {
        const newdata: any = data;
        const mynextrace = newdata.filter((item) => {
          return item.race_hash === this.raceId;
        });

        this.carsCanJoin = mynextrace[0].available_cars;

        const step1 = newdata.filter((item) => {
          return item.race_identifier === "car_race_ioi_1";
        });
        const uniq1 = [...new Set(step1)];
        this.canJoin1 = uniq1;

        const step2 = newdata.filter((item) => {
          return item.race_identifier === "car_race_ioi_5";
        });
        const uniq2 = [...new Set(step2)];
        this.canJoin2 = uniq2;

        const step3 = newdata.filter((item) => {
          return item.race_identifier === "car_race_ioi_10";
        });
        const uniq3 = [...new Set(step3)];
        this.canJoin3 = uniq3;

        const step4 = newdata.filter((item) => {
          return item.race_identifier === "car_race_ioi_50";
        });
        const uniq4 = [...new Set(step4)];
        this.canJoin4 = uniq4;

        const step5 = newdata.filter((item) => {
          return item.race_identifier === "car_race_ioi_100";
        });

        const uniq5 = [...new Set(step5)];
        this.canJoin5 = uniq5;

        // const step7 = newdata.filter(item => {
        //   return item.race_identifier === 'car_race_ioi_3';
        // });
        // const uniq7 = [...new Set(step7)];
        // this.canJoinIoi2 = uniq7;

        // const step8 = newdata.filter(item => {
        //   return item.race_identifier === 'car_race_ioi_5';
        // });
        // const uniq8 = [...new Set(step8)];
        // this.canJoinIoi3 = uniq8;

        this.chosenRace = newdata.filter((item) => {
          return item.race_hash === this.raceId;
        });
        this.getRaceDetails();
      });
  }
  getMyBalance() {
    const data = this.identityService.getBalance();
    this.ioiBalance = data.game_wallet_ioi;
  }

  getMyLevel() {
    this.myAffilate = this.identityService.getStorageAff();
  }

  getMyDriverStats() {
    this.myDriverStats = this.identityService.getStorageIdentity();
    this.getMyLevel();
  }

  calcPossibleMultibet() {
    this.multibetOptions.length = 0;
    const props = ["asset_id"];

    const z1 = this.canJoin1[0].available_cars;
    const z2 = this.canJoin2[0].available_cars;
    const z3 = this.canJoin3[0].available_cars;
    const z4 = this.canJoin4[0].available_cars;
    const z5 = this.canJoin5[0].available_cars;

    // const zioi1 = this.canJoinIoi1[0].available_cars;
    //const zioi3 = this.canJoinIoi2[0].available_cars;
    // const zioi5 = this.canJoinIoi3[0].available_cars;

    const yy = this.usedCars;

    const res1 = z1
      .filter(function (o1) {
        return yy.some(function (o2) {
          return o1.asset_id === o2.asset_id; // assumes unique id
        });
      })
      .map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

    const res2 = z2
      .filter(function (o1) {
        return yy.some(function (o2) {
          return o1.asset_id === o2.asset_id; // assumes unique id
        });
      })
      .map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

    const res3 = z3
      .filter(function (o1) {
        return yy.some(function (o2) {
          return o1.asset_id === o2.asset_id; // assumes unique id
        });
      })
      .map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

    const res4 = z4
      .filter(function (o1) {
        return yy.some(function (o2) {
          return o1.asset_id === o2.asset_id; // assumes unique id
        });
      })
      .map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

    const res5 = z5
      .filter(function (o1) {
        return yy.some(function (o2) {
          return o1.asset_id === o2.asset_id; // assumes unique id
        });
      })
      .map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

    this.calc1 = z1;
    this.calc2 = z2;
    this.calc3 = z3;
    this.calc4 = z4;
    this.calc5 = z5;

    // this.calc6 = zioi1;
    //this.calc7 = zioi3;
    // this.calc8 = zioi5;

    const in1 = this.calc1.length > 0;
    const in2 = this.calc2.length > 0;
    const in3 = this.calc3.length > 0;
    const in4 = this.calc4.length > 0;
    const in5 = this.calc5.length > 0;

    // const inioi1 = this.calc6.length > 0;
    //const inioi3 = this.calc7.length > 0;
    // const inioi5 = this.calc8.length > 0;

    if (this.ioiBalance >= 1 && in1 === true && this.actualRaceAmount !== 1) {
      this.multibetOptions.push({
        val: 1,
        race_hash: this.canJoin1[0].race_hash,
        enabled: true,
        type: "car_race_ioi_1",
      });
    }

    if (this.ioiBalance >= 5 && in2 === true && this.actualRaceAmount !== 5) {
      this.multibetOptions.push({
        val: 5,
        race_hash: this.canJoin2[0].race_hash,
        enabled: true,
        type: "car_race_ioi_5",
      });
    }

    if (this.ioiBalance >= 10 && in3 === true && this.actualRaceAmount !== 10) {
      this.multibetOptions.push({
        val: 10,
        race_hash: this.canJoin3[0].race_hash,
        enabled: true,
        type: "car_race_ioi_10",
      });
    }

    if (this.ioiBalance >= 50 && in4 === true && this.actualRaceAmount !== 50) {
      this.multibetOptions.push({
        val: 50,
        race_hash: this.canJoin4[0].race_hash,
        enabled: true,
        type: "car_race_ioi_50",
      });
    }

    if (
      this.ioiBalance >= 100 &&
      in5 === true &&
      this.actualRaceAmount !== 100
    ) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin5[0].race_hash,
        enabled: true,
        type: "car_race_ioi_100",
      });
    }

    if (this.multibetOptions.length === 0) {
      this.noMultibet = true;
    }
  }

  addToMultibet(
    value: any,
    type: any,
    trxcut: number,
    indexik: number,
    curr: string
  ) {
    this.multibetOptions[indexik].enabled = false;
    for (let x = 0; x < this.selectedCarsToRace.length; x++) {
      let usedcar = 0;

      const arr1 = type;
      const arr2 = this.usedCars;

      const props = ["asset_id"];

      const result = arr1
        .filter(function (o1) {
          return !arr2.some(function (o2) {
            return o1.asset_id === o2.asset_id; // assumes unique id
          });
        })
        .map(function (o) {
          return props.reduce(function (newo, name) {
            newo[name] = o[name];
            return newo;
          }, {});
        });

      const heh = Math.floor(Math.random() * (result.length + 1));
      usedcar = result[heh].asset_id;
      if (usedcar !== 0) {
        this.myMultiBetAmounts.push({
          asset_id: result[x].asset_id,
          race_hash: value.race_hash,
          bet_coins: this.selectedCarsToRace[this.selectedCarIndex].bet,
          trxv: trxcut,
        });
        this.usedCars.push({
          asset_id: result[x].asset_id,
          amount: trxcut,
        });

        if (trxcut < 10) {
          this.summaryIoiAmount = this.summaryIoiAmount + trxcut;
        } else {
          this.summaryTrxAmount = this.summaryTrxAmount + trxcut;
        }

        const filused1 = this.canJoin1[0].available_cars.filter((item) => {
          return item.asset_id !== usedcar;
        });
        this.canJoin1[0].available_cars = filused1;

        const filused2 = this.canJoin2[0].available_cars.filter((item) => {
          return item.asset_id !== usedcar;
        });
        this.canJoin2[0].available_cars = filused2;

        const filused3 = this.canJoin3[0].available_cars.filter((item) => {
          return item.asset_id !== usedcar;
        });
        this.canJoin3[0].available_cars = filused3;

        const filused4 = this.canJoin4[0].available_cars.filter((item) => {
          return item.asset_id !== usedcar;
        });
        this.canJoin4[0].available_cars = filused4;

        const filused5 = this.canJoin5[0].available_cars.filter((item) => {
          return item.asset_id !== usedcar;
        });
        this.canJoin5[0].available_cars = filused5;

        if (curr === "ioi") {
          this.ioiBalance = this.ioiBalance - trxcut;
        } else {
          this.xtrx = this.xtrx - trxcut;
        }

        this.usedCars.push({
          asset_id: usedcar,
          amount: trxcut,
        });
      }

      //this.calcPossibleMultibet();
    }
  }

  removeFromMultibet(
    index: number,
    trxcut: number,
    typenum: number,
    curr: string
  ) {
    this.multibetOptions[index].enabled = true;

    const nodaj = this.myMultiBetAmounts.filter((item) => {
      return trxcut !== item.trxv;
    });
    this.myMultiBetAmounts = nodaj;

    if (curr === "ioi") {
      this.ioiBalance = this.ioiBalance - trxcut;
      this.summaryIoiAmount = this.summaryIoiAmount - trxcut;
    } else {
      this.xtrx = this.xtrx - trxcut;
      this.summaryTrxAmount = this.summaryTrxAmount + trxcut;
    }

    const carid = this.usedCars.filter((item) => {
      return item.amount === trxcut;
    });

    if (typenum === 1) {
      this.canJoin1[0].available_cars.push(carid[0].car);
    }
    if (typenum === 2) {
      this.canJoin2[0].available_cars.push(carid[0].car);
    }
    if (typenum === 3) {
      this.canJoin3[0].available_cars.push(carid[0].car);
    }
    if (typenum === 4) {
      this.canJoin4[0].available_cars.push(carid[0].car);
    }
    if (typenum === 5) {
      this.canJoin5[0].available_cars.push(carid[0].car);
    }

    const reclear = this.usedCars.filter((item) => {
      return item.amount !== trxcut;
    });

    this.usedCars = reclear;

    //this.calcPossibleMultibet();
  }

  serializeSignuprequest() {
    let obj: any = {
      race_hash: this.nextRaceHash,
      car: this.selectedCarToRace.asset_id,
      bet_coins: this.myBet,
    };

    if (this.useTicket === true) {
      obj.use_ticket = "tournament_ticket";
    }

    return obj;
  }

  validateBets() {
    let num = 0;
    let hm = 0;
    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
      x++
    ) {
      num += this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet;
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet >= 5) {
        hm++;
      }
    }
    this.fuel = Math.round(num);
    this.numOfBets = hm;

    if (this.useTicket === true) {
      this.trxneeded = 0;
    }

    if (
      this.fuel === 100 &&
      hm > 2 &&
      hm < 21 &&
      this.myBalance >= this.trxneeded
    ) {
      return true;
    } else {
      this.notify.error("Error", this.validerr);
      return false;
    }
  }

  signupToRace() {
    if (this.validateBets() === false) {
      return;
    } else {
      if (this.nextRaceHash === undefined) {
        this.refireSignup();
        return;
      }
      this.isLoading = true;
      const serialized = [];

      const fakeSelected: any = this.selectedCarsToRace;
      for (let i = 0; i < fakeSelected.length; i++) {
        fakeSelected[i].newBet = [];
        for (let ix = 0; ix < fakeSelected[i].bet.length; ix++) {
          if (fakeSelected[i].bet[ix].bet > 0) {
            fakeSelected[i].newBet.push({
              symbol: fakeSelected[i].bet[ix].symbol,
              bet:
                fakeSelected[i].bet[ix].short === false
                  ? fakeSelected[i].bet[ix].bet
                  : fakeSelected[i].bet[ix].bet * -1,
            });
          }
        }
      }
      for (let i = 0; i < fakeSelected.length; i++) {
        if (this.useTicket === true && this.tickets > 0) {
          serialized.push({
            race_hash: this.nextRaceHash,
            car: fakeSelected[i].asset_id,
            bet_coins: fakeSelected[i].newBet,
            use_ticket: "tournament_ticket",
          });
          this.tickets = this.tickets - 1;
        } else {
          serialized.push({
            race_hash: this.nextRaceHash,
            car: fakeSelected[i].asset_id,
            bet_coins: fakeSelected[i].newBet,
          });
        }
      }

      /*
      setTimeout(() => {
        if (this.redirecting === false) {
          this.redirecting = true;
          this.redirectToRace();
        }
      }, 5000);

*/

      this.raceApi.racesMultiSignupCreate(serialized).subscribe(
        (res) => this.checkRedirect(), // response
        (err) => this.resolveSignupError(err), // error
        () => console.log("sending sign to race")
      );
    }
  }

  resolveSignupError(err: any) {
    //console.log(err);
    this.notify.error("error", err.error.description);
    this.isLoading = false;
    //err.error.description === 'Signup to race failed. Race did already start.' ? this.refireSignup() : this.notify.error('error', err.error.description);
  }

  checkRedirect() {
    gtag("event", "conversion", {
      send_to: "AW-580556065/7HYSCPCim8gCEKGq6pQC",
    });
    if (this.myMultiBetAmounts.length > 0) {
      this.multibet();
    } else {
      if (this.nextRaceHash !== undefined) {
        this.redirecting = true;
        this.redirectToRace();
      } else {
        console.log("chyba");
      }
    }
  }

  refireSignup() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        this.nextRaceHash = data.race_hash;

        this.signupToRace();
      });
  }

  refireMultiSignup() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        this.nextRaceHash = data.race_hash;

        this.multibet();
      });
  }

  multibet() {
    if (this.validateBets() === false) {
      return;
    } else {
      this.isLoading = true;
      const serialized = [];
      const fakeSelected: any = this.updateMultibetRaceHashes();

      for (let i = 0; i < fakeSelected.length; i++) {
        fakeSelected[i].newBet = [];
        for (let ix = 0; ix < fakeSelected[i].bet_coins.length; ix++) {
          if (fakeSelected[i].bet_coins[ix].bet > 0) {
            fakeSelected[i].newBet.push({
              symbol: fakeSelected[i].bet_coins[ix].symbol,
              bet: fakeSelected[i].bet_coins[ix].bet,
            });
          }
        }
      }
      for (let i = 0; i < fakeSelected.length; i++) {
        serialized.push({
          race_hash: fakeSelected[i].race_hash,
          car: fakeSelected[i].asset_id,
          bet_coins: fakeSelected[i].newBet,
        });
      }

      this.raceApi.racesMultiSignupCreate(serialized).subscribe((data) => {});
      if (this.nextRaceHash !== undefined) {
        this.redirecting = true;
        this.redirectToRace();
      } else {
        this.redirectAfterMultibet();
      }
    }
  }

  redirectAfterMultibet() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        this.nextRaceHash = data.race_hash;
        this.redirecting = true;
        this.redirectToRace();
      });
  }

  redirectToRace() {
    //this.play();
    //this.notify.success('Great!', 'You have subscribed to race!', 3000);
    const that = this;
    setTimeout(() => {
      this.balanceService.balanceHasbeenChanged();
      this.identityService.meUpdate();
    }, 5000);

    that.isLoading = false;

    if (this.myMultiBetAmounts.length > 0) {
      const commonParams = [];
      let routesParams = [];
      commonParams.push(this.nextRaceHash);
      for (let x = 0; x < this.myMultiBetAmounts.length; x++) {
        commonParams.push(this.myMultiBetAmounts[x].race_hash);
      }

      routesParams = commonParams.filter((data, index) => {
        return commonParams.indexOf(data) === index;
      });

      this.router.navigate([
        "/race/watch-multiple-races/",
        { races: routesParams },
      ]);
    } else {
      if (that.raceId === "car_race_24hrs_1000") {
        that.router.navigate(["/race/watch-race-24hod/" + that.nextRaceHash]);
      } else {
        that.router.navigate(["/race/watch-race-3min/" + that.nextRaceHash]);
      }
    }
  }

  increaseBet(index) {
    if (
      this.fuel < 100 &&
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet < 100
    ) {
      const x =
        this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet + 0.1;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet =
        +x.toFixed(2);
    }
    this.calculateExactBidsAmount();
  }

  decreaseBet(index) {
    if (this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet > 0) {
      const x =
        this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet - 0.1;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet =
        +x.toFixed(2);
    }
    this.calculateExactBidsAmount();
  }

  calculateExactBidsAmount() {
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 0;
    let num = 0;
    let hm = 0;
    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
      x++
    ) {
      num += this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet;
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet >= 5) {
        hm++;
      }
    }
    if (num > 99.9) {
      this.selectedCarsToRace[this.selectedCarIndex].fuel = Math.round(num);
    } else {
      this.selectedCarsToRace[this.selectedCarIndex].fuel = num;
    }

    this.numOfBets = hm;

    this.calcSumFuel();
  }

  calculateExactBidsAmountForAll() {
    for (let xx = 0; xx < this.selectedCarsToRace.length; xx++) {
      this.selectedCarsToRace[xx].fuel = 0;
      let num = 0;
      let hm = 0;
      for (let x = 0; x < this.selectedCarsToRace[xx].bet.length; x++) {
        num += this.selectedCarsToRace[xx].bet[x].bet;
        if (this.selectedCarsToRace[xx].bet[x].bet >= 5) {
          hm++;
        }
      }
      if (num > 99.9) {
        this.selectedCarsToRace[xx].fuel = Math.round(num);
      } else {
        this.selectedCarsToRace[xx].fuel = num;
      }
      this.numOfBets = hm;
    }

    this.calcSumFuel();
  }

  getRaceDetails() {
    this.timerReady = false;

    this.myCars = this.chosenRace[0].available_cars;
    if (this.myCars.length === 0) {
      this.notify.error(
        "Error",
        "You have no available race car for this race"
      );
      setTimeout(() => {
        this.router.navigate(["/car/nft-market"]);
      }, 1000);
    } else {
      this.myCars = this.myCars.sort((a, b) => {
        return a.extras.tier - b.extras.tier;
      });
    }

    this.filterCarArrays(this.myCars);

    this.changeEdition(1);

    const mynextrace = this.newCars;
    this.pricePool = Number(mynextrace[0].price_pool);
    this.betAmount = Number(mynextrace[0].bet_amount);
    this.raceStarts = mynextrace[0].starts_in;
    this.timerReady = true;
    this.players = mynextrace[0].players;
    this.nextRaceHash = mynextrace[0].race_hash;

    this.actualRaceAmount = mynextrace[0].bet_amount;
    this.isSpecial = true;
    /*
    if (this.raceId === 'wednesday_party_race_0') {
      this.isWnd = true;
    }
*/
    this.validerr =
      "To fuel you car you need " +
      this.actualRaceAmount +
      " IOI, must mix 3 different coins with min. " +
      " 5% in each you must have 100% in your  tank to get into the race. (example 5% BTC, 90% TRX, 5% ETH)";

    const statBet = [];
    const selBets = [];
    for (let x = 0; x < this.myBet.length; x++) {
      const fake: any = {};
      fake.bet = this.myBet[x].bet;
      fake.symbol = this.myBet[x].symbol;
      fake.favourite = this.myBet[x].favourite;
      fake.customIndex = this.myBet[x].customIndex;
      //fake.short = this.myBet[x].short;
      statBet.push(fake);
    }

    for (let y = 0; y < this.myCars.length; y++) {
      this.myCars[y].selected = false;
      this.myCars[y].bet = statBet;
      this.myCars[y].fuel = 0;
      this.myCars[y].selectedBets = selBets;
      this.myCars[y].short = false;
    }

    if (this.myCars.length === 1) {
      this.selectCarToRace(0);
    }
  }

  getAllV2Races() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        const tempArray = [];
        tempArray.push(data);

        this.newCars = tempArray;

        this.nextRaceHash = data.race_hash;
        this.raceStarts = data.starts_in;
        this.timerReady = true;
      });
  }

  getAllV2RacesBase() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        this.pricePool = Number(data.price_pool);
        this.players = data.players;
        this.nextRaceHash = data.race_hash;
        this.raceStarts = data.starts_in;

        this.timerReady = true;
      });
  }

  timerCompleted() {
    this.timerReady = false;
    setTimeout(() => {
      this.getfirstraces();
      this.getCanJoin();
      if (this.stepIndex > 1) {
        this.tutorialStep = 2;
        this.stepIndex = 2;
      }
    }, 1500);
    clearInterval(this.animationInterval);
    this.animatingSlider = false;
  }

  generateRandomNums(numberr, parts, min) {
    const randombit = numberr - min * parts;
    const out = [];

    for (let i = 0; i < parts; i++) {
      out.push(Math.random());
    }

    const mult = randombit / out.reduce((a, b) => a + b);
    return out.map((el) => el * mult + min);
  }

  generateAutomaticBets() {
    for (let xx = 0; xx < this.selectedCarsToRace.length; xx++) {
      const nums: Array<any> = this.generateRandomNums(100, 3, 5);

      this.selectedCarsToRace[xx].selectedBets = [];
      this.activeFuelType = 0;

      for (let x = 0; x < this.selectedCarsToRace[xx].bet.length; x++) {
        this.selectedCarsToRace[xx].bet[x].bet = 0;
        this.selectedCarsToRace[xx].bet[x].selected = false;
        this.selectedCarsToRace[xx].bet[x].short = false;
      }

      while (this.selectedCarsToRace[xx].selectedBets.length < 3) {
        const arr = [];
        const r = Math.floor(Math.random() * 19) + 1;
        if (arr.indexOf(r) === -1) {
          this.selectedCarsToRace[xx].selectedBets.push(r);
        }
      }
      for (let x = 0; x < 3; x++) {
        this.selectedCarsToRace[xx].bet[
          this.selectedCarsToRace[xx].selectedBets[x]
        ].selected = true;
        this.selectedCarsToRace[xx].bet[
          this.selectedCarsToRace[xx].selectedBets[x]
        ].bet = +nums[x].toFixed(1);
      }
      this.calculateExactBidsAmountForAll();
      if (
        this.selectedCarsToRace[xx].fuel !== 100 ||
        this.selectedCarsToRace[xx].selectedBets.length < 3
      ) {
        this.generateAutomaticBets();
      }
    }
  }
  generateAutomaticBetsOnce() {
    const nums: Array<any> = this.generateRandomNums(100, 3, 5);

    this.selectedCarsToRace[this.selectedCarIndex].selectedBets = [];
    this.activeFuelType = 0;

    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
      x++
    ) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].selected = false;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].short = false;
    }

    while (
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3
    ) {
      const arr = [];
      const r = Math.floor(Math.random() * 19) + 1;
      if (arr.indexOf(r) === -1) {
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(r);
      }
    }
    for (let x = 0; x < 3; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]
      ].selected = true;
      this.selectedCarsToRace[this.selectedCarIndex].bet[
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]
      ].bet = +nums[x].toFixed(0);
    }
    this.calculateExactBidsAmount();
    if (
      this.selectedCarsToRace[this.selectedCarIndex].fuel < 100 ||
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3 ||
      this.selectedCarsToRace[this.selectedCarIndex].fuel > 100
    ) {
      this.generateAutomaticBetsOnce();
    }
  }
  generateTopAutomaticBets() {
    this.activeFuelType = 1;
    const nums: Array<any> = this.generateRandomNums(100, 3, 5);

    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
      x++
    ) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
    }

    for (let x = 0; x < this.myBetInput.length; x++) {
      for (
        let i = 0;
        i < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
        i++
      ) {
        if (
          this.selectedCarsToRace[this.selectedCarIndex].bet[i].symbol ===
          this.myBetInput[x].symbol
        ) {
          this.selectedCarsToRace[this.selectedCarIndex].bet[i].bet =
            +nums[x].toFixed(1);
        }
      }
    }

    this.calculateExactBidsAmount();
    this.selectedCarToRace.fuel = 100;
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 100;
  }

  useManualFuel() {
    this.activeFuelType = 1;

    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length;
      x++
    ) {
      //this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = 0;
      if (
        this.selectedCarsToRace[this.selectedCarIndex].bet[
          this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]
        ].bet < 5
      ) {
        this.selectedCarsToRace[this.selectedCarIndex].bet[
          this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]
        ].bet = 5;
      }
    }

    this.calculateExactBidsAmount();
  }

  prepareToSIgn() {
    if (this.validateBets() === false) {
      return;
    } else {
      // open modal
    }
  }

  nextCar() {
    if (this.selectedCarsToRace.length - 1 === this.summaryCarIndex) {
      this.summaryCarIndex = 0;
    } else {
      this.summaryCarIndex++;
    }
  }

  prevCar() {
    if (this.summaryCarIndex === 0) {
      this.summaryCarIndex = this.selectedCarsToRace.length - 1;
    } else {
      this.summaryCarIndex--;
    }
  }

  nextEdition() {
    if (this.myCars.length > this.newEditionIndex + 3) {
      this.newEditionIndex = this.newEditionIndex + 3;
    }
  }
  prevEdition() {
    if (this.newEditionIndex > 0) {
      this.newEditionIndex = this.newEditionIndex - 3;
    }
  }

  selectCarToRace(index) {
    //this.selectedCarToRace = this.myCars[index];
    this.windowFuelCarIndex = this.windowSelectCarIndex = 0;
    this.hideConfirm = false;
    const statBet = [];
    const selBets = [];
    let isSituated;

    isSituated = this.selectedCarsToRace.find(
      (i) => i.asset_id === this.displayArray[index].asset_id
    );

    if (!isSituated) {
      
      if (this.selectedCarsToRace.length > 4) {
        this.notify.error('Error', 'You can fuel a maximum of 5 cars');
        return;
      }
      
      for (let x = 0; x < this.myBet.length; x++) {
        const fake: any = {};
        fake.bet = this.myBet[x].bet;
        fake.symbol = this.myBet[x].symbol;
        fake.favourite = this.myBet[x].favourite;
        fake.customIndex = this.myBet[x].customIndex;
        fake.short = this.myBet[x].short;
        statBet.push(fake);
      }
      this.displayArray[index].selected = true;
      this.displayArray[index].bet = statBet;
      this.displayArray[index].fuel = 0;
      this.displayArray[index].selectedBets = selBets;

      this.selectedCarsToRace.push(this.displayArray[index]);

      this.usedCars.push({
        asset_id: this.displayArray[index].asset_id,
        amount: this.actualRaceAmount,
      });
      this.displayArray[index].selected = true;
    } else {
      this.selectedCarsToRace = this.selectedCarsToRace.filter(
        (j) => j.asset_id !== this.displayArray[index].asset_id
      );
      this.usedCars = this.usedCars.filter(
        (j) => j.asset_id !== this.displayArray[index].asset_id
      );
      this.displayArray[index].selected = false;
      this.displayArray[index].short = false;
    }

    if (this.isIoi === true) {
      this.ioiBalance = this.ioiBalance - this.actualRaceAmount;
    } else {
      this.xtrx = this.xtrx - this.actualRaceAmount;
    }
  }

  changeFuel(event: any, index: number) {
    const oldFuel = this.selectedCarsToRace[this.selectedCarIndex].fuel;
    const noBoy = 100.01 - oldFuel;
    const oldVal =
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet;
    const newVal = parseInt(event.target.value, 10);
    clearInterval(this.animationInterval);
    this.animatingSlider = true;
    this.calculateExactBidsAmount();
    if (this.selectedCarsToRace[this.selectedCarIndex].fuel > 100) {
      const diff = Math.abs(
        100 - this.selectedCarsToRace[this.selectedCarIndex].fuel
      );

      const newdiff =
        this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet - diff;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = newdiff;
      this.calculateExactBidsAmount();
      this.sayValidationError();
    }
    if (
      this.selectedCarsToRace[this.selectedCarIndex].fuel > 95 &&
      this.numOfBets < 3
    ) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = 5;
      this.calculateExactBidsAmount();
      this.sayValidationError();
    }

    if (event.target.value < 5) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = 5;
    }
    this.calculateExactBidsAmount();
  }

  sayValidationError() {
    this.notify.error(
      "What happen?",
      "Fuel a mix of at least 3 coins.  Min 5%, max 90% in each. Fill up your tank to 100%"
    );
  }

  play() {
    const obj = document.createElement("audio");
    obj.src = "./assets/base/images/start1.wav";
    obj.volume = 0.3;
    obj.play();
  }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    const datax: any = data;
    this.firstLogin = data.is_in_tutorial;
    this.tickets = datax.tournament_tickets;
    if (this.firstLogin === true && window.innerWidth > 1024) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
    }
  }

  getTickets() {
    const data = this.identityService.getStorageIdentity();
    const datax: any = data;
    this.tickets = datax.tournament_tickets;
  }

  skipModal() {
    this.firstLogin = false;
    this.introModal = false;
    this.introModalSecond = false;
    this.driverSrvc.driversTutorialPartialUpdate(false).subscribe((data) => {
      this.identityService.meUpdate();
    });
  }

  getFavCoins() {
    this.getFavCoinsObserver = this.driverSrvc
      .driversFavCoinsList()
      .subscribe((data) => {
        const retype: any = data;
        this.myFavCoins = retype;
        this.resortFavCoins();
      });
  }

  fuelBest() {
    this.mostFueledObserver = this.raceApi.premiumFuel().subscribe((data) => {
      this.mostFueled = data;
      this.myBetInput = data;
    });
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    if (data.is_paid_membership === "Premium") {
      this.isPremium = true;
    }
    this.myTeam = data.team;
  }

  getActualFavCoins() {
    const data: Array<string> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let xx = 0; xx < this.myBet.length; xx++) {
      if (
        this.selectedCarsToRace[this.selectedCarIndex].bet[xx].favourite ===
        true
      ) {
        data.push(this.myBet[xx].symbol);
      }
    }

    return data;
  }

  updateFavCoins() {
    const freshFavs = this.getActualFavCoins();
    this.updateFavCoinsObserver = this.driverSrvc
      .driversFavCoinsUpdate({ symbols: freshFavs })
      .subscribe((data) => {
        this.getFavCoins();
      });
  }

  resortFavCoins() {
    this.setOrder("symbol");
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.myFavCoins.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let xx = 0; xx < this.myBet.length; xx++) {
        if (this.myFavCoins[i] === this.myBet[xx].symbol) {
          this.myBet[xx].favourite = true;
        }
      }
    }

    this.setOrder("favourite");
  }

  setOrder(value: string) {
    this.order = value;
  }

  fuelMost() {
    this.myBetInput = this.mostFueled.most_fueled_coins;
    this.resetSelected();
  }

  resetSelected() {
    this.selectedCarsToRace[this.selectedCarIndex].selectedBets = [];
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 0;
    for (
      let x = 0;
      x < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
      x++
    ) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].selected = false;
    }
  }

  changeSelected() {
    if (
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3
    ) {
      for (let x = 0; x < this.myBetInput.length; x++) {
        for (
          let y = 0;
          y < this.selectedCarsToRace[this.selectedCarIndex].bet.length;
          y++
        ) {
          if (
            this.selectedCarsToRace[this.selectedCarIndex].bet[y].symbol ===
            this.myBetInput[x].symbol
          ) {
            this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(y);
            this.selectedCarsToRace[this.selectedCarIndex].bet[y].selected =
              true;
          }
        }
      }
    }
  }

  scrollToView(id: string) {
    if (
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length ===
        3 ||
      id === "selectCoinsScroll"
    ) {
      if (window.innerWidth < 641) {
        let el = document.getElementById(id);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectDefaultCoin(customIndex: number) {
    this.trsDate = Date.now();

    if (this.trsDate - this.trDate > 1000) {
      this.selectedSymbol = null;
      setTimeout(() => {
        this.selectedSymbol =
          this.selectedCarsToRace[this.selectedCarIndex].bet[
            customIndex
          ].symbol;
        this.trDate = Date.now();
      }, 1000);
    }
  }

  toggleCoin(customIndex: number) {
    const cIndex = customIndex;
    //this.selectedSymbol = null;
    this.trsDate = Date.now();
    this.animatedCurrIndex = 100;

    const isSituated = this.selectedCarsToRace[
      this.selectedCarIndex
    ].selectedBets.find((i) => i === cIndex);
    if (!isSituated && isSituated !== 0) {
      if (this.trsDate - this.trDate > 1000) {
        this.selectedSymbol = null;
        setTimeout(() => {
          this.selectedSymbol =
            this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].symbol;
          this.trDate = Date.now();
        }, 1000);
      }
      if (
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3
      ) {
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(
          cIndex
        );
        this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].selected =
          true;
      }
    } else {
      if (this.selectedCarsToRace.length > 0) {
        this.selectedSymbol =
          this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].symbol;
      } else {
        this.selectedSymbol = null;
      }

      this.selectedCarsToRace[this.selectedCarIndex].selectedBets =
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.filter(
          (j) => j !== cIndex
        );
      this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].selected =
        false;
      this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].bet = 0;
    }
    this.animateFuelSlider();
    this.useManualFuel();
  }

  calcSumFuel() {
    this.sumFuel = 0;
    this.sumlength = this.selectedCarsToRace.length;
    for (let x = 0; x < this.sumlength; x++) {
      this.sumFuel += this.selectedCarsToRace[x].fuel;
    }
  }

  getfirstraces() {
    this.timerReady = false;
    if (window.innerWidth > 870) {
      this.bottomCarsBalancer = 4;
      this.bottomPercentBalancer = 25;
    } else if (window.innerWidth <= 870 && window.innerWidth > 500) {
      this.bottomCarsBalancer = 2;
      this.bottomPercentBalancer = 50;
    } else if (window.innerWidth <= 500) {
      this.bottomCarsBalancer = 1;
      this.bottomPercentBalancer = 100;
    }
    this.racesObservable = this.racetwoapi
      .racesV2DetailList(this.raceId)
      .subscribe((data) => {
        const tempArray = [];
        tempArray.push(data);
        this.newCars = tempArray;
        this.getRaceDetails();

        this.timerReady = true;
      });
  }

  updateMultibetRaceHashes() {
    const source = this.myMultiBetAmounts;
    for (let x = 0; x < source.length; x++) {
      if (source[x].trxv === 1) {
        source[x].race_hash = this.canJoin1[0].race_hash;
      }
      if (source[x].trxv === 5) {
        source[x].race_hash = this.canJoin2[0].race_hash;
      }
      if (source[x].trxv === 10) {
        source[x].race_hash = this.canJoin3[0].race_hash;
      }
      if (source[x].trxv === 50) {
        source[x].race_hash = this.canJoin4[0].race_hash;
      }
      if (source[x].trxv === 100) {
        source[x].race_hash = this.canJoin5[0].race_hash;
      }

      return source;
    }
  }

  changeGameType() {
    if (this.useUnity) {
      localStorage.setItem("useUnity", JSON.stringify(this.useUnity));
    } else {
      localStorage.removeItem("useUnity");
    }
    this.recognizeGame();
  }

  recognizeGame() {
    const man = JSON.parse(localStorage.getItem("useUnity"));
    if (man) {
      this.useUnity = true;
    } else {
      this.useUnity = false;
    }
  }

  changeEdition(index: number) {
    this.slidePercent = 20;
    this.carSlideIndex = 0;
    const arrIndex = index - 1;

    this.displayArray = eval("this.myCars" + index);

    this.editionIndex = index;
    this.myCarsInEdition = this.myCars.filter(
      (car) =>
        (car.extras.tier > arrIndex * 6 &&
          car.extras.tier <= arrIndex * 6 + 6) ||
        car.extras.tier === 24 + index
    );
    if (index === 1) {
      this.myCarsInEdition = this.myCars.filter(
        (car) =>
          (car.extras.tier >= arrIndex * 6 &&
            car.extras.tier <= arrIndex * 6 + 6) ||
          car.extras.tier === 24 + index
      );
    }
    if (window.window.innerWidth < 640) {
      this.slidePercent = 33.333;
      this.selectedSlideIndex = 1;
      this.rareAdjustNum = 2;
      if (
        this.myCarsInEdition.length === 1 ||
        this.myCarsInEdition.length === 2
      ) {
        this.selectedSlideIndex = 0;
        this.carSlideIndex = -1;
      }
    } else {
      if (this.myCarsInEdition.length > 4) {
        this.selectedSlideIndex = 2;
      } else if (
        this.myCarsInEdition.length === 3 ||
        this.myCarsInEdition.length === 4
      ) {
        this.selectedSlideIndex = 1;
        this.carSlideIndex = -1;
      } else if (
        this.myCarsInEdition.length === 1 ||
        this.myCarsInEdition.length === 2
      ) {
        this.selectedSlideIndex = 0;
        this.carSlideIndex = -2;
      }
    }
  }

  nextSlideCar() {
    let adjustNum = 4;
    if (window.window.innerWidth < 640) {
      adjustNum = 3;
    }
    if (this.carSlideIndex <= this.displayArray.length - adjustNum) {
      this.carSlideIndex++;
      this.selectedSlideIndex++;
    }
  }
  prevSlideCar() {
    let adjustNum = 2;
    if (window.window.innerWidth < 640) {
      adjustNum = 1;
    }
    if (this.carSlideIndex > -adjustNum) {
      this.carSlideIndex--;
      this.selectedSlideIndex--;
    }
  }

  manualCarChange(index: number) {
    let adjustNum = 2;
    if (window.window.innerWidth < 640) {
      adjustNum = 1;
    }
    this.selectedSlideIndex = index;
    this.carSlideIndex = index - adjustNum;
  }

  nextTutorialStep() {
    if (this.firstLogin === true && window.innerWidth > 1024) {
      this.tutorialStep++;
    }
  }

  getMyLeaderboard() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
    this.getTips();
  }

  getTips() {
    this.eventSubscription = this.teamsServ.getTips().subscribe((data) => {
      this.tips = data;
    });
  }

  animateFuelSlider() {
    this.scrollAnimation = true;
    setTimeout(() => {
      this.scrollAnimation = false;
    }, 6000);

    if (
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length === 0
    ) {
      setTimeout(() => {
        if (
          this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length ===
          0
        ) {
          this.animatedCurrIndex = this.randomInteger(0, 19);
        }
      }, 5000);
    } else if (this.animatingSlider === false) {
      setTimeout(() => {
        if (
          this.selectedCarsToRace[this.selectedCarIndex].fuel < 16 &&
          this.animatingSlider === false
        ) {
          this.animatingSlider = true;
          this.animateValue(6);
        }
      }, 7000);
    }
  }

  animateValue(start) {
    var end = 20;
    var current = start;
    var increment = 1;
    var stepTime = 30;
    var counter = 0;

    if (!this.animationInterval) {
      this.animationInterval = setInterval(() => {
        if (current > 5 && current <= end - 1) {
          current += increment;
          this.selectedCarsToRace[this.selectedCarIndex].bet[
            this.selectedCarsToRace[this.selectedCarIndex].selectedBets[0]
          ].bet = current;
        } else if (current > end - 1) {
          current += increment;
          if (current > 2000 / stepTime) {
            increment = -1;
          }
        } else if (current < 6) {
          increment = 1;
          counter++;
          current += increment;
          this.selectedCarsToRace[this.selectedCarIndex].bet[
            this.selectedCarsToRace[this.selectedCarIndex].selectedBets[0]
          ].bet = current;
        }
        if (current < 6 && counter === 2) {
          clearInterval(this.animationInterval);
          this.animatingSlider = false;
        }
      }, stepTime);
    }
  }

  nextSelectedCar() {
    if (
      this.windowSelectCarIndex <
      this.selectedCarsToRace.length - this.bottomCarsBalancer
    ) {
      this.windowSelectCarIndex++;
    } else {
      this.windowSelectCarIndex = 0;
    }
  }

  prevSelectedCar() {
    if (this.windowSelectCarIndex > 0) {
      this.windowSelectCarIndex--;
    } else {
      this.windowSelectCarIndex =
        this.selectedCarsToRace.length - this.bottomCarsBalancer;
    }
  }

  nextFuelCar(isContinueBtn: boolean) {
    if (this.windowFuelCarIndex < this.selectedCarsToRace.length - this.bottomCarsBalancer) {
      if (isContinueBtn === false) {
        this.windowFuelCarIndex++; 
      } else if (this.selectedCarIndex + 1 >= this.bottomCarsBalancer) {
        this.windowFuelCarIndex++;
      }
    } else if (isContinueBtn === false) {
      this.windowFuelCarIndex = 0;
    }
  }

  prevFuelCar() {
    if (this.windowFuelCarIndex > 0) {
      this.windowFuelCarIndex--;
    } else {
      this.windowFuelCarIndex =
        this.selectedCarsToRace.length - this.bottomCarsBalancer;
    }
  }

  filterCarArrays(data: any) {
    this.myCars1 = data.filter(
      (j) =>
        (j.extras.tier >= 0 && j.extras.tier <= 6) ||
        j.extras.tier == 25 ||
        (j.extras.tier >= 41 && j.extras.tier !== 50)
    );
    this.myCars2 = data.filter(
      (j) => (j.extras.tier > 6 && j.extras.tier <= 12) || j.extras.tier == 26
    );
    this.myCars3 = data.filter(
      (j) => (j.extras.tier > 12 && j.extras.tier <= 18) || j.extras.tier == 27
    );
    this.myCars4 = data.filter(
      (j) => (j.extras.tier > 18 && j.extras.tier <= 24) || j.extras.tier == 28
    );
  }
}
