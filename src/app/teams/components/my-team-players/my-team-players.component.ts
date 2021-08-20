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
  rewards: any;
  teamId: number;
  slice1: number;
  slice2: number;
  slice3: number;
  slice4: number;
  slice5: number;
  totalPages = 1;
  position: number = 1;
  isLastMonth = false;
  sliceNums = {
    0: 3,
    1: 3,
    2: 3,
    3: 3,
    4: 3,
  };
  myLdrbrd: any;
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
    this.myLdrbrdObserver = this.ldrbrdSrvc
      .leaderboardTeamList({
        page: this.actualPage,
        lastMonth: this.isLastMonth
      })
      .subscribe((data) => {
        this.myLdrbrd = data['results'];
        this.rewards = data['applicable_team_bonuses'];
        console.log(this.myLdrbrd);
        this.totalPages = data['total_pages'];
      });
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

  setLastMonth(isLast: boolean) {
    this.isLastMonth = isLast;
    this.getMyLeaderboard();
  }

}
