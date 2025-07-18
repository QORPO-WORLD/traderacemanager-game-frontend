import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-owner-leaderboard',
  templateUrl: './owner-leaderboard.component.html',
  styleUrls: ['./owner-leaderboard.component.scss'],
})
export class OwnerLeaderboardComponent implements OnInit {

  @Input() players: PlayerLeaderboard[];
  @Input() mr: any;
  @Input() mrp: any;
  myLdrbrd: any;
  mydrvr: any;
  myLdrbrdObserver: Subscription;
  drSubscription: Subscription;
  actualPage = 1;
  totalPages: number;
  updateTime: string;
  isPageWithMe = false;
  constructor(protected ldrbrdSrvc: LeaderboardService, private drvrsrvc: DriversService,
  private identityService: AuthService) { }

  ngOnInit() {
    this.getMyDriver();
    this.getMyLeaderboard();
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
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardOwnersList({
      page: this.actualPage
    })
      .subscribe(datax => {
        const data: any = datax;
        this.myLdrbrd = data.results;
        this.totalPages = data.total_pages;
        this.updateTime = data.last_update_at;
        this.updateTime = this.updateTime.replace(' ', 'T');

        this.isMePage();
      });
  }

  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;

  }

  isMePage() {
    this.isPageWithMe = false;
    this.myLdrbrd.forEach(element => {
      if (element.user_nickname === this.mydrvr) {
        this.isPageWithMe = true;
      }
    });
  }

}
