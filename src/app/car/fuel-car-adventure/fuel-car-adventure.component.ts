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
  selector: 'app-fuel-car-adventure',
  templateUrl: './fuel-car-adventure.component.html',
  styleUrls: ['./fuel-car-adventure.component.scss']
})
export class FuelCarAdventureComponent implements OnInit, OnDestroy {
  myCars: any;
  myCar: any;
  dataReady = false;
  timerReady = false;
  fuel = 0;
  raceId: string;
  pricePool: number;
  raceData: NextRaceV2[];
  raceStarts: any;
  activeFuelType: number;
  numOfPlayers: number;
  activeFuel = true;
  actualCarIndex = 0;
  bestIndex = 0;
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
  actualRaceAmount: any = 10;
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
  canJoin6: any;
  canJoin7: any;
  canJoin8: any;
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
  calc9: any;
  calc10: any;
  calc11: any;
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
    { symbol: 'EOSUSDT', desc: 'EOS', bet: 0.00, selected: false, favourite: false, short: true, customIndex: 5 },
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
  editionSlideIndex = 0;
  currSlideIndex = 0;
  selectedCarIndex = 0;
  stepIndex = 0;
  favFilter = false;
  useTicket = false;
  coinFilterType = 'most';
  selectedCarsToRace = [];
  sumFuel: number;
  sumlength: number;
  switchSelectedCar: number;
  difficultyTier: number;
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
  players = 0;
  trDate: number;
  trsDate: number;
  constructor(private router: Router, protected api: CarsService,
    protected raceApi: RacesService, protected route: ActivatedRoute,
    protected notify: NotifiqService,
    protected driverSrvc: DriversService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    private racetwoapi: RacesV2Service) {
    this.raceId = this.route.snapshot.paramMap.get('id');
    const difficuly = this.raceId.substr(4, 1);
    //console.log(difficuly);
    this.difficultyTier = Number(difficuly);
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
    this.getAllV2RacesBase();

    this.getMyDriverStats();
    this.getMyBalance();
    this.launchTutorial();
    this.getMyTeam();

    this.trDate = Date.now();
    this.trsDate = Date.now();
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
        return item.race_identifier === 'car_race_short_50';
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

      const step9 = newdata.filter(item => {
        return item.race_identifier === 'cops1_10';
      });
      const uniq9 = [...new Set(step9)];
      this.canJoin6 = uniq9;

      const step10 = newdata.filter(item => {
        return item.race_identifier === 'cops2_10';
      });
      const uniq10 = [...new Set(step10)];
      this.canJoin7 = uniq10;

      const step11 = newdata.filter(item => {
        return item.race_identifier === 'cops3_10';
      });
      const uniq11 = [...new Set(step11)];
      this.canJoin8 = uniq11;

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
    const props = ['car_id'];

    const z1 = this.canJoin1[0].available_cars;
    const z2 = this.canJoin2[0].available_cars;
    const z3 = this.canJoin3[0].available_cars;
    const z4 = this.canJoin4[0].available_cars;
    const z5 = this.canJoin5[0].available_cars;
    const z6 = this.canJoin6[0].available_cars;
    const z7 = this.canJoin7[0].available_cars;
    const z8 = this.canJoin8[0].available_cars;

    const zioi1 = this.canJoinIoi1[0].available_cars;
    const zioi3 = this.canJoinIoi2[0].available_cars;
    const zioi5 = this.canJoinIoi3[0].available_cars;

    const yy = this.usedCars;


    const res1 = z1.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res2 = z2.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res3 = z3.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res4 = z4.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res5 = z5.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res6 = zioi1.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res7 = zioi3.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });


    const res8 = zioi5.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });

    const res9 = zioi5.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });

    const res10 = z6.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    });

    const res11 = z7.filter(function (o1) {
      return yy.some(function (o2) {
        return o1.car_id === o2.car_id;          // assumes unique id
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
    this.calc4 = z4;
    this.calc5 = z5;
    this.calc6 = zioi1;
    this.calc7 = zioi3;
    this.calc8 = zioi5;
    this.calc9 = z6;
    this.calc10 = z7;
    this.calc11 = z8;

    const in1 = this.calc1.length > 0;
    const in2 = this.calc2.length > 0;
    const in3 = this.calc3.length > 0;
    const in5 = this.calc4.length > 0;
    const in10 = this.calc5.length > 0;
    const in11 = this.calc8.length > 0;
    const in12 = this.calc9.length > 0;
    const in13 = this.calc10.length > 0;

    const inioi1 = this.calc6.length > 0;
    const inioi3 = this.calc7.length > 0;
    const inioi5 = this.calc8.length > 0;

    if (this.xtrx >= 10 && in1 === true && this.actualRaceAmount !== 10) {
      this.multibetOptions.push({
        val: 10,
        race_hash: this.canJoin1[0].race_hash,
        enabled: true
      });
    }

    if (this.xtrx >= 50 && in2 === true && this.actualRaceAmount !== 50) {
      this.multibetOptions.push({
        val: 50,
        race_hash: this.canJoin2[0].race_hash,
        enabled: true
      });
    }

    if (this.myBalance >= 100 && in3 === true && this.actualRaceAmount !== 100) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin3[0].race_hash,
        enabled: true
      });
    }

    if (this.xtrx >= 500 && in5 === true && this.actualRaceAmount !== 500) {
      this.multibetOptions.push({
        val: 500,
        race_hash: this.canJoin4[0].race_hash,
        enabled: true
      });
    }

    if (this.xtrx >= 1000 && in10 === true && this.actualRaceAmount !== 1000) {
      this.multibetOptions.push({
        val: 1000,
        race_hash: this.canJoin5[0].race_hash,
        enabled: true
      });
    }

    // police
    if (this.xtrx >= 100 && in11 === true && this.actualRaceAmount !== 100) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin6[0].race_hash,
        enabled: true
      });
    }

    if (this.xtrx >= 100 && in12 === true && this.actualRaceAmount !== 100) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin6[0].race_hash,
        enabled: true
      });
    }


    if (this.xtrx >= 100 && in13 === true && this.actualRaceAmount !== 100) {
      this.multibetOptions.push({
        val: 100,
        race_hash: this.canJoin6[0].race_hash,
        enabled: true
      });
    }

    if (this.ioiBalance >= 1 && inioi1 === true && this.actualRaceAmount !== 1) {
      this.multibetOptions.push({
        val: 1,
        race_hash: this.canJoinIoi1[0].race_hash,
        enabled: true
      });
    }
    if (this.ioiBalance >= 3 && inioi3 === true && this.actualRaceAmount !== 3) {
      this.multibetOptions.push({
        val: 3,
        race_hash: this.canJoinIoi2[0].race_hash,
        enabled: true
      });
    }
    if (this.ioiBalance >= 5 && inioi5 === true && this.actualRaceAmount !== 5) {
      this.multibetOptions.push({
        val: 5,
        race_hash: this.canJoinIoi3[0].race_hash,
        enabled: true
      });
    }

  }

  addToMultibet(value: any, type: any, trxcut: number, indexik: number, curr: string) {
    this.multibetOptions[indexik].enabled = false;

    for (let x = 0; x < this.selectedCarsToRace.length; x++) {
      let usedcar = 0;

      const arr1 = type;
      const arr2 = this.usedCars;


      const props = ['car_id'];

      const result = arr1.filter(function (o1) {
        return !arr2.some(function (o2) {
          return o1.car_id === o2.car_id;          // assumes unique id
        });
      }).map(function (o) {
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

      const heh = Math.floor(Math.random() * 10);
      usedcar = result[heh].car_id;
      if (usedcar !== 0) {

        this.myMultiBetAmounts.push({
          car_id: result[x].car_id,
          race_hash: value.race_hash,
          bet_coins: this.selectedCarsToRace[this.selectedCarIndex].bet,
          trxv: trxcut
        });
        this.usedCars.push({
          car_id: result[x].car_id,
          amount: trxcut
        });

        if (trxcut < 10) {
          this.summaryIoiAmount = this.summaryIoiAmount + trxcut;
        } else {
          this.summaryTrxAmount = this.summaryTrxAmount + trxcut;
        }

        const filused1 = this.canJoin1[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoin1[0].available_cars = filused1;


        const filused2 = this.canJoin2[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoin2[0].available_cars = filused2;


        const filused3 = this.canJoin3[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoin3[0].available_cars = filused3;


        const filused4 = this.canJoin4[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoin4[0].available_cars = filused4;


        const filused5 = this.canJoin5[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoin5[0].available_cars = filused5;


        const filused6 = this.canJoinIoi1[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoinIoi1[0].available_cars = filused5;


        const filused7 = this.canJoinIoi2[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoinIoi2[0].available_cars = filused5;


        const filused8 = this.canJoinIoi3[0].available_cars.filter(item => {
          return item.car_id !== usedcar;
        });
        this.canJoinIoi3[0].available_cars = filused5;


        if (curr === 'ioi') {
          this.ioiBalance = this.ioiBalance - trxcut;
        } else {
          this.xtrx = this.xtrx - trxcut;
        }

        this.usedCars.push({
          car_id: usedcar,
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

  getAllV2RacesBase() {
    this.timerReady = false;

    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      const tempArray = [];
      tempArray.push(data);

      const mynextrace = tempArray;
      this.pricePool = mynextrace[0].prize_pool;
      this.raceStarts = mynextrace[0].starts_in;
      this.numOfPlayers = mynextrace[0].players;
      this.nextRaceHash = mynextrace[0].race_hash;


      this.timerReady = true;
    });
  }

  serializeSignuprequest() {
    let obj: any = {
      race_hash: this.nextRaceHash,
      car: this.selectedCarToRace.car_id,
      bet_coins: this.myBet
    };

    if (this.useTicket === true) {
      obj.use_ticket = 'golden_ticket';
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
            console.log(fakeSelected[i].bet[ix] );
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
            car: fakeSelected[i].car_id,
            bet_coins: fakeSelected[i].newBet,
            use_ticket: 'golden_ticket'
          });
          this.tickets = this.tickets - 1;
        } else {
          serialized.push({
            race_hash: this.nextRaceHash,
            car: fakeSelected[i].car_id,
            bet_coins: fakeSelected[i].newBet,
          });
        }
      }


      this.raceApi.racesMultiSignupCreate(serialized).subscribe(
        res => console.log('HTTP response', res), // response
        err => console.log(err.error[0].errors[0].race[0] === 'Too late to sign up for this race!' ? this.refireSignup() : null), // error
        () => console.log('HTTP request completed.') // finished
      );

      if (this.myMultiBetAmounts.length > 0) {
        this.multibet();
      } else {
        if (this.nextRaceHash !== undefined) {
          this.redirectToRace();
        } else { console.log('chyba'); }
      }



    }
  }

  refireSignup() {
    this.timerReady = false;
    
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      this.nextRaceHash = data.race_hash;

      this.signupToRace();
    });
  }

  multibet() {
    if (this.validateBets() === false) {
      return;
    } else {
      this.isLoading = true;
      const serialized = [];
      const fakeSelected: any = this.myMultiBetAmounts;
      for (let i = 0; i < fakeSelected.length; i++) {
        fakeSelected[i].newBet = [];
        for (let ix = 0; ix < fakeSelected[i].bet_coins.length; ix++) {
          if (fakeSelected[i].bet[ix].bet > 0) {
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
          car: fakeSelected[i].car_id,
          bet_coins: fakeSelected[i].newBet
        });
      }

      this.raceApi.racesMultiSignupCreate(serialized).subscribe(data => { });
      if (this.nextRaceHash !== undefined) {
        this.redirectToRace();
      } else { console.log('chyba'); }



    }
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

    console.log(this.selectedCarsToRace[this.selectedCarIndex]);
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
    this.myCars = this.chosenRace[0].available_cars;
    if (this.myCars.length === 0) {
      this.notify.error('Error', 'You have no available race car for this race');
      setTimeout(() => { this.router.navigate(['/car/garage']); }, 1000);
    } else {
      this.myCars = this.myCars.sort((a, b) => {
        return a.car_model - b.car_model;
      });
    }
    if (this.myCars.length === 1) {
      this.selectCarToRace(0);
    }

    const mynextrace = this.newCars;
    this.pricePool = Number(mynextrace[0].price_pool);
    this.raceStarts = mynextrace[0].starts_in;
    this.players = mynextrace[0].players;
    this.numOfPlayers = mynextrace[0].players;
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

  }


  getAllV2Races() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      const tempArray = [];
      tempArray.push(data);

      this.newCars = tempArray;


      this.timerReady = true;
    });
  }


  timerCompleted() {

    this.timerReady = false;
    setTimeout(() => {
      this.getAllV2RacesBase();
    }, 500);
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

    for (let x = 0; x < 3; x++) {
      this.selectedCarsToRace[this.selectedCarIndex].bet[this.selectedCarsToRace[this.selectedCarIndex].selectedBets[x]].bet = 0;
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

  switchSelectCarToRace(index) {
    this.switchSelectedCar = index;
    if(this.selectedCarsToRace.length > 0){
      this.notify.error('Error', 'You can fuel max 1 car in this race.');
      return;
    }

    const statBet = [];
    const selBets = [];

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

    this.selectedCarsToRace = [this.myCars[index]];
  }


  selectCarToRace(index) {

    //this.selectedCarToRace = this.myCars[index];
    this.hideConfirm = false;
    const statBet = [];
    const selBets = [];
    let isSituated;

    isSituated = this.selectedCarsToRace.find(i => i.car_id === this.myCars[index].car_id);

    if (!isSituated) {
      if(this.selectedCarsToRace.length > 0){
        this.notify.error('Error', 'You can fuel max 1 car in this race.');
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
        car_id: this.myCars[index].car_id,
        amount: this.actualRaceAmount
      });
      this.myCars[index].selected = true;
    } else {
      this.selectedCarsToRace = this.selectedCarsToRace.filter(j => j.car_id !== this.myCars[index].car_id);
      this.usedCars = this.usedCars.filter(j => j.car_id !== this.myCars[index].car_id);
      this.myCars[index].selected = false;
      this.myCars[index].short = false;
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


  launchTutorial() {
    const data = this.identityService.getStorageIdentity(); const datax: any = data;
    this.firstLogin = false;
    this.tickets = datax.golden_tickets;
    // if (this.firstLogin === true) {
    //   this.introModal = true;
    //   setTimeout(() => {
    //     if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
    //       this.notify.info('empty', 'fuel_tutorial_text1', 10000);
    //     }
    //   }, 2000);
    // }

  }

  tutorialSecondStep() {
    if (this.firstLogin === true && this.stepIndex === 2) {
      this.tutorialIndex = 3;
      this.introModal = true;
      setTimeout(() => {
        if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
          this.notify.info('empty', 'fuel_tutorial_text2', 10000);
        }
      }, 1000);
    }
  }

  tutorialThirdStep() {
    if (this.firstLogin === true && this.stepIndex === 3) {
      this.introModal = true;
      setTimeout(() => {
        if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
          this.notify.info('empty', 'fuel_tutorial_text3', 10000);
        }
      }, 1000);
    }
  }

  tutorialFourthStep() {
    if (this.firstLogin === true && this.stepIndex === 2) {
      this.introModal = true;
      this.tutorialIndex = 5;
      setTimeout(() => {
        if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
          this.notify.info('empty', 'fuel_tutorial_text4', 15000);
        }
      }, 1000);
    }
  }

  tutorialLastStep() {
    if (this.firstLogin === true && this.stepIndex === 5) {
      this.introModal = true;
      setTimeout(() => {
        if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
          this.notify.info('empty', 'fuel_tutorial_text5', 8000);
        }
      }, 1000);
      setTimeout(() => {
        if (this.pageOpen === true && (this.introModal === true || this.introModalSecond === true)) {
          this.notify.info('empty', 'fuel_tutorial_text6', 15000);
        }
      }, 9500);
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

  getfirstraces() {
    this.timerReady = false;
    this.racesObservable = this.racetwoapi.racesV2DetailList(this.raceId).subscribe(data => {
      const tempArray = [];
      tempArray.push(data);
      this.newCars = tempArray;


      this.timerReady = true;
    });

  }

  selectDifficultyTier(difficultyTier: number) {
    this.router.navigate(['/car/fuel-car-adventure/cops' + difficultyTier + '_10']);

    return;
    this.difficultyTier = difficultyTier;
    this.raceId = `cops${difficultyTier}_100`;

    this.getCanJoin();
    this.getfirstraces();
  }

}


