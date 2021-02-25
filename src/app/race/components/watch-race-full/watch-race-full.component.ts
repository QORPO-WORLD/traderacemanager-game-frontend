import { NextRaceV2 } from './../../../api/models/next-race-v2';
import { CurrentRace } from './../../../api/models/current-race';
import { AuthService } from './../../../user/services/auth.service';
import { RaceSignupV2 } from './../../../api/models/race-signup-v2';

import { RaceStat } from './../../../api/models/race-stat';
import { RaceDetail } from './../../../api/models/race-detail';

import { NotifiqService } from './../../../common/services/notifiq.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RacesService, AffiliatesService, DriversService, TickerPricesService, CarsService } from '../../../api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Experience, ExperienceService } from 'src/app/common/services/experience.service';



//declare let html2canvas: any;
@Component({
  selector: 'app-watch-race-full',
  templateUrl: './watch-race-full.component.html',
  styleUrls: ['./watch-race-full.component.scss']
})
export class WatchRaceFullComponent implements OnInit, OnDestroy {
  raceId: string;
  raceData: RaceStat;
  dataReady = false;
  takeit = true;
  showBanner = false;
  showBet = false;
  showPositions = false;
  interval: any;
  tickinterval: any;
  raceFinished = false;
  youWon = false;
  upcoming: CurrentRace;
  yourNextrace: any;
  shooting = false;
  willShoot = false;
  showAllCoins = false;
  showFinalModal = false;
  showAllResults = false;
  gotWinner = false;
  showChat = false;
  splitNum: number;
  selectedMyIndex = 0;
  actualCarIndex = 0;
  private raceObserver: Subscription;
  winnerObservable: Subscription;
  affilateObservable: Subscription;
  nextObservable: Subscription;
  detailObservable: Subscription;
  tickerObservable: Subscription;
  firstObservable: Subscription;
  currentObs: Subscription;
  winnersList = [];
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
  nextRacesData: NextRaceV2;
  myInterval = 3000;
  detailInterval: any;
  raceDataildata: RaceDetail;
  myUid = 'not-me';
  initialCars: any;
  ticker: any = [];
  currentLap: number;
  currentLapBg = 0;
  etapTunnel = false;
  etapTunnelActive = false;
  repoUrl = 'https://beta.ioi-game.com';
  isPlaying = false;
  canPlay = true;
  showHints = false;
  sound: any;
  musicInterval: any;
  firstTicker: any;
  firstStatsTicker: any = [];
  pageOpen = true;
  mycarNext: any;
  xObserver: Subscription;
  xxObserver: Subscription;
  nextRaceHash: string;
  loserIndex: number;
  newNext: string;
  endsIn: number;
  topPlaySelect = false;
  positionLength = 1;
  pos1: string;
  pos2: string;
  pos3: string;
  posEnding: string;
  numbers = [];
  frozenTicket: boolean;
  reverse = true;
  currentExpLevel: number;
  progressBarPercentage
  previousLevelExp:number;
  nextLevelExp:number;

  constructor(private router: Router, protected api: RacesService, protected route: ActivatedRoute,
    private notify: NotifiqService, protected drvrsrvc: DriversService, private actv: ActivatedRoute,
    private tcksrvc: TickerPricesService, private crsrcvc: CarsService, private identityService: AuthService,
    private experience: ExperienceService) {
    this.raceId = this.actv.snapshot.paramMap.get('id');


  }

  ngOnInit() {
    this.getTickerOnce();
    setTimeout(() => {
      this.firstObservable = this.api.racesDetailList({ raceHash: this.raceId, pageNumber: this.actualPage }).subscribe(data => {
        this.raceDataildata = data;
        this.endsIn = data.ends_in;
        this.getAllv2Races();
        if (data.is_cancelled === true) {
          this.router.navigate(['/race/start-race']);
        }
        if (data.race_progress > 0) {
          this.startRace();
        } else {
          if (this.startsInChecked === false) {
            this.startsIn = data.starts_in;
            this.whenStarts();
          }
        }
      });
    }, 20);
    setTimeout(() => { this.getRaceData(); }, 50);
    this.detailInterval = setInterval(() => {
      this.getRaceDetail();
    }, 7000);
    this.getUpcoming();

    this.getMyCars();
  }

