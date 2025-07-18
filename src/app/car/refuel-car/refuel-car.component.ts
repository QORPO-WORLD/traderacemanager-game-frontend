import { AuthService } from "./../../user/services/auth.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../common/services/notifiq.service";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { CarsService, RacesService, DriversService } from "../../api/services";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";
import { TickerPricesService } from "../../api/services/ticker-prices.service";
import { FavCoins, MultiCanJoinV2, NextRaceV2 } from "src/app/api/models";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-refuel-car",
  templateUrl: "./refuel-car.component.html",
  styleUrls: ["./refuel-car.component.scss"],
})
export class RefuelCarComponent implements OnInit, OnDestroy {
  myCars: any;
  myCarsInEdition: any;
  myCar: any;
  dataReady = false;
  timerReady = false;
  fuel = 0;
  //raceId: number;
  pricePool: number;
  raceData: NextRaceV2[];
  raceStarts: any;
  activeFuelType: number;
  activeFuel = true;
  actualCarIndex = 0;
  bestIndex = 0;
  availableCars = [];
  selectedCarToRace: any;
  pageOpen = true;
  numOfPlayers: number;
  trDate: number;
  trsDate: number;
  myCarsInGame = [];
  walleteOpen = true;
  ticker: any;
  tickerObservable: Subscription;
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

  myBalance = 0;
  interval: any;
  myDriver: any;
  actualRaceAmount: any;
  nextRaceHash: string;
  numOfBets = 0;
  trxneeded: number;
  validerr: string;
  selectedSymbol: string;
  showPulse = true;
  carsCanJoin: MultiCanJoinV2;
  introModal = false;
  firstLogin = false;
  introModalSecond = false;
  firstTicker: any;
  favCoins: FavCoins;
  myFavCoins = [];
  sortingStarted = false;
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
  @Input() raceId: string;
  @Input() tourcars: any;
  @Input() raceHashik: string;
  @Input() raceStartsIn: number;
  @Input() currentData: any;
  myFuels = [0];
  tourClose = false;
  myBet: Array<any> = [
    {
      symbol: "BTCUSDT",
      desc: "BTC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 0,
      leverage: 0,
    },
    {
      symbol: "ETHUSDT",
      desc: "ETH",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 1,
      leverage: 0,
    },
    {
      symbol: "XRPUSDT",
      desc: "XRP",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 2,
      leverage: 0,
    },
    {
      symbol: "BCHUSDT",
      desc: "BCH",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 3,
      leverage: 0,
    },
    {
      symbol: "LTCUSDT",
      desc: "LTC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 4,
      leverage: 0,
    },
    {
      symbol: "EOSUSDT",
      desc: "EOS",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 5,
      leverage: 0,
    },
    {
      symbol: "BNBUSDT",
      desc: "BNB",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 6,
      leverage: 0,
    },
    {
      symbol: "XMRUSDT",
      desc: "XMR",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 7,
      leverage: 0,
    },
    {
      symbol: "ADAUSDT",
      desc: "ADA",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 8,
      leverage: 0,
    },
    {
      symbol: "TRXUSDT",
      desc: "TRX",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 9,
      leverage: 0,
    },
    {
      symbol: "BATUSDT",
      desc: "BAT",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 10,
      leverage: 0,
    },
    {
      symbol: "XLMUSDT",
      desc: "XLM",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 11,
      leverage: 0,
    },
    {
      symbol: "XTZUSDT",
      desc: "XTZ",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 12,
      leverage: 0,
    },
    {
      symbol: "ENJUSDT",
      desc: "ENJ",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 13,
      leverage: 0,
    },
    {
      symbol: "MATICUSDT",
      desc: "MATIC",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 14,
      leverage: 0,
    },
    {
      symbol: "LINKUSDT",
      desc: "LINK",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 15,
      leverage: 0,
    },
    {
      symbol: "WAVESUSDT",
      desc: "WAVES",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 16,
      leverage: 0,
    },
    {
      symbol: "ZILUSDT",
      desc: "ZIL",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 17,
      leverage: 0,
    },
    {
      symbol: "VETUSDT",
      desc: "VET",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 18,
      leverage: 0,
    },
    {
      symbol: "USDTUSDT",
      desc: "USDT",
      bet: 0.0,
      selected: false,
      favourite: false,
      short: false,
      customIndex: 19,
      leverage: 0,
    },
  ];
  selectedBets: Array<number> = [];
  selectedCarsToRace = [];
  order = "favourite";
  currency = "TRX";
  reverse = true;
  isLoading = false;
  editionStylePx = 0;
  currStylePx = 0;
  slidePercent = 20;
  editionAvailableSlides: number;
  currAvailableSlides: number;
  editionSlideIndex = 0;
  currSlideIndex = 0;
  selectedCarIndex: number;
  stepIndex = 2;
  carSlideIndex = 0;
  selectedSlideIndex = 0;
  favFilter = false;
  coinFilterType = "most";
  selectedChart = "chart";
  sumFuel: number;
  sumlength: number;
  calced = false;
  myDriverStats: any;

