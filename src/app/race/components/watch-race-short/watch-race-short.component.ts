import { RewardsService } from 'src/app/api/services';
import { BalanceService } from './../../../common/services/balance.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { RaceSignupV2 } from './../../../api/models/race-signup-v2';
import { RaceStat } from './../../../api/models/race-stat';
import { RaceDetail } from './../../../api/models/race-detail';
import { NotifiqService } from './../../../common/services/notifiq.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RacesService, AffiliatesService, DriversService, TickerPricesService, CarsService } from '../../../api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CurrentRace, NextRaceV2, TournamentLeaderboard } from 'src/app/api/models';
import { Experience, ExperienceService } from 'src/app/common/services/experience.service';
import { format } from 'url';
/*import * as html2canvas from "html2canvas"; */
@Component({
  selector: 'app-watch-race-short',
  templateUrl: './watch-race-short.component.html',
  styleUrls: ['./watch-race-short.component.scss']
})
export class WatchRaceShortComponent implements OnInit, OnDestroy {
  raceId: string;
  raceData: RaceStat;
  dataReady = false;
  takeit = true;
  showBanner = false;
  showBet = false;
  showPositions = false;
  interval: any;
  raceFinished = false;
  youWon = false;
  upcoming: any;
  yourNextrace: any;
  shooting = false;
  willShoot = false;
  showAllCoins = false;
  showFinalModal = false;
  showAllResults = false;
  showChat = false;
  gotWinner = false;
  soundEnabled = true;
  splitNum: number;
  selectedMyIndex = 0;
  actualCarIndex = 0;
  scoreOffset = 0;
  private raceObserver: Subscription;
  winnerObservable: Subscription;
  affilateObservable: Subscription;
  nextObservable: Subscription;
  detailObservable: Subscription;
  tickerObservable: Subscription;
  firstObservable: Subscription;
  firstLoginObserver: Subscription;
  ldrbrdObserver: Subscription;
  xObserver: Subscription;
  xxObserver: Subscription;
  transObserver: Subscription;
  ntoberver: Subscription;
  winnersList: any = [];
  semaforsLaunched = false;
  semaforsVisible = false;
  firstSemafor = false;
  secondSemafor = false;
  thirdSemafor = false;
  shareImage: any;
  showShareModal = false;
  raceStarted = false;
  affilateSlug: string;
  startsIn: number;
  fireSemafor: number;
  startsInChecked = false;
  raceStarts: any;
  pricePool: number;
  actualPage = 0;
  upcomingLoaded = false;
  upcomingLoadedOnce = false;
  nextRacesData: NextRaceV2[];
  myInterval = 3000;
  detailInterval: any;
  raceDataildata: RaceDetail;
  myUid = 'not-me';
  myUsername = '';
  backType = 1;
  initialCars: any;
  ticker: any = [];
  introModal = false;
  firstLogin = true;
  verifyModal = false;
  isPlaying = false;
  showInfoModal = false;
  canPlay = true;
  sound: any;
  firstTicker: any;
  firstStatsTicker: any = [];
  musicInterval: any;
  affilateText: string;
  pageOpen = true;
  gotTickers = false;
  gotTickersTwo = false;
  showHints = false;
  showTourMsg = false;
  mycarNext: any;
  motiveCurrent: number;
  miniMotivIndex: number;
  nextRaceHash: string;
  tourModal = false;
  changeFuel = false;
  cFuelOpen = false;
  showTourPos = false;
  nextStartsIn: number;
  ldrbrdpn: TournamentLeaderboard[];
  winnerL: any;
  loserIndex: number;
  myNotLosedCars: number;
  newNext: string;
  newNextStartsIn: number;
  redirectNum: number;
  endsIn: number;
  topPlaySelect = false;
  positionLength = 1;
  tutorialStep = 1;
  pos1: string;
  pos2: string;
  pos3: string;
  posEnding: string;
  closedModal = false;
  reverse = true;
  loserCar: any;
  myMotives: Array<any> = [
    { id: 0, name: 'map' },
    { id: 1, name: 'map' },
    { id: 2, name: 'map' },
    { id: 2, name: 'map' },
    { id: 4, name: 'map' },
    { id: 5, name: 'map' },
    { id: 6, name: 'map' },
    { id: 7, name: 'map' },
    { id: 8, name: 'map' },
    { id: 9, name: 'map' }
  ];
  numbers = [];
  frozenTicket: boolean;
  currentExpLevel: number;
  progressBarPercentage
  previousLevelExp: number;
  nextLevelExp: number;
  repeatDisabled = false;
  @Input() myRaceid: string;
  @Input() multiUsed = false;
  perTourCurrent: any;
  finishedtour: boolean;
  commonCars = [];
  unitySelected = false;
  allWin: number;
  teamReward: number;
  ioioreward: number;
  moveNum = 0;
  moveInterval: any;
  semaforVal = 5;
  willPlayFinishSound = false;
  raceSound: any;
  startSound: any;
  endSound: any;
  beforeSound: any;
  active_area = 0.2;
  constructor(private router: Router, protected api: RacesService, protected route: ActivatedRoute,
    private notify: NotifiqService, protected drvrsrvc: DriversService, private actv: ActivatedRoute,
    private tcksrvc: TickerPricesService, private crsrcvc: CarsService, private identityService: AuthService,
    private experience: ExperienceService, private balanceService: BalanceService, private rwrdsrvc: RewardsService) {

  }

