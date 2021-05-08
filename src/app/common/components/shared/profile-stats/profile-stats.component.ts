import { BalanceService } from './../../../services/balance.service';
import { FavFuel } from './../../../../api/models/fav-fuel';
import { Car } from './../../../../api/models/car';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/user/services/auth.service';
import { AuthService as ninja } from 'src/app/api/services';
import { DriversService } from '../../../../api/services/drivers.service';
import { LeaderboardService, TeamsService, CarsService, AffiliatesService, TickerPricesService } from 'src/app/api/services';
import { Experience, ExperienceService } from 'src/app/common/services/experience.service';
import { AffiliateDetails } from 'src/app/api/models';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
})
export class ProfileStatsComponent implements OnInit, OnDestroy {

  @Output() menuClose = new EventEmitter<boolean>();

  myDriverObserver: Subscription;
  myDriverOldObserver: Subscription;
  myDriverBalanceObserver: Subscription;
  myLdrbrdObserver: Subscription;
  teamsObserver: Subscription;
  tickerSubscription: Subscription;
  myDriverStats: any;
  myAffilate: any;
  myDriverOld: any;
  myDriverBalances: any;
  myLdrbrd: any;
  myTeam: any;
  myAffSlug = 'https://traderacemanager.com/user/referral/';
  profileReady = false;
  isLastMonth = false;
  showEditModal = false;
  showMySettings = false;
  showMyStats = false;
  showAff = false;
  showChat = false;
  myCars: Car[];
  myFavFuels: FavFuel;
  createFavCar = false;
  favCarId: number;
  myCarsIndex = 0;
  assetValue = 0;
  balanceInterval: any;
  balanceUpdateInterval: any;
  cachedLdrbrd: any;
  assetData: any;
  myAffClass = '';
  tickets: number;
  currentExpLevel = 1;
  trnover: number;
  trxUsdt: number;
  isLevel: number;
  showVerified = false;
  activationSent = false;
  Affilate: any;
  affMe: AffiliateDetails;
  maticusdt = 1;
  constructor(private identityService: AuthService, protected api: DriversService,
    protected ldrbrdSrvc: LeaderboardService, protected teamsrvc: TeamsService,
    private carService: CarsService, private balanceService: BalanceService, private experience: ExperienceService,
    private tickService: TickerPricesService, private affService: AffiliatesService, private uapi: ninja) {
      experience.load((data: Experience) => {
        this.currentExpLevel = data.getCurrentExpLevel();
      });
     }

  ngOnInit() {
    this.getMydriver();
    this.getMydriverBalances();
    this.getMyLevel();
    this.getCachedLeaderboard();
    this.getAffilateLink();
    this.getAffilate();
    this.getMyLeaderboard();
    this.getCars();

    this.balanceInterval = setInterval(() => {
      this.getCachedLeaderboard();
      this.getMydriver();
    }, 2000);
    this.balanceInterval = setInterval(() => {
      this.getMydriverBalances();
    }, 10000);

    this.balanceService.balanceChange.subscribe(data => {
      setTimeout(() => {
        this.identityService.updateBalance();
      }, 1000);
      setTimeout(() => {
        this.getMydriverBalances();
      }, 1500);
    });

    const chat = JSON.parse(localStorage.getItem('show-chat'));
    if (chat) {
      this.showChat = true;
    }

  }

  ngOnDestroy() {
    clearInterval(this.balanceInterval);
    clearInterval(this.balanceUpdateInterval);
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
    if (this.myDriverOldObserver) {
      this.myDriverOldObserver.unsubscribe();
    }
    if (this.tickerSubscription) {
      this.tickerSubscription.unsubscribe();
    }
  }

  getMydriver() {
    this.myDriverStats = this.identityService.getDriverMe();
    if (this.myDriverStats === undefined || this.myDriverStats === null) {
      ////this.identityService.logout()();
      return;
    }
    const datax: any = this.myDriverStats;
    if(this.myDriverStats && this.myDriverStats.is_verified === false){
      this.showVerified = true;
    }
    this.tickets = datax.tournament_tickets;
    this.getMyOldDriver();
  }


  getMyOldDriver() {
    this.myDriverOld = this.identityService.getDriverMe();
    if (this.myDriverOld === undefined || this.myDriverOld === null) {
      //this.identityService.logout()();
      return;
    }
  }
  getMyLevel() {
    this.Affilate = this.identityService.getStorageAff();
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    if (this.myDriverBalances.matic_usdt) {
      this.maticusdt = this.myDriverBalances.matic_usdt;
    }
    this.profileReady = true;
  }

  getMyLeaderboard() {
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardMe({
      page: 1, lastMonth: this.isLastMonth
    })
      .subscribe(data => {
        this.myLdrbrd = data;
      });
  }

  getCachedLeaderboard() {
    this.cachedLdrbrd = this.identityService.getLeaderboardMe();
    if (this.cachedLdrbrd === undefined || this.cachedLdrbrd === null) {
      //this.identityService.logout()();
      return;
    }
  }



  logout() {
    //this.identityService.logout()();
  }

  getCars() {
    this.carService.carsMineList().subscribe(
      data => {
        const datax: any = data;
        this.assetData = data;
        this.myCars = datax.cars.sort((a, b) => {
          return a.car_id - b.car_id;
        });
        this.calcCarsValue();
      }
    );
  }


  slideLeftCar() {
    if (this.myCarsIndex > 0) {
      this.myCarsIndex--;
    }
  }
  slideRightCar() {
    if (this.myCarsIndex < this.myCars.length - 3) {
      this.myCarsIndex++;
    }
  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.myAffSlug;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getAffilateLink() {
    const data = this.identityService.getStorageIdentity();

    this.myAffSlug += data.affiliate_slug;

  }

  animateOnClick(){
    this.myAffClass = 'animate';
    setTimeout(() => {
      this.myAffClass = '';
    }, 1000);
  }

  chatMagic() {
    this.showChat = !this.showChat;

    if (this.showChat === true) {
      localStorage.setItem('show-chat', JSON.stringify({
        chat: true
      }));
    } else {
      localStorage.removeItem('show-chat');
    }
  }

  getTicker() {
    this.tickerSubscription = this.tickService.tickerPricesRead(1).subscribe(data => {
      this.trxUsdt = data.prices[9].price;
      localStorage.setItem('trxusdt', JSON.stringify(this.trxUsdt));
    });
  }

  getAffilate() {
    this.affService.affiliatesMe().subscribe(data => {
      this.affMe = data;
    });
  }

  resendActivation() {
    this.uapi.authVerificationCreate().subscribe(data => {
      this.activationSent = true;
    });
  }

  closeMenu(){
    this.menuClose.emit(false);
  }

  calcCarsValue() {
    this.assetValue = this.assetData.garage_value + this.assetData.racers_value;
  }

}
