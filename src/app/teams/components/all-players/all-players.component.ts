import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.scss'],
})
export class AllPlayersComponent implements OnInit {
  players: PlayerLeaderboard[];
  myLdrbrd: any;
  mydrvr: any;
  myLdrbrdObserver: Subscription;
  drSubscription: Subscription;
  actualPage = 1;
  totalPages: number;
  mydrvrData: any;
  cachedLdrbrd: any;
  isPageWithMe= false;
  constructor(protected ldrbrdSrvc: LeaderboardService, private drvrsrvc: DriversService,
  private identityService: AuthService) { }

  ngOnInit() {
    this.getMyDriver();
    this.getMyLeaderboard();
    this.getCachedLeaderboard();
  }

  ngOnDestroy() {
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.drSubscription) {
      this.drSubscription.unsubscribe();
    }
  }

  getMyLeaderboard() {
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardPlayerList({
      page: this.actualPage, lastMonth: false
    })
      .subscribe(datax => {
        const data: any = datax;
        this.players = data.results;
        this.totalPages = data.totalPages;
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
    this.getMyLeaderboard();
  }
  prevPage() {
    this.actualPage--;
    this.getMyLeaderboard();
  }

  isMePage(){
    this.isPageWithMe=false;
    this.players.forEach(element => {
      if(element.user_nickname==this.mydrvrData.nickname){
        this.isPageWithMe=true;
      }
    });
  }
}