  constructor(
    private router: Router,
    protected api: CarsService,
    protected raceApi: RacesService,
    protected route: ActivatedRoute,
    protected notify: NotifiqService,
    protected tickerService: TickerPricesService,
    protected driverSrvc: DriversService,
    protected translate: TranslateService,
    private identityService: AuthService
  ) {
    if (
      this.raceId === "car_race_ioi_1" ||
      this.raceId === "car_race_ioi_3" ||
      this.raceId === "car_race_ioi_5"
    ) {
      this.currency = "IOI";
    }
  }

  ngOnInit(): void {
    this.trDate = Date.now();
    this.trsDate = Date.now();

    this.getAllV2Races();
    this.getMyBalance();

    this.getFavCoins();

    this.getMostPopular();

    this.getMyTeam();
  }

  ngOnDestroy() {
    this.pageOpen = false;
    if (this.tickerObservable) {
      this.tickerObservable.unsubscribe();
    }
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
    clearInterval(this.interval);
    if (this.myCars) {
      this.myCars.length = 0;
    }
    if (this.myCarsInGame) {
      this.myCarsInGame.length = 0;
    }
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data.game_wallet_trx;
    this.myDriverStats = this.identityService.getStorageIdentity();
  }

  getMyCars() {
    const objs: any = this.tourcars;
    const haha = objs.sort((a, b) => b.car_id - a.car_id);
    haha.reverse();
    /*
    for (let x = 0; x < haha.length; x++) {
      for (let y = 0; y < 3; y++) {
        if (haha[x].b[y].bet < 0) {
          haha[x].b[y].short = true;
        }
        if (haha[x].b[y].bet > 0) {
          haha[x].b[y].short = false;
        }
        if (haha[x].b[y].bet < 0) {
          haha[x].b[y].bet = Math.abs(haha[x].b[y].bet);     
        }
      }
    }
    */
    this.myCars = haha;
    this.selectedCarsToRace.push(...this.myCars);

    this.selectCar(this.myCars);
    this.setupCarousel();
  }

  selectCar(data) {
    this.selectCarToRace(0);

    this.dataReady = true;
  }

  serializeSignuprequest() {
    const obj = {
      race_hash: this.nextRaceHash,
      car: this.selectedCarToRace.cid,
      bet_coins: this.myBet,
    };

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

    if (this.fuel === 100 && hm > 2 && hm < 21) {
      return true;
    } else {
      this.notify.error("Error", this.validerr);
      return false;
    }
  }