  routerOnActivate() {

  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    clearInterval(this.detailInterval);
    if (this.sound) {
      this.sound.pause();
    }
    clearInterval(this.musicInterval);
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
    if (this.currentObs) {
      this.currentObs.unsubscribe();
    }
    if (this.xObserver) {
      this.xObserver.unsubscribe();
    }
    if (this.xxObserver) {
      this.xxObserver.unsubscribe();
    }
    clearInterval(this.interval);
    clearInterval(this.detailInterval);
    if (this.sound) {
      this.sound.pause();
    }
    clearInterval(this.musicInterval);
    this.pageOpen = false;
  }

  getRaceDetail() {
    this.firstObservable = this.api.racesDetailList({ raceHash: this.raceId, pageNumber: this.actualPage }).subscribe(data => {
      const retype: any = data;
      this.raceDataildata = retype;
      if (data.is_cancelled === true) {
        this.router.navigate(['/race/start-race']);
      }
    });
  }


  getStartCoins() {
    this.firstObservable = this.api.racesDetailList({ raceHash: this.raceId, pageNumber: this.actualPage }).subscribe(data => {
      const retype: any = data;
      this.firstStatsTicker = retype.start_coins_price;
    });
  }

  startRace() {

    this.getRaceData();


    if (this.raceDataildata.players_count > 1) {
      clearInterval(this.detailInterval);
      this.interval = setInterval(() => {
        this.getRaceData();
      }, 1500);
      this.tickinterval = setInterval(() => {
        this.getTicker();
      }, 3000);
      setTimeout(() => {
        if (this.pageOpen === true) {
          this.semaforsVisible = false;
        }
      }, 1000);

      this.semaforsVisible = false;
      this.raceStarted = true;
      this.getUpcoming();


      setTimeout(() => {
        this.getStartCoins();
      }, 2000);

    }
  }

  getRaceData() {
    const that = this;
    this.api.racesStatsList({ raceHash: this.raceId, pageNumber: this.actualPage })
      .subscribe(data => {
        const firstData = data;
        if (data.me !== null) {
          if (data.me.cpr > 4) {
            firstData.race.splice(3, 0, data.me);
          }
        }
        this.raceData = data;
        if (this.raceData.me) { this.resolvePosition(this.raceData.me.cpr) };
        const currLap = Math.round(this.raceData.race_progress);
        this.currentLapBg = (currLap / 100) * 12;

        if (data.race_progress > 0) {
          this.raceStarted = true;
        }
        if (data.race_progress > 97 && data.race_progress < 99.98) {
          this.willShoot = true;
        }
        if (data.race_progress >= 100) {
          this.raceFinished = true;
          clearInterval(this.interval);
          if (this.willShoot === true) {
            setTimeout(() => { that.shooter(); }, 100);
            setTimeout(() => { that.shooter(); }, 300);
            setTimeout(() => { that.shooter(); that.willShoot = false; }, 450);
          }
          setTimeout(() => {
            that.getRaceWinner();
          }, 1500);
        }
        this.getCurrentLap();
      });

  }


  getEtape() {
    if (this.raceData.race_progress > 0 && this.etapTunnelActive === false) {
      const that = this;
      setTimeout(() => {
        that.etapTunnel = true;
      }, 100);
      setTimeout(() => {
        that.etapTunnelActive = true;
      }, 1000);

      setTimeout(() => {
        that.etapTunnelActive = false;
        that.etapTunnel = false;

      }, 9000);
    }
  }

  getCurrentLap() {
    const current = Math.round((this.raceData.race_progress / 100) * 12);
    this.currentLap = current;

    if (this.currentLap > this.currentLapBg && this.raceData.race_progress < 100) {
      this.currentLapBg++;
      this.getEtape();
    }
  }



  getTicker() {
    this.tickerObservable = this.tcksrvc.tickerPricesRead(1).subscribe(
      data => {
        this.ticker = data.prices;
      }
    );
  }

