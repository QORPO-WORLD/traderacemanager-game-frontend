import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-special-leaderboard',
  templateUrl: './special-leaderboard.component.html',
  styleUrls: ['./special-leaderboard.component.scss'],
})
export class SpecialLeaderboardComponent implements OnInit {

  players: PlayerLeaderboard[];
  myLdrbrd: any;
  mydrvr: any;
  myLdrbrdObserver: Subscription;
  drSubscription: Subscription;
  actualPage = 1;
  totalPages: number;
  mydrvrData: any;
  cachedLdrbrd: any;
  Affiliate: any;
  isPageWithMe = false;
  updateTime: string;
  rewards = [300,200,130,100,70,60,50,40,30,20]
  constructor(protected ldrbrdSrvc: LeaderboardService, private drvrsrvc: DriversService,
    private identityService: AuthService) { }

  ngOnInit() {
    this.getMyDriver();
    this.getCachedLeaderboard();
    this.getMyLevel();
    this.getSpecialLeaderboard();
  }

  ngOnDestroy() {
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.drSubscription) {
      this.drSubscription.unsubscribe();
    }
  }

  getSpecialLeaderboard() {
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardSpecialList({
      page: this.actualPage, lastMonth: false
    })
      .subscribe(datax => {
        const data: any = datax;
        this.players = data.results;
        this.totalPages = data.total_pages;
        this.updateTime = data.last_update_at;
        this.updateTime = this.updateTime.replace(' ', 'T');
        console.log(data);
        this.isMePage();
      });
  }

  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;
    this.mydrvrData = data;
  }

  getCachedLeaderboard() {
    this.cachedLdrbrd = this.identityService.getLeaderboardMe();
    if (this.cachedLdrbrd === undefined || this.cachedLdrbrd === null) {
      //this.identityService.logout()();
      return;
    }
  }

  nextPage() {
    this.actualPage++;
    this.getSpecialLeaderboard();
  }
  prevPage() {
    this.actualPage--;
    this.getSpecialLeaderboard();
  }

  isMePage() {
    this.isPageWithMe = false;
    this.players.forEach(element => {
      if (element.user_nickname === this.mydrvrData.nickname) {
        this.isPageWithMe = true;
      }
    });
  }
  getMyLevel() {
    this.Affiliate = this.identityService.getStorageAff();
    console.log(this.Affiliate);
  }

}
