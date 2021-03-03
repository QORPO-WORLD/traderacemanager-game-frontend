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
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardMe({
      page: 1, lastMonth: false
    })
      .subscribe(data => {
        this.myLdrbrd = data;

      });
  }

  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;

  }

}