  signupToRace() {
    const valid = this.validateBets();
    if (this.validateBets() === false) {
      return;
    } else {
      this.isLoading = true;
      const serialized = [];
      const fakeSelected: any = this.selectedCarsToRace;
      for (let i = 0; i < fakeSelected.length; i++) {
        fakeSelected[i].newBet = [];
        for (let ix = 0; ix < fakeSelected[i].bet.length; ix++) {
          if (fakeSelected[i].bet[ix].bet > 0) {
            if (fakeSelected[i].bet[ix].leverage > 0) {
              fakeSelected[i].newBet.push({
                symbol: fakeSelected[i].bet[ix].symbol,
                bet:
                  fakeSelected[i].bet[ix].short === false
                    ? fakeSelected[i].bet[ix].bet
                    : fakeSelected[i].bet[ix].bet * -1,
                leverage: fakeSelected[i].bet[ix].leverage,
              });
            } else {
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
        serialized.push({
          race_hash: this.raceHashik,
          car: fakeSelected[i].cid,
          bet_coins: fakeSelected[i].newBet,
        });
      }

      this.raceApi.racesMultiSignupCreate(serialized).subscribe((data) => {
        this.redirectToRace();
      });
    }
  }

  redirectToRace() {
    this.tourClose = true;
    this.router.navigate(["/race/watch-race-3min/" + this.raceHashik]);
  }

  increaseBet(index) {
    if (
      this.tourcars[this.actualCarIndex].fuel < 100 &&
      this.tourcars[this.actualCarIndex].bet[index].bet < 100
    ) {
      const x = this.tourcars[this.actualCarIndex].bet[index].bet + 0.1;
      this.tourcars[this.actualCarIndex].bet[index].bet = +x.toFixed(2);
    }
    this.calculateExactBidsAmount();
  }

  decreaseBet(index) {
    if (this.tourcars[this.actualCarIndex].bet[index].bet > 0) {
      const x = this.tourcars[this.actualCarIndex].bet[index].bet - 0.1;
      this.tourcars[this.actualCarIndex].bet[index].bet = +x.toFixed(2);
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
      num += Math.abs(
        this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet
      );
      if (
        Math.abs(this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet) >= 5
      ) {
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

  calcSumFuel() {
    this.sumFuel = 0;
    this.sumlength = this.selectedCarsToRace.length;
    for (let x = 0; x < this.sumlength; x++) {
      this.sumFuel += this.selectedCarsToRace[x].fuel;
    }
  }

  getRaceDetails() {
    const mainlength = this.tourcars.length;

    this.currAvailableSlides = this.myBet.length / 3 - 5;
    this.editionAvailableSlides = this.myCars.length / 2 - 3;

    this.raceStarts = this.raceStartsIn;
    this.nextRaceHash = this.raceHashik;

    this.actualRaceAmount = "1 IOI";
    this.isSpecial = true;
    /*
    for (let x = 0; x < this.myCars.length; x++) {
      this.myCars[x].b.splice(3, 17);
      this.myCars[x].bet.splice(3, 17);
    }
*/

    this.setupCarousel();

    for (let y = 0; y < mainlength; y++) {
      const commonArray = [];
      for (let i = 0; i < 3; i++) {
        commonArray.push(this.myCars[y].b[i].symbol);
      }

      const pekac = this.myBet.filter((item) => {
        return (
          item.symbol !== commonArray[0] &&
          item.symbol !== commonArray[1] &&
          item.symbol !== commonArray[2]
        );
      });

      const janko = this.myCars[y].b.concat(pekac);
      this.myCars[y].b.length = 0;
      this.myCars[y].b = janko;
    }

    for (let y = 0; y < mainlength; y++) {
      let counter = 0;
      const statBet = [];
      const selBets = [];
      for (let i = 0; i < 20; i++) {
        //for (let x = 0; x < 20; x++) {

        const fake: any = {};

        fake.bet = this.myCars[y].b[i].bet;
        fake.symbol = this.myCars[y].b[i].symbol;
        fake.customIndex = this.myBet[i].customIndex;
        fake.selected = false;
        fake.short = this.myCars[y].b[i].bet < 0 ? true : false;
        fake.leverage = this.myBet[i].leverage;

        if (
          this.myCars[y].b[i].symbol === "BTCUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(0);
        }
        if (
          this.myCars[y].b[i].symbol === "ETHUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(1);
        }
        if (
          this.myCars[y].b[i].symbol === "XRPUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(2);
        }
        if (
          this.myCars[y].b[i].symbol === "BCHUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(3);
        }
        if (
          this.myCars[y].b[i].symbol === "LTCUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(4);
        }
        if (
          this.myCars[y].b[i].symbol === "EOSUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(5);
        }
        if (
          this.myCars[y].b[i].symbol === "BNBUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(6);
        }
        if (
          this.myCars[y].b[i].symbol === "XMRUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(7);
        }
        if (
          this.myCars[y].b[i].symbol === "ADAUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(8);
        }
        if (
          this.myCars[y].b[i].symbol === "TRXUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(9);
        }
        if (
          this.myCars[y].b[i].symbol === "BATUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(10);
        }
        if (
          this.myCars[y].b[i].symbol === "XLMUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(11);
        }
        if (
          this.myCars[y].b[i].symbol === "XTZUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(12);
        }
        if (
          this.myCars[y].b[i].symbol === "ENJUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(13);
        }
        if (
          this.myCars[y].b[i].symbol === "MATICUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(14);
        }
        if (
          this.myCars[y].b[i].symbol === "LINKUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(15);
        }
        if (
          this.myCars[y].b[i].symbol === "WAVESUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(16);
        }
        if (
          this.myCars[y].b[i].symbol === "ZILUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(17);
        }
        if (
          this.myCars[y].b[i].symbol === "VETUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(18);
        }
        if (
          this.myCars[y].b[i].symbol === "USDTUSDT" &&
          this.myCars[y].b[i].bet !== 0
        ) {
          selBets.push(19);
        }

        if (this.myCars[y].l != null) {
          let leverages = Object.keys(this.myCars[y].l);
          for (let l = 0; l < leverages.length; l++) {
            if (leverages[l] === this.myCars[y].b[i].symbol) {
              fake.leverage = 2;
            }
          }
        }

        statBet.push(fake);
      }

      //this.myCars[y].short = false;
      this.myCars[y].fuel = 100;

      this.myCars[y].selected = false;

      this.myCars[y].bet = statBet;

      this.myCars[y].selectedBets = selBets;
    }
  }

  getAllV2Races() {
    // console.log(this.tourcars);
    // console.log('vnutro');
    this.getMyCars();
    this.timerReady = false;

    this.getRaceDetails();

    this.calcSumFuel();

    this.setInitFuels();
  }

  timerCompleted() {
    this.timerReady = false;
    setTimeout(() => {
      this.getAllV2Races();
    }, 2000);
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

  generateRandomFuelArray() {
    let highBetIndex = this.randomInteger(0, 2);
    let myArray = [5, 5, 5];
    myArray[highBetIndex] = 90;

    return myArray;
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  prepareToSIgn() {
    if (this.validateBets() === false) {
      return;
    } else {
      // open modal
    }
  }

  nextCurr() {
    if (this.currSlideIndex < this.currAvailableSlides) {
      this.currSlideIndex++;
      this.currStylePx += 178;
    }
  }
  prevCurr() {
    if (this.currSlideIndex > 0) {
      this.currSlideIndex--;
      this.currStylePx -= 178;
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

  selectCarToRace(index) {
    this.selectedCarIndex = index;
    this.actualCarIndex = index;
    this.selectedCarToRace = this.tourcars[index];
  }

  isCarInRace() {
    /*
        for (let x = 0; x < this.myCarsInGame.length; x++) {
          for (let y = 0; y < this.myCars.length; y++) {
            if (this.myCarsInGame[x] === this.myCars[y].pk) {
              this.myCars[y].canJoinRace = true;
            }
          }
    
        }
    
        */
    this.timerReady = true;
  }

  changeFuel(event: any, index: number) {
    const oldFuel = this.selectedCarsToRace[this.selectedCarIndex].fuel;
    const noBoy = 100.01 - oldFuel;
    const oldVal =
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet;
    const newVal = parseInt(event.target.value, 10);
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
    this.translate.get("nitro_notifiq").subscribe((res) => {
      this.notify.error(res.what_happend, res.fuel_correct);
    });
  }

  play() {}

  skipModal() {
    this.introModal = false;
    this.introModalSecond = false;
    this.driverSrvc.driversTutorialPartialUpdate(false).subscribe((data) => {
      this.identityService.meUpdate();
    });
  }

  tutorialLastStep() {
    if (this.introModalSecond === true || this.introModal === true) {
      this.introModalSecond = true;
      this.introModal = true;
    }
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
  getMostPopular() {
    /*
    this.mostFueledObserver = this.raceApi.racesHintsList().subscribe(data => {
      this.mostFueled = data;
    });
    */
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeam = data.team;
  }

  getActualFavCoins() {
    const data: Array<string> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let xx = 0; xx < this.myBet.length; xx++) {
      if (this.myBet[xx].favourite === true) {
        data.push(this.myBet[xx].symbol);
      }
    }

    return data;
  }

  resortFavCoins() {
    this.setOrder("symbol");
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.myFavCoins.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let xx = 0; xx < this.selectedCarToRace.bet.length; xx++) {
        if (this.myFavCoins[i] === this.selectedCarToRace.bet[xx].symbol) {
          this.selectedCarToRace.bet[xx].favourite = true;
        }
      }
    }

    this.setOrder("favourite");
  }

  setOrder(value: string) {
    this.order = value;
  }

  fuelMost() {
    this.coinFilterType = "most";
    this.myBetInput = this.mostFueled.most_fueled_coins;
    this.resetSelected();
  }

  fuelBest() {
    this.getMostPopular();
    this.coinFilterType = "best";
    this.myBetInput = this.mostFueled.best_performing_coins;
    this.resetSelected();
    this.changeSelected();
    this.useManualFuel();
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
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].short = false;
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

  generateAutomaticBets() {
    for (let xx = 0; xx < this.selectedCarsToRace.length; xx++) {
      let nums: Array<any> = this.generateRandomFuelArray();
      if (
        Math.round(nums[0]) + Math.round(nums[1]) + Math.round(nums[2]) !==
        100
      ) {
        this.generateAutomaticBets();
        return;
      }
      this.selectedCarsToRace[xx].selectedBets = [];
      this.activeFuelType = 0;

      for (let x = 0; x < this.selectedCarsToRace[xx].bet.length; x++) {
        this.selectedCarsToRace[xx].bet[x].bet = 0;
        this.selectedCarsToRace[xx].bet[x].short = false;
        this.selectedCarsToRace[xx].bet[x].selected = false;
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
        ].bet = +Math.round(nums[x]);
      }
      this.calculateExactBidsAmountForAll();
      if (
        this.selectedCarsToRace[xx].fuel < 100 ||
        this.selectedCarsToRace[xx].selectedBets.length < 3
      ) {
        this.generateAutomaticBets();
      }
    }
  }

  setInitFuels() {
    for (let xx = 0; xx < this.selectedCarsToRace.length; xx++) {
      const nums: Array<any> = [];

      nums.push(this.selectedCarsToRace[xx].batman[0].bet);
      nums.push(this.selectedCarsToRace[xx].batman[1].bet);
      nums.push(this.selectedCarsToRace[xx].batman[2].bet);

      this.selectedCarsToRace[xx].selectedBets = [];
      this.activeFuelType = 0;

      for (let x = 0; x < this.selectedCarsToRace[xx].bet.length; x++) {
        this.selectedCarsToRace[xx].bet[x].bet = 0;
        this.selectedCarsToRace[xx].bet[x].short = false;
        this.selectedCarsToRace[xx].bet[x].selected = false;
      }

      const c1 = this.selectedCarsToRace[xx].batman[0].symbol;
      const f1 = this.selectedCarsToRace[xx].bet.filter((j) => j.symbol === c1);

      const x1 = f1[0].customIndex;

      const c2 = this.selectedCarsToRace[xx].batman[1].symbol;
      const f2 = this.selectedCarsToRace[xx].bet.filter((j) => j.symbol === c2);

      const x2 = f2[0].customIndex;

      const c3 = this.selectedCarsToRace[xx].batman[2].symbol;
      const f3 = this.selectedCarsToRace[xx].bet.filter((j) => j.symbol === c3);

      const x3 = f3[0].customIndex;

      this.selectedCarsToRace[xx].selectedBets.push(x1);
      this.selectedCarsToRace[xx].selectedBets.push(x2);
      this.selectedCarsToRace[xx].selectedBets.push(x3);

      for (let x = 0; x < 3; x++) {
        this.selectedCarsToRace[xx].bet[
          this.selectedCarsToRace[xx].selectedBets[x]
        ].selected = true;
        if (nums[x] < 0) {
          this.selectedCarsToRace[xx].bet[
            this.selectedCarsToRace[xx].selectedBets[x]
          ].short = true;
          this.selectedCarsToRace[xx].bet[
            this.selectedCarsToRace[xx].selectedBets[x]
          ].bet = Math.abs(nums[x]);
        } else {
          this.selectedCarsToRace[xx].bet[
            this.selectedCarsToRace[xx].selectedBets[x]
          ].short = false;
          this.selectedCarsToRace[xx].bet[
            this.selectedCarsToRace[xx].selectedBets[x]
          ].bet = nums[x];
        }
      }
      //this.calculateExactBidsAmountForAll();
      if (
        this.selectedCarsToRace[xx].fuel !== 100 ||
        this.selectedCarsToRace[xx].selectedBets.length < 3
      ) {
        this.setInitFuels();
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

  toggleCoin(customIndex: number) {
    const cIndex = customIndex;
    //this.selectedSymbol = null;
    this.trsDate = Date.now();

    const isSituated = this.selectedCarsToRace[
      this.selectedCarIndex
    ].selectedBets.find((i) => i === cIndex);
    if (
      !isSituated &&
      isSituated !== 0 &&
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3
    ) {
      if (this.trsDate - this.trDate > 10000) {
        this.selectedSymbol = null;
        setTimeout(() => {
          this.selectedSymbol =
            this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].symbol;
          this.trDate = Date.now();
        }, 1500);
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

    this.useManualFuel();
  }

  updateFavCoins() {
    const freshFavs = this.getActualFavCoins();
    this.updateFavCoinsObserver = this.driverSrvc
      .driversFavCoinsUpdate({ symbols: freshFavs })
      .subscribe((data) => {
        this.getFavCoins();
      });
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

  scrollToView(id: string) {
    if (
      this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length === 3
    ) {
      if (window.innerWidth < 641) {
        let el = document.getElementById(id);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  setupCarousel() {
    this.slidePercent = 20;
    this.carSlideIndex = 0;
    if (window.window.innerWidth < 640) {
      this.slidePercent = 33.333;
      this.selectedSlideIndex = 1;
      if (this.myCars.length === 1 || this.myCars.length === 2) {
        this.selectedSlideIndex = 0;
        this.carSlideIndex = -1;
      }
    } else {
      if (this.myCars.length > 4) {
        this.selectedSlideIndex = 2;
      } else if (this.myCars.length === 3 || this.myCars.length === 4) {
        this.selectedSlideIndex = 1;
        this.carSlideIndex = -1;
      } else if (this.myCars.length === 1 || this.myCars.length === 2) {
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
    if (this.carSlideIndex <= this.myCars.length - adjustNum) {
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

  resolveNext() {
    if (this.selectedCarIndex + 1 < this.selectedCarsToRace.length) {
      this.selectedCarIndex = this.selectedCarIndex + 1;
    } else {
      this.signupToRace();
    }
  }
}
