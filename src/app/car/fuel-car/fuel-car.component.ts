import { BalanceService } from './../../common/services/balance.service';
import { AuthService } from './../../user/services/auth.service';
import { Subscription } from 'rxjs';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService, RacesService, DriversService, RacesV2Service } from '../../api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import {  FavCoins, MultiCanJoinV2, NextRaceV2 } from 'src/app/api/models';

@Component({
  selector: 'app-fuel-car',
  templateUrl: './fuel-car.component.html',
  styleUrls: ['./fuel-car.component.scss']
})
export class FuelCarComponent implements OnInit, OnDestroy {
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
  selectedSymbol: string;
  myBet: Array<any> = [
    { symbol: 'BTCUSDT', desc: 'BTC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 0 },
    { symbol: 'ETHUSDT', desc: 'ETH', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 1 },
    { symbol: 'XRPUSDT', desc: 'XRP', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 2 },
    { symbol: 'BCHUSDT', desc: 'BCH', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 3 },
    { symbol: 'LTCUSDT', desc: 'LTC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 4 },
    { symbol: 'EOSUSDT', desc: 'EOS', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 5 },
    { symbol: 'BNBUSDT', desc: 'BNB', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 6 },
    { symbol: 'XMRUSDT', desc: 'XMR', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 7 },
    { symbol: 'ADAUSDT', desc: 'ADA', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 8 },
    { symbol: 'TRXUSDT', desc: 'TRX', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 9 },
    { symbol: 'BATUSDT', desc: 'BAT', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 10 },
    { symbol: 'XLMUSDT', desc: 'XLM', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 11 },
    { symbol: 'XTZUSDT', desc: 'XTZ', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 12 },
    { symbol: 'ENJUSDT', desc: 'ENJ', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 13 },
    { symbol: 'MATICUSDT', desc: 'MATIC', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 14 },
    { symbol: 'LINKUSDT', desc: 'LINK', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 15 },
    { symbol: 'WAVESUSDT', desc: 'WAVES', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 16 },
    { symbol: 'ZILUSDT', desc: 'ZIL', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 17 },
    { symbol: 'VETUSDT', desc: 'VET', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 18 },
    { symbol: 'USDT', desc: 'USDT', bet: 0.00, selected: false, favourite: false, short: false, customIndex: 19 }
  ];
  selectedBets: Array<number> = [];
  order = 'favourite';
  reverse = true;
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
  currency = 'TRX';
  raceMode = '3d';
  ioiBalance: number;
  summaryCarIndex = 0;
  isLoading = false;
  hideConfirm = true;
  summaryTrxAmount = 0;
  summaryIoiAmount = 0;
  newEditionIndex = 0;
  slidePercent = 20;
  rareAdjustNum = 3;
  myDriverStats: any;
  myAffilate: any;
  players = 0;
  trDate: number;
  trsDate: number;
  redirecting = false;
  useUnity = false;
  constructor(private router: Router, protected api: CarsService,
    protected raceApi: RacesService, protected route: ActivatedRoute,
    protected notify: NotifiqService,
    protected driverSrvc: DriversService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    private racetwoapi: RacesV2Service) {
    this.raceId = this.route.snapshot.paramMap.get('id');
    if (this.raceId === 'car_race_24hrs_1000') {
      this.trxneeded = 1000;
      this.validerr = 'To fuel you car you need 1000 TRX, must mix 3 different coins with min. ' +
        ' 5% in each you must have 100% in your  tank to get into the race. (example 5% BTC, 90% TRX, 5% ETH)';
    } else if (this.raceId === 'wednesday_party_race_0') {
      this.trxneeded = 0;
      this.validerr = 'To fuel you car you need 1000 TRX, must mix 3 different coins with min. ' +
        ' 5% in each you must have 100% in your  tank to get into the race. (example 5% BTC, 90% TRX, 5% ETH)';
    } else {
      this.trxneeded = 0;
      this.validerr = 'To fuel you car you need ' + this.raceId + ' TRX, must mix 3 different coins with min. ' +
        ' 5% in each you must have 100% in your  tank to get into the race. (example 5% BTC, 90% TRX, 5% ETH)';
    }

    if (this.raceId === 'car_race_ioi_1' || this.raceId === 'car_race_ioi_3' || this.raceId === 'car_race_ioi_5') {
      this.isIoi = true;
      this.currency = 'IOI';
    }

  }

  ngOnInit(): void {
    this.getCanJoin();
    this.getfirstraces();
    this.fuelBest();

    this.getMyDriverStats();
    this.getMyBalance();
    this.launchTutorial();
    this.getMyTeam();

    this.trDate = Date.now();
    this.trsDate = Date.now();
    this.recognizeGame();
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
    this.redirecting = true;
  }


  getCanJoin() {
    this.canJoinObservable = this.raceApi.racesMultiCanJoinV2List().subscribe(data => {
      const newdata: any = data;
      const mynextrace = newdata.filter(item => {
        return item.race_identifier === this.raceId;
      });

      this.carsCanJoin = mynextrace[0].available_cars;

      const step1 = newdata.filter(item => {
        return item.race_identifier === 'car_race_short_10';
      });
      const uniq1 = [...new Set(step1)];
      this.canJoin1 = uniq1;


      const step2 = newdata.filter(item => {
        return item.race_identifier === 'classic_tournament_10';
      });
      const uniq2 = [...new Set(step2)];
      this.canJoin2 = uniq2;


      const step3 = newdata.filter(item => {
        return item.race_identifier === 'car_race_short_100';
      });
      const uniq3 = [...new Set(step3)];
      this.canJoin3 = uniq3;


      const step4 = newdata.filter(item => {
        return item.race_identifier === 'car_race_short_500';
      });
      const uniq4 = [...new Set(step4)];
      this.canJoin4 = uniq4;


      const step5 = newdata.filter(item => {
        return item.race_identifier === 'car_race_short_1000';
      });

      const uniq5 = [...new Set(step5)];
      this.canJoin5 = uniq5;


      const step6 = newdata.filter(item => {
        return item.race_identifier === 'car_race_ioi_1';
      });
      const uniq6 = [...new Set(step6)];
      this.canJoinIoi1 = uniq6;


      const step7 = newdata.filter(item => {
        return item.race_identifier === 'car_race_ioi_3';
      });
      const uniq7 = [...new Set(step7)];
      this.canJoinIoi2 = uniq7;


      const step8 = newdata.filter(item => {
        return item.race_identifier === 'car_race_ioi_5';
      });
      const uniq8 = [...new Set(step8)];
      this.canJoinIoi3 = uniq8;

      this.chosenRace = newdata.filter(item => {
        return item.race_identifier === this.raceId;
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
    const props = ['asset_id'];


    const z1 = this.canJoin1[0].available_cars;
    const z2 = this.canJoin2[0].available_cars;

    const z3 = this.canJoin3[0].available_cars;
    //const z4 = this.canJoin4[0].available_cars;
    //const z5 = this.canJoin5[0].available_cars;

    const zioi1 = this.canJoinIoi1[0].available_cars;
    //const zioi3 = this.canJoinIoi2[0].available_cars;
    const zioi5 = this.canJoinIoi3[0].available_cars;

    const yy = this.usedCars;


    const res1 = z1.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.asset_id === o2.asset_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res2 = z2.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.asset_id === o2.asset_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });




    const res3 = z3.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.asset_id === o2.asset_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res6 = zioi1.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.asset_id === o2.asset_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });

    const res8 = zioi5.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.asset_id === o2.asset_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });



    this.calc1 = z1;

    this.calc2 = z2;

    this.calc3 = z3;

    this.calc6 = zioi1;
    //this.calc7 = zioi3;
    this.calc8 = zioi5;

    const in1 = this.calc1.length > 0;

    const in2 = this.calc2.length > 0;

    const in3 = this.calc3.length > 0;


    const inioi1 = this.calc6.length > 0;
    //const inioi3 = this.calc7.length > 0;
    const inioi5 = this.calc8.length > 0;

    if (this.xtrx >= 10 && in1 === true && this.actualRaceAmount !== 10) {
      this.multibetOptions.push({
        val: 10,
        race_hash: this.canJoin1[0].race_hash,
        enabled: true,
        type: 'car_race_short_10'
      });
    }

    if (this.xtrx >= 20 && in2 === true && this.raceId !== 'classic_tournament_10') {
      this.multibetOptions.push({
        val: 10,
        race_hash: this.canJoin2[0].race_hash,
        enabled: true,
        type: 'classic_tournament_10'
      });
    }


    if (this.xtrx >= 100 && in3 === true && this.actualRaceAmount !== 100) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin3[0].race_hash,
        enabled: true,
        type: 'car_race_short_100'
      });
    }

    if (this.ioiBalance >= 1 && inioi1 === true && this.actualRaceAmount !== 1) {
      this.multibetOptions.push({
        val: 1,
        race_hash: this.canJoinIoi1[0].race_hash,
        enabled: true,
        type: 'car_race_ioi_1'
      });
    }

    if (this.ioiBalance >= 5 && inioi5 === true && this.actualRaceAmount !== 5) {
      this.multibetOptions.push({
        val: 5,
        race_hash: this.canJoinIoi3[0].race_hash,
        enabled: true,
        type: 'car_race_ioi_5'
      });
    }

  }

  addToMultibet(value: any, type: any, trxcut: number, indexik: number, curr: string) {
    this.multibetOptions[indexik].enabled = false;
    for (let x = 0; x < this.selectedCarsToRace.length; x++) {
      let usedcar = 0;

      const arr1 = type;
      const arr2 = this.usedCars;


      const props = ['asset_id'];

      const result = arr1.filter(function (o1) {
        return !arr2.some(function (o2) {
          return o1.asset_id === o2.asset_id;          // assumes unique id
        });
      }).map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

      const heh = Math.floor(Math.random() * 10);
      usedcar = result[heh].asset_id;
      if (usedcar !== 0) {
        console.log('hey');
        this.myMultiBetAmounts.push({
          asset_id: result[x].asset_id,
          race_hash: value.race_hash,
          bet_coins: this.selectedCarsToRace[this.selectedCarIndex].bet,
          trxv: trxcut
        });
        this.usedCars.push({
          asset_id: result[x].asset_id,
          amount: trxcut
        });

        if (trxcut < 10) {
          this.summaryIoiAmount = this.summaryIoiAmount + trxcut;
        } else {
          this.summaryTrxAmount = this.summaryTrxAmount + trxcut;
        }
        console.log(trxcut);
        console.log( this.summaryIoiAmount);
        console.log( this.summaryTrxAmount);
        const filused1 = this.canJoin1[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoin1[0].available_cars = filused1;


        const filused2 = this.canJoin2[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoin2[0].available_cars = filused2;


        const filused3 = this.canJoin3[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoin3[0].available_cars = filused3;


        const filused4 = this.canJoin4[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoin4[0].available_cars = filused4;


        const filused5 = this.canJoin5[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoin5[0].available_cars = filused5;


        const filused6 = this.canJoinIoi1[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoinIoi1[0].available_cars = filused5;


        const filused7 = this.canJoinIoi2[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoinIoi2[0].available_cars = filused5;


        const filused8 = this.canJoinIoi3[0].available_cars.filter(item => {
          return item.asset_id !== usedcar;
        });
        this.canJoinIoi3[0].available_cars = filused5;


        if (curr === 'ioi') {
          this.ioiBalance = this.ioiBalance - trxcut;
        } else {
          this.xtrx = this.xtrx - trxcut;
        }

        this.usedCars.push({
          asset_id: usedcar,
          amount: trxcut
        });


      }

      //this.calcPossibleMultibet();
    }
  }

  removeFromMultibet(index: number, trxcut: number, typenum: number, curr: string) {
    this.multibetOptions[index].enabled = true;

    const nodaj = this.myMultiBetAmounts.filter(item => {
      return trxcut !== item.trxv;
    });
    this.myMultiBetAmounts = nodaj;




    if (curr === 'ioi') {
      this.ioiBalance = this.ioiBalance - trxcut;
      this.summaryIoiAmount = this.summaryIoiAmount - trxcut;
    } else {
      this.xtrx = this.xtrx - trxcut;
      this.summaryTrxAmount = this.summaryTrxAmount + trxcut;
    }




    const carid = this.usedCars.filter(item => {
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

    const reclear = this.usedCars.filter(item => {
      return item.amount !== trxcut;
    });

    this.usedCars = reclear;


    //this.calcPossibleMultibet();
  }

  serializeSignuprequest() {
    let obj: any = {
      race_hash: this.nextRaceHash,
      car: this.selectedCarToRace.asset_id,
      bet_coins: this.myBet
    };

    if (this.useTicket === true) {
      obj.use_ticket = 'tournament_ticket';
    }

    return obj;
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
              bet: fakeSelected[i].bet[ix].short === false ? fakeSelected[i].bet[ix].bet : fakeSelected[i].bet[ix].bet * -1
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
            use_ticket: 'tournament_ticket'
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


      setTimeout(() => {
        if (this.redirecting === false) {
          this.redirecting = true;
          this.redirectToRace();
        }
      }, 5000);



      this.raceApi.racesMultiSignupCreate(serialized).subscribe(
        res => console.log('HTTP response', res), // response
        err => console.log(err.error[0].errors[0].race[0] === 'Too late to sign up for this race!' ? this.refireSignup() : null), // error
        () => this.checkRedirect() // finished
      );



    }
  }

  checkRedirect() {

    if (this.myMultiBetAmounts.length > 0) {

      this.multibet();
    } else {
      if (this.nextRaceHash !== undefined) {
        this.redirecting = true;
        this.redirectToRace();
      } else { console.log('chyba'); }
    }
  }

  refireSignup() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      this.nextRaceHash = data.race_hash;

      this.signupToRace();
    });
  }

  refireMultiSignup() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
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
              bet: fakeSelected[i].bet_coins[ix].bet
            });
          }
        }
      }
      for (let i = 0; i < fakeSelected.length; i++) {
        serialized.push({
          race_hash: fakeSelected[i].race_hash,
          car: fakeSelected[i].asset_id,
          bet_coins: fakeSelected[i].newBet
        });
      }



      this.raceApi.racesMultiSignupCreate(serialized).subscribe(data => { });
      if (this.nextRaceHash !== undefined) {
        this.redirecting = true;
        this.redirectToRace();
      } else { this.redirectAfterMultibet(); }



    }
  }

  redirectAfterMultibet() {

    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
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


      this.router.navigate(['/race/watch-multiple-races/', { races: routesParams }]);

    } else {
      if (that.raceId === 'car_race_24hrs_1000') {
        that.router.navigate(['/race/watch-race-24hod/' + that.nextRaceHash]);
      } else {
        that.router.navigate(['/race/watch-race-3min/' + that.nextRaceHash]);
      }
    }


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
    this.timerReady = false;
    this.myCars = this.chosenRace[0].available_cars;
    if (this.myCars.length === 0) {
      this.notify.error('Error', 'You have no available race car for this race');
      setTimeout(() => { this.router.navigate(['/car/garage']); }, 1000);
    } else {
      this.myCars = this.myCars.sort((a, b) => {
        return a.extras.tier - b.extras.tier;
      });
    }
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

    if (this.raceId === 'wednesday_party_race_0') {
      this.isWnd = true;
    }




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
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
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
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {

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
      this.getCanJoin();
      this.getfirstraces();
    }, 1500);

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

    const nums: Array<any> = this.generateRandomNums(100, 3, 5);

    this.selectedCarsToRace[this.selectedCarIndex].selectedBets = [];
    this.activeFuelType = 0;

    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].bet.length; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].bet = 0;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].selected = false;
      this.selectedCarsToRace[this.selectedCarIndex].bet[x].short = false;
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

    for (let x = 0; x < this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length; x++) {
      //this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = 0;
      if (this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet < 5) {
        this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = 5;
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
    console.log(index);
    //this.selectedCarToRace = this.myCars[index];
    this.hideConfirm = false;
    const statBet = [];
    const selBets = [];
    let isSituated;

    isSituated = this.selectedCarsToRace.find(i => i.asset_id === this.myCars[index].asset_id);

    if (!isSituated) {
      if (this.raceId === 'car_race_short_0' && this.selectedCarsToRace.length > 4) {
        this.notify.error('Error', 'You can fuel max 5 cars on free race');
        return;
      }
      if (this.raceId === 'tournament_for_ticket_0' && this.selectedCarsToRace.length > 3) {
        this.notify.error('Error', 'You can fuel max 4 car on free tournament');
        return;
      }
      if ((this.raceId === 'golden_ticket_0'
        || this.raceId === 'golden_ticket_10' || this.raceId === 'golden_ticket_100'
        || this.raceId === 'golden_ticket_1000' || this.raceId === 'wednesday_party_race_0'
        || this.raceId === 'classic_tournament_0') && this.selectedCarsToRace.length > 3) {
        this.notify.error('Error', 'You can fuel max 4 cars on free race');
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
      this.myCars[index].selected = true;
      this.myCars[index].bet = statBet;
      this.myCars[index].fuel = 0;
      this.myCars[index].selectedBets = selBets;

      this.selectedCarsToRace.push(this.myCars[index]);

      this.usedCars.push({
        asset_id: this.myCars[index].asset_id,
        amount: this.actualRaceAmount
      });
      this.myCars[index].selected = true;
    } else {
      this.selectedCarsToRace = this.selectedCarsToRace.filter(j => j.asset_id !== this.myCars[index].asset_id);
      this.usedCars = this.usedCars.filter(j => j.asset_id !== this.myCars[index].asset_id);
      this.myCars[index].selected = false;
      this.myCars[index].short = false;
    }

    if (this.isIoi === true) {
      this.ioiBalance = this.ioiBalance - this.actualRaceAmount;
    } else {
      this.xtrx = this.xtrx - this.actualRaceAmount;
    }
    console.log(this.selectedCarsToRace);
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


  launchTutorial() {
    const data = this.identityService.getStorageIdentity(); const datax: any = data;
    this.firstLogin = data.is_in_tutorial;
    this.tickets = datax.tournament_tickets;
    if (this.firstLogin === true) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
    }

  }


  skipModal() {
    this.firstLogin = false;
    this.introModal = false;
    this.introModalSecond = false;
    this.driverSrvc.driversTutorialPartialUpdate(false).subscribe(data => { this.identityService.meUpdate(); });
  }


  getFavCoins() {
    this.getFavCoinsObserver = this.driverSrvc.driversFavCoinsList().subscribe(data => {
      const retype: any = data;
      this.myFavCoins = retype;
      this.resortFavCoins();
    });
  }

  fuelBest() {
    /*
    this.mostFueledObserver = this.raceApi.racesHintsList().subscribe(data => {
      this.mostFueled = data;
      this.myBetInput = this.mostFueled.best_performing_coins;
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

  scrollToView(id: string) {
    if (this.selectedCarsToRace[this.selectedCarIndex].selectedBets.length === 3) {
      if (window.innerWidth < 641) {
        let el = document.getElementById(id);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectDefaultCoin(customIndex: number){
    this.trsDate = Date.now();
    
    if (this.trsDate - this.trDate > 1000) {
      this.selectedSymbol = null;
      setTimeout(() => {


        this.selectedSymbol = this.selectedCarsToRace[this.selectedCarIndex].bet[customIndex].symbol;
        this.trDate = Date.now();
      }, 1000);
    }
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

  getfirstraces() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      const tempArray = [];
      tempArray.push(data);
      this.newCars = tempArray;


      this.timerReady = true;
    });
  }

  updateMultibetRaceHashes() {
    const source = this.myMultiBetAmounts;

    for (let x = 0; x < source.length; x++) {
      if (source[x].trxv === 10) {

        source[x].race_hash = this.canJoin1[0].race_hash;
      }
      if (source[x].trxv === 50) {
        source[x].race_hash = this.canJoin2[0].race_hash;
      }
      if (source[x].trxv === 100) {
        source[x].race_hash = this.canJoin3[0].race_hash;
      }
      if (source[x].trxv === 500) {
        source[x].race_hash = this.canJoin4[0].race_hash;
      }
      if (source[x].trxv === 1000) {
        source[x].race_hash = this.canJoin5[0].race_hash;
      }
      if (source[x].trxv === 1) {
        source[x].race_hash = this.canJoinIoi1[0].race_hash;
      }
      if (source[x].trxv === 3) {
        source[x].race_hash = this.canJoinIoi2[0].race_hash;
      }
      if (source[x].trxv === 5) {
        source[x].race_hash = this.canJoinIoi3[0].race_hash;
      }



      return source;
    }
  }

  changeGameType() {
    if (this.useUnity) {
      localStorage.setItem('useUnity', JSON.stringify(this.useUnity))
    } else {
      localStorage.removeItem('useUnity');
    }
    this.recognizeGame();
  }

  recognizeGame() {
    const man = JSON.parse(localStorage.getItem('useUnity'));
    if (man) {
      this.useUnity = true;
    } else {
      this.useUnity = false;
      }
  }

  changeEdition(index: number){
    this.slidePercent = 20;
    this.carSlideIndex = 0;
    const arrIndex = index - 1;
    this.editionIndex = index;
    const carsBefore = this.myCars.filter(car => car.extras.tier <= (arrIndex * 6));
    this.myCarsInEdition = this.myCars.filter(car => car.extras.tier > arrIndex * 6 && car.extras.tier <= (arrIndex * 6) + 6 || car.extras.tier === 24 + index);
    let multiply = carsBefore.length;
    if(index === 1){
      multiply = 0;
      this.myCarsInEdition = this.myCars.filter(car => car.extras.tier >= arrIndex * 6 && car.extras.tier <= (arrIndex * 6) + 6 || car.extras.tier === 24 + index);
    }
    if (window.window.innerWidth < 640){
      this.slidePercent = 33.333;
      this.selectedSlideIndex = 1 + multiply;
      this.rareAdjustNum = 2;
      if(this.myCarsInEdition.length === 1 || this.myCarsInEdition.length === 2){
        this.selectedSlideIndex = 0 + multiply;
        this.carSlideIndex = -1;
      }
    } else {
      if(this.myCarsInEdition.length > 4){
        this.selectedSlideIndex = 2 + multiply;
      } else if(this.myCarsInEdition.length === 3 || this.myCarsInEdition.length === 4){
        this.selectedSlideIndex = 1 + multiply;
        this.carSlideIndex = -1;
      } else if(this.myCarsInEdition.length === 1 || this.myCarsInEdition.length === 2){
        this.selectedSlideIndex = 0 + multiply;
        this.carSlideIndex = -2;
      }
    }
  }

  nextSlideCar(){
    let adjustNum = 4;
    if (window.window.innerWidth < 640){
      adjustNum = 3;
    }
    if(this.carSlideIndex <= this.myCarsInEdition.length - adjustNum){
      this.carSlideIndex++;
      this.selectedSlideIndex++;
    }
  }
  prevSlideCar(){
    let adjustNum = 2;
    if (window.window.innerWidth < 640){
      adjustNum = 1;
    }
    if(this.carSlideIndex > (-adjustNum)){
      this.carSlideIndex--;
      this.selectedSlideIndex--;
    }
  }

  nextTutorialStep(){
    if (this.tutorialStep === 4) {
      this.router.navigate(['/other/tasks']);
    }
    this.tutorialStep++;
  }

}