  ngOnInit() {
    if (this.myRaceid !== undefined) {
      this.raceId = this.myRaceid;
    } else {
      this.raceId = this.actv.snapshot.paramMap.get('id');
    }

    setTimeout(() => {
      this.firstObservable = this.api.racesDetailList({ raceHash: this.raceId, pageNumber: this.actualPage }).subscribe(data => {
        //const retypeData: any = data; 

        this.raceDataildata = data;
        this.endsIn = data.ends_in;
        if (data.race_progress > 0) {
          this.startRace();
        } else {
          if (this.startsInChecked === false) {
            this.startsInChecked = true;
            this.startsIn = this.getWhenStarts();
            this.whenStarts();
          }
        }

        if (data.tournament_id !== null && data.tour_index > 1) {
          this.getLdrv();
        }
        if (data.is_cancelled === true) {
          this.notify.error('', 'Not enough players to start, you will be redirected.');
          this.router.navigate(['/race/watch-race-3min/' + this.nextRaceHash]);
        }

        this.resolveBackType();
        this.getMotive();


      });
    }, 300);
    setTimeout(() => { this.getRaceData(); }, 50);
    this.detailInterval = setInterval(() => {
      this.getRaceDetail();
      this.recognizeSound();
    }, 5000);
    this.getUpcoming();
    this.getMyAffilate();

    this.getMyCars();
    const data = this.identityService.getStorageIdentity();
    if (data.is_in_tutorial === true && window.innerWidth > 1024) {
      localStorage.setItem('first-race', JSON.stringify({
        first: true
      }));
      this.verifyModal = true;
    }

    this.recognizeGame();
    this.recognizeSound();
  }



  routerOnDeactivate() {
    clearInterval(this.detailInterval);
    clearInterval(this.musicInterval);
    clearInterval(this.moveInterval);
    if (this.sound) {
      this.sound.pause();
    } if (this.raceSound) {
      this.raceSound.pause();
      this.raceSound = null;
    } if (this.endSound) {
      this.endSound.pause();
      this.endSound = null;
    } if (this.startSound) {
      this.startSound.pause();
      this.startSound = null;
    } if (this.beforeSound) {
      this.beforeSound.pause();
      this.beforeSound = null;
    }
  }

