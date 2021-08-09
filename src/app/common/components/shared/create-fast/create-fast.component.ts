import { FavFuel } from './../../../../api/models/fav-fuel';
import { AuthService } from '../../../../user/services/auth.service';
import { Subscription } from 'rxjs';
import { NotifiqService } from '../../../services/notifiq.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CarsService, RacesService, DriversService } from '../../../../api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FavCoins, MultiCanJoinV2, NextRaceV2 } from 'src/app/api/models';

@Component({
  selector: 'app-create-fast',
  templateUrl: './create-fast.component.html',
  styleUrls: ['./create-fast.component.scss']
})
export class CreateFastFuelCarComponent implements OnInit, OnDestroy {
  myCars: any;
  @Input() myCar: number;
  dataReady = false;
  timerReady = false;
  fuel = 0;
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

  myBalance = 0;
  myDriver: any;
  actualRaceAmount: any;
  nextRaceHash: string;
  numOfBets = 0;
  windowFuelCarIndex = 0;
  bottomCarsBalancer = 4;
  bottomPercentBalancer = 25;
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
  myBetInput = [];
  myMultiBetAmounts = [];
  mostFueled: any;
  myTeam: string;
  selectStyling = {
    subHeader: 'Play more races with the same bet.',
    cssClass: 'customSelect'
  };
  multibetOptions = [];
  isSpecial = false;
  canJoin1: any;
  canJoin2: any;
  canJoin3: any;
  canJoin4: any;
  canJoin5: any;
  canJoinIoi1: any;
  canJoinIoi2: any;
  canJoinIoi3: any;
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
  isWnd = false;
  tutorialIndex: number;
  tickets: number;
  trDate: number;
  trsDate: number;
  selectedSymbol: string;
  myBet: Array<any> = [
    { symbol: 'BTCUSDT', desc: 'BTC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 0, leverage: 0 },
    { symbol: 'ETHUSDT', desc: 'ETH', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 1, leverage: 0 },
    { symbol: 'XRPUSDT', desc: 'XRP', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 2, leverage: 0 },
    { symbol: 'BCHUSDT', desc: 'BCH', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 3, leverage: 0 },
    { symbol: 'LTCUSDT', desc: 'LTC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 4, leverage: 0 },
    { symbol: 'EOSUSDT', desc: 'EOS', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 5, leverage: 0 },
    { symbol: 'BNBUSDT', desc: 'BNB', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 6, leverage: 0 },
    { symbol: 'XMRUSDT', desc: 'XMR', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 7, leverage: 0 },
    { symbol: 'ADAUSDT', desc: 'ADA', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 8, leverage: 0 },
    { symbol: 'TRXUSDT', desc: 'TRX', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 9, leverage: 0 },
    { symbol: 'BATUSDT', desc: 'BAT', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 10, leverage: 0 },
    { symbol: 'XLMUSDT', desc: 'XLM', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 11, leverage: 0 },
    { symbol: 'XTZUSDT', desc: 'XTZ', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 12, leverage: 0 },
    { symbol: 'ENJUSDT', desc: 'ENJ', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 13, leverage: 0 },
    { symbol: 'MATICUSDT', desc: 'MATIC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 14, leverage: 0 },
    { symbol: 'LINKUSDT', desc: 'LINK', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 15, leverage: 0 },
    { symbol: 'WAVESUSDT', desc: 'WAVES', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 16, leverage: 0 },
    { symbol: 'ZILUSDT', desc: 'ZIL', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 17, leverage: 0 },
    { symbol: 'VETUSDT', desc: 'VET', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 18, leverage: 0 },
    { symbol: 'USDTUSDT', desc: 'USDT', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 19, leverage: 0 }
  ];
  selectedBets: Array<number> = [];
  order = 'favourite';
  reverse = true;
  editionStylePx = 0;
  editionAvailableSlides: number;
  currAvailableSlides: number;
  editionSlideIndex = 0;
  currSlideIndex = 0;
  selectedCarIndex = 0;
  stepIndex = 2;
  favFilter = false;
  useTicket = false;
  coinFilterType = 'most';
  selectedCarsToRace = [];
  sumFuel: number;
  sumlength: number;
  isIoi: boolean;
  currency = 'TRX';
  ioiBalance: number;
  summaryCarIndex = 0;
  isLoading = false;
  hideConfirm = true;
  summaryTrxAmount = 0;
  summaryIoiAmount = 0;
  newEditionIndex = 0;
  myDriverStats: any;
  myAffilate: any;
  favCars: any;
  closedpanel = false;
  constructor(private router: Router, protected api: CarsService,
    protected raceApi: RacesService, protected route: ActivatedRoute,
    protected notify: NotifiqService,
    protected driverSrvc: DriversService,
    private identityService: AuthService) {


  }

  ngOnInit(): void {
    this.trDate = Date.now();
    this.trsDate = Date.now();
    this.selectDefaultCoin(0);
    this.getFavCars();
    this.getRaceDetails();
    this.getMyDriverStats();
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
  }



  validateBets() {
    let num = 0;
    let hm = 0;
    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      num += this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet;
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet >= 5) { hm++; }
    }
    this.fuel = Math.round(num);
    this.numOfBets = hm;

    if (this.useTicket === true) {
      this.trxneeded = 0;
    }

    if (this.fuel === 100 && hm > 2 && hm < 21 && this.myBalance >= this.trxneeded) {
      return true;
    } else {
      this.notify.error('Error', this.validerr);
      return false;
    }




  }

  signupToRace() {

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
              leverage: fakeSelected[i].bet[ix].leverage
            });
          } else {
            fakeSelected[i].newBet.push({
              symbol: fakeSelected[i].bet[ix].symbol,
              bet:
                fakeSelected[i].bet[ix].short === false
                  ? fakeSelected[i].bet[ix].bet
                    : fakeSelected[i].bet[ix].bet * -1
            });
          }
        }
      }
    }
    for (let i = 0; i < fakeSelected.length; i++) {

      serialized.push({
        car: this.myCar,
        bet_coins: fakeSelected[i].newBet,
      });

    }

    this.favCars.push(serialized[0]);

    this.driverSrvc.driversFavFuelUpdate(this.favCars).subscribe(data => {});

    this.router.navigate(['/race/all-races']);

  }


  increaseBet(index) {
    if (this.fuel < 100 && this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet < 100) {
      const x = this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet + 0.1;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = +(x.toFixed(2));
    }
    this.calculateExactBidsAmount();
  }

  decreaseBet(index) {
    if (this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet > 0) {
      const x = this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet - 0.1;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = +(x.toFixed(2));
    }
    this.calculateExactBidsAmount();
  }

  calculateExactBidsAmount() {
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 0;
    let num = 0;
    let hm = 0;
    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      num += this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet;
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet >= 5) { hm++; }
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
        if (this.selectedCarsToRace[xx].bet[x].bet >= 5) { hm++; }
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
    this.api.carsMineList().subscribe(retype => {
      const data: any = retype;
      this.myCars = data.cars.filter(item => {
        return item.pk === this.myCar;
      });
      if (this.myCars.length === 0) {
        this.notify.error('Error', 'You have no available cars to set up fast fuel');
        setTimeout(() => { this.router.navigate(['/car/nft-market']); }, 1000);
      }
      this.selectCarToRace(0);
      const statBet = [];
      const selBets = [];
      for (let x = 0; x < this.myBet.length; x++) {
        const fake: any = {};
        fake.bet = this.myBet[x].bet;
        fake.symbol = this.myBet[x].symbol;
        fake.favourite = this.myBet[x].favourite;
        fake.customIndex = this.myBet[x].customIndex;
        fake.short = this.myBet[x].short;
        statBet.push(fake);
      }

      for (let y = 0; y < this.myCars.length; y++) {
        this.myCars[y].selected = false;
        this.myCars[y].bet = statBet;
        this.myCars[y].fuel = 0;
        this.myCars[y].selectedBets = selBets;
        this.myCars[y].short = false;
      }
    });
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

  generateAutomaticBets() {
    for (let xx = 0; xx < this.selectedCarsToRace.length; xx++) {

      const nums: Array<any> = this.generateRandomNums(100, 3, 5);

      this.selectedCarsToRace[xx].selectedBets = [];
      this.activeFuelType = 0;

      for (let x = 0; x < this.selectedCarsToRace[xx].bet.length; x++) {
        this.selectedCarsToRace[xx].bet[x].bet = 0;
        this.selectedCarsToRace[xx].bet[x].selected = false;
      }

      while (this.selectedCarsToRace[xx].selectedBets.length < 3) {
        const arr = [];
        const r = Math.floor(Math.random() * 19) + 1;
        if (arr.indexOf(r) === -1) { this.selectedCarsToRace[xx].selectedBets.push(r); }
      }
      for (let x = 0; x < 3; x++) {

        this.selectedCarsToRace[xx].bet[this.selectedCarsToRace[xx].selectedBets[x]].selected = true;
        this.selectedCarsToRace[xx].bet[this.selectedCarsToRace[xx].selectedBets[x]].bet = +(nums[x].toFixed(1));
      }
      this.calculateExactBidsAmountForAll();
      if (this.selectedCarsToRace[xx].fuel < 100 || this.selectedCarsToRace[xx].selectedBets.length < 3) {
        this.generateAutomaticBets();
      }
    }
  }
  generateAutomaticBetsOnce() {

    const nums: Array<any> = this.generateRandomFuelArray();

    this.selectedCarsToRace[this.selectedCarIndex].selectedBets = [];
    this.activeFuelType = 0;

    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].selected = false;
    }

    while (this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3) {
      const arr = [];
      const r = Math.floor(Math.random() * 19) + 1;
      if (arr.indexOf(r) === -1) { this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(r); }
    }
    for (let x = 0; x < 3; x++) {

      this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].selected = true;
      this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = +(nums[x].toFixed(0));
    }
    this.calculateExactBidsAmount();
    if (this.selectedCarsToRace[this.selectedCarIndex].fuel < 100 || this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3 || this.selectedCarsToRace[this.selectedCarIndex].fuel > 100) {
      this.generateAutomaticBetsOnce();
    }

  }
  generateTopAutomaticBets() {
    this.activeFuelType = 1;
    const nums: Array<any> = this.generateRandomNums(100, 3, 5);

    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
    }


    for (let x = 0; x < this.myBetInput.length; x++) {
      for (let i = 0; i < this.selectedCarsToRace[this.selectedCarIndex].bet.length; i++) {
        if (this.selectedCarsToRace[this.selectedCarIndex].bet[i].symbol === this.myBetInput[x].symbol) {
          this.selectedCarsToRace[this.selectedCarIndex].bet[i].bet = +(nums[x].toFixed(1));
        }
      }
    }

    this.calculateExactBidsAmount();
    this.selectedCarToRace.fuel = 100;
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 100;
  }


  useManualFuel() {
    this.activeFuelType = 1;
    for (let x = 0; x < 3; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = 5;
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





  selectCarToRace(index) {

    //this.selectedCarToRace = this.myCars[index];
    this.hideConfirm = false;
    const statBet = [];
    const selBets = [];
    let isSituated;

    isSituated = this.selectedCarsToRace.find(i => i.car_id === this.myCars[index].car_id);

    if (!isSituated) {


      for (let x = 0; x < this.myBet.length; x++) {
        const fake: any = {};
        fake.bet = this.myBet[x].bet;
        fake.symbol = this.myBet[x].symbol;
        fake.favourite = this.myBet[x].favourite;
        fake.customIndex = this.myBet[x].customIndex;
        statBet.push(fake);
      }
      this.myCars[index].selected = true;
      this.myCars[index].bet = statBet;
      this.myCars[index].fuel = 0;
      this.myCars[index].selectedBets = selBets;

      this.selectedCarsToRace.push(this.myCars[index]);

      this.usedCars.push({
        car_id: this.myCars[index].car_id,
        amount: this.actualRaceAmount
      });
      this.myCars[index].selected = true;
    } else {
      this.selectedCarsToRace = this.selectedCarsToRace.filter(j => j.car_id !== this.myCars[index].car_id);
      this.usedCars = this.usedCars.filter(j => j.car_id !== this.myCars[index].car_id);
      this.myCars[index].selected = false;
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
    const oldVal = this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet;
    const newVal = parseInt(event.target.value, 10);
    this.calculateExactBidsAmount();
    if (this.selectedCarsToRace[this.selectedCarIndex].fuel > 100) {

      const diff = Math.abs(100 - this.selectedCarsToRace[this.selectedCarIndex].fuel);

      const newdiff = this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet - diff;
      this.selectedCarsToRace[this.selectedCarIndex].bet[index].bet = newdiff;
      this.calculateExactBidsAmount();
      this.sayValidationError();

    }
    if (this.selectedCarsToRace[this.selectedCarIndex].fuel > 95 && this.numOfBets < 3) {
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
    this.notify.error('What happen?', 'Fuel a mix of at least 3 coins.  Min 5%, max 90% in each. Fill up your tank to 100%');
  }


  play() {
    const obj = document.createElement('audio');
    obj.src = './assets/base/images/start1.wav';
    obj.volume = 0.3;
    obj.play();
  }


  getFavCoins() {
    this.getFavCoinsObserver = this.driverSrvc.driversFavCoinsList().subscribe(data => {
      const retype: any = data;
      this.myFavCoins = retype;
      this.resortFavCoins();
    });
  }

  fuelBest() {
   /* const datax = this.identityService.getDriverMe();
    const x: any = datax;
    if (x.is_paid_membership === true) {

      this.notify.error('', 'Loading premium coins, please wait', 2000);
      this.mostFueledObserver = this.raceApi.racesHintsList().subscribe(data => {
        this.mostFueled = data;
        this.coinFilterType = 'best';
        this.myBetInput = this.mostFueled.best_performing_coins;
        this.resetSelected();
        this.changeSelected();
        this.useManualFuel();
      });
    } else {
      this.notify.error('', 'You must be payed team member.', 2000);
    }
*/
  }



  getActualFavCoins() {
    const data: Array<string> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let xx = 0; xx < this.myBet.length; xx++) {
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[xx].favourite === true) {
        data.push(this.myBet[xx].symbol);
      }
    }

    return data;
  }

  updateFavCoins() {
    const freshFavs = this.getActualFavCoins();
    this.updateFavCoinsObserver = this.driverSrvc.driversFavCoinsUpdate(
      { symbols: freshFavs }
    ).subscribe(data => {
      this.getFavCoins();
    });
  }

  resortFavCoins() {
    this.setOrder('symbol');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.myFavCoins.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let xx = 0; xx < this.myBet.length; xx++) {
        if (this.myFavCoins[i] === this.myBet[xx].symbol) {
          this.myBet[xx].favourite = true;
        }
      }
    }

    this.setOrder('favourite');
  }

  setOrder(value: string) {
    this.order = value;
  }

  fuelMost() {
    this.coinFilterType = 'most';
    this.myBetInput = this.mostFueled.most_fueled_coins;
    this.resetSelected();
  }



  resetSelected() {
    this.selectedCarsToRace[this.selectedCarIndex].selectedBets = [];
    this.selectedCarsToRace[this.selectedCarIndex].fuel = 0;
    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].selected = false;
    }
  }

  changeSelected() {

    if (this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3) {
      for (let x = 0; x < this.myBetInput.length; x++) {
        for (let y = 0; y < this.selectedCarsToRace[this.selectedCarIndex].bet.length; y++) {
          if (this.selectedCarsToRace[this.selectedCarIndex].bet[y].symbol === this.myBetInput[x].symbol) {
            this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(y);
            this.selectedCarsToRace[this.selectedCarIndex].bet[y].selected = true;
          }
        }
      }
    }
  }

  scrollToView(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  toggleCoin(customIndex: number) {
    const cIndex = customIndex;
    //this.selectedSymbol = null;
    this.trsDate = Date.now();
    const isSituated = this.selectedCarsToRace[this.selectedCarIndex].selectedBets.find(i => i === cIndex);
    if (!isSituated && isSituated !== 0) {
      if (this.trsDate - this.trDate > 1000) {
        this.selectedSymbol = null;
        setTimeout(() => {


          this.selectedSymbol = this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].symbol;
          this.trDate = Date.now();
        }, 1000);
      }
      if (this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length < 3) {
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.push(cIndex);
        this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].selected = true;
      }
    } else {

      if (this.selectedCarsToRace.length > 0) {
        this.selectedSymbol = this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].symbol;
      } else {
        this.selectedSymbol = null;
      }

      this.selectedCarsToRace[this.selectedCarIndex].selectedBets =
        this.selectedCarsToRace[this.selectedCarIndex].selectedBets.filter(j => j !== cIndex);
      this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].selected = false;
      this.selectedCarsToRace[this.selectedCarIndex].bet[cIndex].bet = 0;
    }

    this.useManualFuel();
  }

  calcSumFuel() {
    this.sumFuel = 0;
    this.sumlength = this.selectedCarsToRace.length;
    for (let x = 0; x < this.sumlength; x++) {
      this.sumFuel += this.selectedCarsToRace[x].fuel;
    }
  }

  getFavCars() {
    this.driverSrvc.driversFavFuelList().subscribe(data => {
      this.favCars = data;
    });
  }

  reload() {
    window.location.reload();
  }

  selectDefaultCoin(customIndex: number){
    this.trsDate = Date.now();
    this.selectedSymbol = this.myBet[customIndex].symbol;
    this.trDate = Date.now();
  }

  nextFuelCar(){
    if (this.windowFuelCarIndex < this.selectedCarsToRace.length - this.bottomCarsBalancer) {
      this.windowFuelCarIndex++;
    } else {
      this.windowFuelCarIndex = 0;
    }
  }

  prevFuelCar(){
    if (this.windowFuelCarIndex > 0) {
      this.windowFuelCarIndex--;
    } else {
      this.windowFuelCarIndex = this.selectedCarsToRace.length - this.bottomCarsBalancer;
    }
  }

  getMyDriverStats() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }

}


