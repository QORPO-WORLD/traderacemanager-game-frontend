import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-my-team-players',
  templateUrl: './my-team-players.component.html',
  styleUrls: ['./my-team-players.component.scss'],
})
export class MyTeamPlayersComponent implements OnInit, OnDestroy {
  @Input() players: PlayerLeaderboard[];
  @Input() mr: any;
  @Input() payouts: any;
  @Input() mrp: any;
  myLdrbrd: any;
  mydrvr: any;
  myStatData: any;
  myLdrbrdObserver: Subscription;
  drSubscription: Subscription;
  teamId: number;
  slice1: number;
  slice2: number;
  slice3: number;
  slice4: number;
  slice5: number;
  sliceNums = {
    0: 3,
    1: 3,
    2: 3,
    3: 3,
    4: 3
  }
  constructor(protected ldrbrdSrvc: LeaderboardService, private drvrsrvc: DriversService,
  private identityService: AuthService) { }

  ngOnInit() {
   // this.getMyDriver();
    //this.getMyLeaderboard();
    this.getMyTeam();
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
  

  getMyTeam() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
    this.getteamStats();
  }

  getteamStats() {
    this.ldrbrdSrvc.leaderboardTeamOverall(1)
    .subscribe(data => {
      console.log(data);
      this.myStatData = data;

    });
  }

}