  ngOnDestroy() {
    if (this.raceObserver) {
      this.raceObserver.unsubscribe();
    }
    if (this.winnerObservable) {
      this.winnerObservable.unsubscribe();
    }
    if (this.affilateObservable) {
      this.affilateObservable.unsubscribe();
    }
    if (this.nextObservable) {
      this.nextObservable.unsubscribe();
    }
    if (this.detailObservable) {
      this.detailObservable.unsubscribe();
    }
    if (this.tickerObservable) {
      this.tickerObservable.unsubscribe();
    }
    if (this.firstObservable) {
      this.firstObservable.unsubscribe();
    }
    if (this.firstLoginObserver) {
      this.firstLoginObserver.unsubscribe();
    }
    if (this.xxObserver) {
      this.xxObserver.unsubscribe();
    }
    if (this.xObserver) {
      this.xObserver.unsubscribe();
    }
    if (this.ntoberver) {
      this.ntoberver.unsubscribe();
    }
    clearInterval(this.moveInterval);
    clearInterval(this.detailInterval);
    if (this.sound) {
      this.sound.pause();
    } if (this.raceSound) {
      this.raceSound.pause();
      this.raceSound = null;
    } if (this.endSound) {
      this.endSound.pause();
      this.endSound = null;
    } if (this.startSound) {
      this.startSound.pause();
      this.startSound = null;
    } if (this.beforeSound) {
      this.beforeSound.pause();
      this.beforeSound = null;
    }
    clearInterval(this.musicInterval);
    this.pageOpen = false;
    this.cFuelOpen = true;
  }

  getRaceDetail() {

    this.firstObservable = this.api.racesDetailList({ raceHash: this.raceId, pageNumber: this.actualPage }).subscribe(data => {
      const retype: any = data;
      this.raceDataildata = retype;
      this.endsIn = data.ends_in;

      if (data.tournament_id !== null && data.tour_index > 1) {
        this.getLdrv();
      }

      if (this.raceDataildata.is_cancelled === true) {

        this.redirectToNextRace();
        clearInterval(this.detailInterval);
        return;
      }
    });
  }

  redirectToNextRace() {
    setTimeout(() => {
      this.xxObserver = this.api.racesNextV2List().subscribe(data => {
        const nedata: any = data;
        const xx = nedata.filter(item => {
          return item.race_identifier === this.raceDataildata.race_identifier;
        });
        const mynextrace = xx;
        this.nextRaceHash = mynextrace[0].race_hash;

        this.notify.error('', 'Not enough players to start, you will be redirected.');
        this.router.navigate(['/race/watch-race-3min/' + this.nextRaceHash]);
      });
    }, 1300);
  }

  startRace() {


    if (this.raceDataildata.is_cancelled === true) {

      this.redirectToNextRace();
      clearInterval(this.detailInterval);
      return;
    }

    clearInterval(this.detailInterval);


    setTimeout(() => {
      this.getRaceData();
    }, 100);

    setTimeout(() => {
      this.getRaceData();
    }, 300);

    setTimeout(() => {
      this.getRaceData();

    }, 500);
    setTimeout(() => {
      this.getRaceData(true);
      this.getRaceDetail();
    }, 800);
    //this.getRaceData();
    if (this.raceDataildata.race_progress < 100) {
      if (this.pageOpen === true) {
        this.moveWheels();
        setTimeout(() => {
          this.semaforsVisible = false;
          this.raceSound = document.createElement('audio');
          this.raceSound.src = './assets/base/sounds/Race.mp3';
          this.raceSound.volume = 0.5;
          if (this.soundEnabled === true) {
            this.raceSound.play();
          }
        }, 1500);

      }

    }

    if (this.beforeSound) {
      this.beforeSound.pause();
      this.beforeSound = null;
    }


    setTimeout(() => {
      this.getUpcoming();
    }, 800);
  }

  moveWheels() {

    this.moveInterval = setInterval(() => {
      if (this.moveNum < 4) {
        this.moveNum++
      } else {
        this.moveNum = 1;
      }
    }, 200);
  }



