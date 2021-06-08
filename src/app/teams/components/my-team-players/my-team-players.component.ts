import { AuthService } from "src/app/user/services/auth.service";
import { PlayerLeaderboard } from "./../../../api/models/player-leaderboard";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DriversService, LeaderboardService } from "src/app/api/services";

@Component({
  selector: "app-my-team-players",
  templateUrl: "./my-team-players.component.html",
  styleUrls: ["./my-team-players.component.scss"],
})
export class MyTeamPlayersComponent implements OnInit, OnDestroy {
  @Input() players: PlayerLeaderboard[];
  @Input() mr: any;
  @Input() payouts: any;
  @Input() mrp: any;
  //myLdrbrd: any;
  mydrvr: any;
  display = window.innerWidth;
  myStatData: any;
  myTeamName: any;
  myLdrbrdObserver: Subscription;
  drSubscription: Subscription;
  actualPage = 1;
  teamId: number;
  slice1: number;
  slice2: number;
  slice3: number;
  slice4: number;
  slice5: number;
  position: number = 1;
  sliceNums = {
    0: 3,
    1: 3,
    2: 3,
    3: 3,
    4: 3,
  };
  myLdrbrd: Array<object> = [
    {
      position: 1,
      team_name:  "BTC",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 2,
      team_name:  "IOI",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 3,
      team_name:  "ALT",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 4,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 5,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 6,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 7,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 8,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 9,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    },
    {
      position: 10,
      team_name:  "TRX",
      team_turnover: 10000,
      team_potentional_win: 100
    }
  ];
  constructor(
    protected ldrbrdSrvc: LeaderboardService,
    private drvrsrvc: DriversService,
    private identityService: AuthService
  ) {}

  ngOnInit() {
    // this.getMyDriver();
    //this.getMyLeaderboard();
    this.getMyTeam();
    this.getMyLeaderboard();
    this.width();
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
    // this.myLdrbrdObserver = this.ldrbrdSrvc
    //   .leaderboardTeamList({
    //     page: 1,
    //     lastMonth: false
    //   })
    //   .subscribe((data) => {
    //     this.myLdrbrd = data;
    //   });

  }

  width() {
    this.display = window.innerWidth;
  }
  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;
  }

  getMyTeam() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
    this.myTeamName = data.team_name;
    this.getteamStats();
  }

  getteamStats() {
    this.ldrbrdSrvc.leaderboardTeamOverall(1).subscribe((data) => {
      this.myStatData = data;
    });
  }

  

}