  whenStarts() {
    const fireSemaforx = (this.startsIn - 3) * 1000;
    const fireStart = this.startsIn * 1000;
    const closeHint = (this.startsIn - 4) * 1000;
    if (this.startsIn > 8) {
      this.showHints = true;
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
      }
    }, closeHint);

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

      const pekac = nedata.filter(item => {
        return item.race_type === 'car_race_24hrs';
      });
      this.upcoming = pekac[0].finishing_in_seconds;
      this.upcomingLoaded = true;
    });
  }


  shooter() {
    const obj = document.createElement('audio');
    obj.src = './assets/base/images/camera-shutter-click-08.mp3';
    obj.volume = 0.2;
    obj.play();
    this.shooting = true;
    const that = this;
    setTimeout(() => {
      that.shooting = false;
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

    const that = this;
    setTimeout(() => {
      that.winnerObservable = that.api.racesWinnerList(that.raceId).subscribe(data => {
        const datax: any = data;
        that.winnersList = datax.winners;
        this.frozenTicket = datax.ticker_froze;
        that.showFinalModal = true;
      });
      that.gotWinner = true;

      this.experience.load((callback: Experience) => {
        this.currentExpLevel = callback.getCurrentExpLevel();
        this.progressBarPercentage = callback.getProgressBarPercentage();
        this.previousLevelExp = callback.getPreviousLevelExp();
        this.nextLevelExp = callback.getNextLevelExp();
      });

      //this.notify.success('info', 'This race is done, win or lose dont miss the next race.');
    }, 2000);


    this.getMyAffilate();
  }

  launchSemafor() {
    if (this.raceDataildata.players_count > 1) {
      this.semaforsVisible = true;
      this.semaforsLaunched = true;
      this.firstSemafor = true;
      setTimeout(() => {
        this.firstSemafor = false;
        this.secondSemafor = true;
      }, 1000);
      setTimeout(() => {
        this.secondSemafor = false;
        this.thirdSemafor = true;
      }, 2000);
      setTimeout(() => {
        //this.thirdSemafor = false;
      }, 3000);
    }
  }

  getMyAffilate() {
    const data = this.identityService.getStorageIdentity(); this.myUid = data.id;
    this.affilateSlug = 'https://beta.ioi-game.com/user/referral/' + data.affiliate_slug;

  }

  nextPage() {
    this.actualPage++;
    this.getRaceData();
  }
  prevPage() {
    this.actualPage--;
    this.getRaceData();
  }

  letsPlay() {
    const obj = document.createElement('audio');
    obj.src = './assets/base/images/start1.wav';
    obj.volume = 0.3;
    obj.play();
    this.router.navigate(['/race/start-race']);
  }




  getTickerOnce() {
    this.tickerObservable = this.tcksrvc.tickerPricesRead(1).subscribe(data => {
      this.firstTicker = data.prices;
    });
  }

  repeatSignup() {
    const req: RaceSignupV2[] = [];
    for (let i = 0; i < this.raceDataildata.my_cars.length; i++) {

      req.push({
        car: this.raceDataildata.my_cars[i].cid,
        bet_coins: this.raceDataildata.my_cars[i].b,
        race_hash: this.nextRaceHash
      });
    }

    this.xxObserver = this.api.racesMultiSignupCreate(req).subscribe(
      data => {

      }
    );
    this.router.navigate(['/race/watch-race-3min/' + this.nextRaceHash]);
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

  scrollToPlay(elem1: HTMLElement, road: HTMLElement, align: any) {
    if (elem1.classList[0] === 'car_rc_time') {
      if (this.showBet === false) {
        road.scrollIntoView({ behavior: 'smooth' });
      } else {
        setTimeout(() =>
          elem1.scrollIntoView({ behavior: 'smooth', block: align })
          , 150);
      }
    } else {
      if (this.showPositions === false) {
        road.scrollIntoView({ behavior: 'smooth' });
      } else {
        setTimeout(() =>
          elem1.scrollIntoView({ behavior: 'smooth', block: align })
          , 200);
      }
    }
  }


  getAllv2Races() {
    this.nextObservable = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;
      const typeNow = this.raceDataildata.race_type;
      const pekac = nedata.filter(item => {
        return item.bet_amount === typeNow;
      });
      this.nextRaceHash = pekac[0].race_hash;
    });
  }

  play() {
    this.router.navigate(['/race/start-race']);
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

}