  getRaceData(repeat?: boolean) {

    this.api.racesStatsList({ raceHash: this.raceId, pageNumber: this.actualPage })
      .subscribe(data => {
        const firstData = data;

        if (data.me !== null) {
          if (data.me.cpr > 4) {
            firstData.race.splice(3, 0, data.me);
          }
        }
        this.raceData = firstData;
        this.getPositionInRace();

        if (data.race_progress > 0) {
          this.raceStarted = true;
        }

        if (data.race_progress > 97 && data.race_progress < 99.98) {
          this.willShoot = true;
          this.willPlayFinishSound = true;
          this.myInterval = 1000;
        }

        if (data.race_progress === 100) {
          this.raceFinished = true;

          clearInterval(this.moveInterval);
          clearInterval(this.detailInterval);

          if (this.raceSound) {
            this.raceSound.pause();
          }

          if (this.willPlayFinishSound === true) {
            this.endSound = document.createElement('audio');
            this.endSound.src = './assets/base/sounds/End.mp3';
            this.endSound.volume = 0.5;
            if (this.soundEnabled === true) {
              console.log('play end');
              this.endSound.play();
            }
          }

          this.moveNum = 0;

          if (this.willShoot === true && this.unitySelected === false) {
            setTimeout(() => { this.shooter(); }, 100);
            setTimeout(() => { this.shooter(); }, 300);
            setTimeout(() => { this.shooter(); this.willShoot = false; }, 450);
          }
          setTimeout(() => {
            if (this.gotWinner === false) {
              this.getRaceWinner();
            }
          }, 1500);

          if (this.raceData.me) {
            this.resolvePosition(this.raceData.me.cpr);
            this.getRandomNum(this.raceData.me.s);
          }


        }
        if (firstData.race_progress > 0 && firstData.race_progress < 100 && repeat === true) {
          setTimeout(() => {
            this.getRaceData(true);
          }, 1000);
        }

        if (this.raceDataildata.my_cars.length > 0 && firstData.race_progress > 0) {
          for (let x = 0; x < this.raceDataildata.my_cars.length; x++) {
            const betix: any = [];
            if (firstData.coins_performance.length > 0) {
              for (let i = 0; i < 20; i++) {
                betix.push({
                  symbol: firstData.coins_performance[i].symbol ? firstData.coins_performance[i].symbol : '',
                  percent: firstData.coins_performance[i].percent,
                  from_price: firstData.coins_performance[i].from_price,
                  to_prices: firstData.coins_performance[i].to_prices,
                  bet: 0
                });

              }
            } else {
              for (let i = 0; i < 3; i++) {
                betix.push({
                  symbol: this.raceDataildata.my_cars[x].b[i].symbol,
                  bet: this.raceDataildata.my_cars[x].b[i].bet
                });

              }
            }

            this.raceDataildata.my_cars[x].betik = betix;
            for (let z = 0; z < 3; z++) {
              for (let y = 0; y < 20; y++) {
                if (this.raceDataildata.my_cars[x].betik[y].symbol === this.raceDataildata.my_cars[x].b[z].symbol) {
                  this.raceDataildata.my_cars[x].betik[y].bet = this.raceDataildata.my_cars[x].b[z].bet;
                }
              }

            }
          }
        }




      });
  }



  whenStarts() {
    const newwhen = this.getWhenStarts();

    const fireSemaforx = (newwhen - 5) * 1000;
    const fireAudience = (newwhen - 11) * 1000;
    const fireStart = newwhen * 1000;
    const closeHint = (newwhen - 6) * 1000;
    if (newwhen > 8) {
      this.showHints = true;
      this.showTourMsg = true;
    }
    setTimeout((
    ) => {
      if (this.pageOpen === true) {
        this.launchSemafor();
      }
    }, fireSemaforx);
    setTimeout((
    ) => {
      if (this.pageOpen === true) {
        this.startRace();
      }
    }, fireStart);
    setTimeout((
    ) => {
      if (this.pageOpen === true) {
        this.showHints = false;
        this.showTourMsg = false;
      }
    }, closeHint);

    setTimeout((
    ) => {
      if (this.soundEnabled === true) {
        this.playBefore();
      }
    }, fireAudience);
  }


  changeBanner() {
    if (this.showBanner === true) {
      this.showBanner = false;
    } else {
      this.showBanner = true;
    }
  }


  getUpcoming() {
    this.upcomingLoaded = false;
    this.api.racesCurrentV2List().subscribe(data => {
      const nedata: any = data;
      const typeNow = this.raceDataildata.race_identifier;
      const pekac = nedata.filter(item => {
        return item.race_identifier === typeNow;
      });
      this.upcoming = pekac[0].finishing_in_seconds;
      this.nextRaceHash = pekac[0].race_hash;
      this.upcomingLoaded = true;
      this.perTourCurrent = data;
    });
  }


  shooter() {
    const obj = document.createElement('audio');
    obj.src = './assets/base/images/camera-shutter-click-08.mp3';
    obj.volume = 0.2;
    obj.play();
    this.shooting = true;
    setTimeout(() => {
      this.shooting = false;
    }, 30 * 2 + 45);
  }


  nextCar() {
    if ((this.raceDataildata.my_cars.length - 1) === this.selectedMyIndex) {
      this.selectedMyIndex = 0;
    } else {
      this.selectedMyIndex++;
    }
  }

  prevCar() {
    if (this.selectedMyIndex === 0) {
      this.selectedMyIndex = (this.raceDataildata.my_cars.length - 1);
    } else {
      this.selectedMyIndex--;
    }
  }

  getRaceWinner() {


    this.getAllv2Races();

  }

  launchSemafor() {
    if (this.raceDataildata.players_count > 1) {
      this.semaforsVisible = true;
      this.semaforsLaunched = true;
      this.firstSemafor = true;
      setTimeout(() => {
        this.playRed();
        this.semaforVal = 4;

      }, 1000);
      setTimeout(() => {
        this.playRed();
        this.semaforVal = 3;

      }, 2000);
      setTimeout(() => {
        this.playRed();
        this.semaforVal = 2;

      }, 3000);
      setTimeout(() => {
        this.playRed();
        this.semaforVal = 1;

      }, 4000);
      setTimeout(() => {
        this.playRed();
        this.semaforVal = 0;

      }, 5000);
      setTimeout(() => {
        this.playGreen();
        this.semaforVal = -1;

        this.startSound = document.createElement('audio');
        this.startSound.src = './assets/base/sounds/Start.mp3';
        if (this.soundEnabled) {
          this.startSound.play();
        }
      }, 5100);
    }
  }

  playRed() {
    const red = document.createElement('audio');
    red.src = './assets/base/sounds/Red.mp3';
    if (this.soundEnabled) {
      red.play();
    }
  }


  playGreen() {
    const green = document.createElement('audio');
    green.src = './assets/base/sounds/Green.mp3';
    if (this.soundEnabled) {
      green.play();
    }
  }

  getMyAffilate() {
    const data = this.identityService.getStorageIdentity();
    const dataDriver = this.identityService.getDriverMe();
    this.myUid = dataDriver.id;

    this.myUsername = data.nickname;
    this.affilateSlug = 'https://play.ioi-game.com/user/referral/' + data.affiliate_slug;
    this.affilateText = 'I play game on play.ioi-game.com every 10mins, so I can win 10 TRX for free ' + this.affilateSlug;

  }




  nextPage() {
    this.actualPage++;
    this.getRaceData();
  }
  prevPage() {
    this.actualPage--;
    this.getRaceData();
  }

  play() {
    /*
    if (window.window.innerWidth < 1028) {
      //return;
    }
    */
    this.router.navigate(['/race/start-race']);
  }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    this.firstLogin = data.is_in_tutorial;


    if (this.firstLogin === true && window.innerWidth > 1024) {
      this.verifyModal = true;
    }
  }

  skipTutorial() {
    this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe(datax => {
      this.identityService.meUpdate();
      localStorage.removeItem('first-race');
      this.verifyModal = false;
    });
  }


  getTickerOnce() {
    this.tickerObservable = this.tcksrvc.tickerPricesRead(1).subscribe(data => {
      this.firstTicker = data.prices;
    });
  }

  repeatSignup() {
    this.repeatDisabled = true;
    const req: RaceSignupV2[] = [];
    for (let i = 0; i < this.raceDataildata.my_cars.length; i++) {

      req.push({
        car: this.raceDataildata.my_cars[i].cid,
        bet_coins: this.raceDataildata.my_cars[i].b,
        race_hash: this.nextRaceHash
      });
    }

    this.xxObserver = this.api.racesMultiSignupCreate(req).subscribe(
      res => this.router.navigate(['/race/watch-race-3min/' + this.nextRaceHash]), // response
      err => console.log(err.error[0].errors[0].race[0] === 'Too late to sign up for this race!' ? this.refireSignup() : null), // error
      () => console.log('HTTP request completed.') // finished
    );


  }
  refireSignup() {
    this.xxObserver = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;
      const xx = nedata.filter(item => {
        return item.race_identifier === this.raceDataildata.race_identifier;
      });
      const mynextrace = xx;
      this.nextRaceHash = mynextrace[0].race_hash;

      this.repeatSignup();
    });
  }

  getMyCars() {
    this.xObserver = this.crsrcvc.carsMineList().subscribe(data => {
      const objs: any = data;
      const haha = objs.sort((a, b) =>
        b.car_id - a.car_id
      );
      haha.reverse();
      const best = haha.length - 1;
      this.mycarNext = haha[best].pk;
    });
  }

  nextMotive() {
    if (this.motiveCurrent < this.myMotives.length - 1) {
      this.motiveCurrent++;
    } else {
      this.motiveCurrent = 0;
    }
    this.getMiniMotive();
  }

  getMiniMotive() {
    this.miniMotivIndex = this.motiveCurrent + 1;
    if (this.miniMotivIndex >= this.myMotives.length) {
      this.miniMotivIndex = 0;
    }
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getAllv2Races() {
    this.nextObservable = this.api.racesNextV2List().subscribe(xdata => {
      const nedata: any = xdata;
      const typeNow = this.raceDataildata.race_identifier;
      const pekac = nedata.filter(item => {
        return item.race_identifier === typeNow;
      });
      this.nextRaceHash = pekac[0].race_hash;
      this.nextStartsIn = pekac[0].starts_in_seconds;

      if (this.raceDataildata.tournament_id !== null && this.raceDataildata.tour_index !== 19) {

        setTimeout(() => {
          this.tourModal = true;
          this.getnexttour();
        }, 2000);
      }

      if (this.raceDataildata.tour_index === 19 || this.raceDataildata.tournament_id === null) {

        setTimeout(() => {
          if (this.cFuelOpen === false) {
            // this.play();
          }

        }, 60000);
      }
      if (this.gotWinner === false) {
        this.gotWinner = true;
        //this.notify.success('info', 'This race is done, win or lose dont miss the next race.');


        this.experience.load((callback: Experience) => {
          this.currentExpLevel = callback.getCurrentExpLevel();
          this.progressBarPercentage = callback.getProgressBarPercentage();
          this.previousLevelExp = callback.getPreviousLevelExp();
          this.nextLevelExp = callback.getNextLevelExp();
        });
        setTimeout(() => {
          this.winnerObservable = this.api.racesWinnerList(this.raceId).subscribe(data => {
            if (data) {
              const x: any = data;
              const dlength = x.length;
              if (this.raceDataildata.tournament_id !== null) {
                if (this.raceDataildata.tour_index > 10 && this.raceDataildata.tour_index < 20) {
                  const loser = this.raceDataildata.tour_index - 10;
                  this.loserIndex = 10 - loser;
                  this.loserCar = this.raceData.cards[this.loserIndex].cid;

                  let notLost = 0;
                  for (let xx = 0; xx < this.loserIndex; xx++) {
                    if (this.raceData.cards[xx].u === this.myUid) {
                      notLost = notLost + 1;
                    }
                  }

                  if (notLost > 0) {
                    this.finishedtour = false;
                  } else {
                    this.finishedtour = true;
                  }
                } else {
                  this.finishedtour = false;
                }
              }

              this.winnersList = x.winners;
              this.frozenTicket = x.ticker_froze;
              this.balanceService.balanceHasbeenChanged();
              this.identityService.updateDriverMe();

              this.showFinalModal = true;
              this.unitySelected = false;
            }
          });

        }, 3000);

        this.drvrsrvc.driversTutorialPartialUpdate(false).subscribe(datax => {
          this.identityService.meUpdate();
          localStorage.removeItem('first-race');
        });

        if (this.raceDataildata.tournament_id !== null && this.raceDataildata.tour_index > 1) {
          this.getLdrv();
        }
      }


    });
  }

  continueTour() {

    this.tourModal = false;
    this.router.navigate(['/race/watch-race-3min/' + this.newNext]);
  }


  getLdrv() {
    this.ldrbrdObserver = this.api.racesTournamentLeaderboardList(
      this.raceDataildata.tournament_id.toString()
    ).subscribe(data => {
      this.ldrbrdpn = data;
    });
  }

  getMotive() {
    if (this.raceDataildata.tour_index !== null) {
      const xx = this.raceDataildata.tour_index - 1;
      const lastone = +xx.toString().split('').pop();
      this.motiveCurrent = lastone;
    } else {
      if (this.raceDataildata.race_identifier.includes('cops')) {
        this.motiveCurrent = 10;
      } else {
        this.motiveCurrent = this.randomInteger(0, 9);
      }

    }

    this.getMiniMotive();
  }

  getnexttour() {

    const stat = [];
    let stat2 = [];
    for (let x = 0; x < this.raceDataildata.my_cars.length; x++) {
      const fake: any = {};
      fake.b = this.raceDataildata.my_cars[x].b,
        fake.c = this.raceDataildata.my_cars[x].c,
        fake.cid = this.raceDataildata.my_cars[x].cid,
        fake.n = this.raceDataildata.my_cars[x].n,
        fake.u = this.raceDataildata.my_cars[x].u,
        stat.push(fake);
    }
    if (this.loserIndex) {

      stat2 = stat.filter(item => {
        return item.cid !== this.loserCar;
      });

    }
    if (stat2.length > 0) {
      this.commonCars = stat2;
    } else {
      this.commonCars = stat;
    }

    this.ntoberver = this.api.racesTournamentNextRaceList(this.raceDataildata.tournament_id.toString()).subscribe(
      data => {
        this.newNext = data.race_hash;
        this.newNextStartsIn = data.starts_in;
        this.redirectNum = this.newNextStartsIn - 15;
        const nozacni = (this.newNextStartsIn - 15) * 1000;
        if (this.raceDataildata.tournament_id !== null && this.raceDataildata.tour_index !== 19) {
          setTimeout(() => {
            if (this.cFuelOpen === false) {
              this.continueTour();
            }
          }, nozacni);
        }

      }
    );
  }


  resolvePosition(pos: number) {
    this.pos1 = '';
    this.pos2 = '';
    this.pos3 = '';
    this.posEnding = '';
    this.positionLength = 0;
    const num = pos.toString();
    let last = this.pos1;
    if (num.length === 1) {
      this.pos1 = num;
      last = this.pos1;
      this.positionLength = 1;
    } else if (num.length === 2) {
      this.positionLength = 2;
      this.pos1 = num.slice(0, 1);
      this.pos2 = num.slice(1, 2);
      last = this.pos2;
    } else if (num.length === 3) {
      this.positionLength = 3;
      this.pos1 = num.slice(0, 1);
      this.pos2 = num.slice(1, 2);
      this.pos3 = num.slice(2, 3);
      last = this.pos3;
    }
    if (last === '1') {
      this.posEnding = 'st';
    } else if (last === '2') {
      this.posEnding = 'nd';
    } else if (last === '3') {
      this.posEnding = 'rd';
    } else {
      this.posEnding = 'th';
    }

    if (num === '11' || num === '12' || num === '13') {
      this.posEnding = 'th';
    }
  }

  setMotive(i) {
    console.log(i);
  }

  refuel() {
    this.router.navigate(['/car/fuel-car/' + this.raceDataildata.race_identifier]);
  }

  getRandomNum(myNum: number) {
    if (myNum > 0) {
      this.scoreOffset = Math.floor(Math.random() * (80 - 50 + 1) + 50);
    } else {
      this.scoreOffset = Math.floor(Math.random() * (50 - 20 + 1) + 20);
    }
  }

  closerefuel() {

    setTimeout(() => {
      this.changeFuel = false;
      this.getnexttour();
    }, 100);
  }

  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList()
      .subscribe(data => {
        this.teamReward = Number(data.team_bonus);;
        this.ioioreward = Number(data.item_bonus);

      });
  }

  convertNumber(num) {
    const x = Number(num);
    return x * 0.05;
  }


  recognizeGame() {
    const man = JSON.parse(localStorage.getItem('useUnity'));
    if (man) {
      this.unitySelected = true;
    } else {
      this.unitySelected = false;
    }
  }


  changeSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      localStorage.setItem('useSound', JSON.stringify(this.soundEnabled))
    } else {
      localStorage.removeItem('useSound');
    }
    this.muteSounds(this.soundEnabled);
  }



  recognizeSound(bool?: any) {
    const man = JSON.parse(localStorage.getItem('useSound'));
    if (man) {
      this.soundEnabled = true;
    } else {
      this.soundEnabled = false;
    }
  }

  muteSounds(bool: boolean) {
    if (bool === false) {
      this.raceSound.pause();
    } else {
      this.raceSound.play();
    }
  }

  playBefore() {
    this.beforeSound = document.createElement('audio');
    this.beforeSound.src = './assets/base/sounds/Before.wav';
    if (this.soundEnabled) {
      this.beforeSound.play();
    }

  }

  resolveBackType() {
    if (this.raceDataildata.race_identifier === 'car_race_ioi_100' || this.raceDataildata.race_identifier === 'car_race_enduro_100' || this.raceDataildata.race_identifier === 'classic_tournament_100') {
      this.backType = 2;
    } else if (this.raceDataildata.race_identifier === 'car_race_ioi_1' || this.raceDataildata.race_identifier === 'car_race_enduro_1') {
      this.backType = 3;
    } else if (this.raceDataildata.race_identifier === 'car_race_ioi_5' || this.raceDataildata.race_identifier === 'car_race_enduro_5' || this.raceDataildata.race_identifier === 'classic_tournament_5') {
      this.backType = 4;
    } else if (this.raceDataildata.race_identifier === 'car_race_ioi_10' || this.raceDataildata.race_identifier === 'car_race_enduro_10' || this.raceDataildata.race_identifier === 'classic_tournament_10') {
      this.backType = 5;
    } else if (this.raceDataildata.race_identifier === 'car_race_ioi_50' || this.raceDataildata.race_identifier === 'car_race_enduro_50') {
      this.backType = 6;
    } else {
      this.backType = 1;
    }
  }

  getPositionInRace() {
    if (this.raceStarted === true) {
      if (this.raceData.race_progress < 60) {
        this.active_area = 0.2;
        this.active_area = this.active_area * this.raceData.race_progress / 60;
      } else {
        this.active_area = 0.2;
      }
    }


    const dummy = [];

    for (let x = 0; x < this.raceData.race.length; x++) {
      dummy.push(this.raceData.race[x].s);
    }

    const find_min = Math.min(...dummy);
    const find_max = Math.max(...dummy);
    let diff = find_max - find_min;
    diff === 0 ? diff = 1 : null;


    for (let x = 0; x < this.raceData.race.length; x++) {
      const relative_score = (this.raceData.race[x].s - find_min) / diff;
      this.raceData.race[x].race_position = 100 * (((this.raceData.race_progress / 100) *
        (1 - this.active_area)) + (relative_score * this.active_area));


    }
  }

  closeInfoModal(myBool: boolean) {
    this.showInfoModal = myBool;
  }

  getWhenStarts() {
    const then: any = new Date(this.raceDataildata.starts_at * 1000);
    const now: any = new Date();
    const diffTime = Math.abs((then - now) / 1000);

    return diffTime;
  }


}
