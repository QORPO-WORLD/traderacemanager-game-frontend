import { AuthService } from "src/app/user/services/auth.service";
import { PlayerLeaderboard } from "./../../api/models/player-leaderboard";
import { InternalTeamLeaderboard } from "./../../api/models/internal-team-leaderboard";
import {
  AffiliatesService,
  DriversService,
  LeaderboardService,
  RewardsService,
} from "src/app/api/services";
import { NotifiqService } from "./../../common/services/notifiq.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  leaderboardType = "players";
  teamSubscription: Subscription;
  ldbrdSubscription: Subscription;
  drSubscription: Subscription;
  afSubscription: Subscription;
  transObserver: Subscription;
  myTeam: InternalTeamLeaderboard;
  myLdrbrd: any;
  is24race = false;
  isLastMonth = false;
  mydrvr: any;
  teamreward: any;
  myAffilate: any;
  myTeamReward: number;
  constructor(
    private api: LeaderboardService,
    private drvrsrvc: DriversService,
    private affisrvc: AffiliatesService,
    private router: Router,
    protected notify: NotifiqService,
    private identityService: AuthService,
    private rapi: RewardsService,
    private lapi: LeaderboardService
  ) {}

  ngOnInit() {
    this.getMyTem();
    this.getMyLdrbrd();
    this.getMyDriver();
    this.getMyLevel();
    this.getRewards();
    this.getAllRewards();
  }

  getAllRewards() {
    this.transObserver = this.rapi.rewardsList().subscribe((data) => {
      this.myTeamReward = Number(data.team_bonus);
    });
  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.ldbrdSubscription) {
      this.ldbrdSubscription.unsubscribe();
    }
    if (this.drSubscription) {
      this.drSubscription.unsubscribe();
    }
    if (this.afSubscription) {
      this.afSubscription.unsubscribe();
    }
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
  }

  getMyTem() {
    this.teamSubscription = this.api
      .leaderboardTeamInternalList()
      .subscribe((data) => {
        this.myTeam = data;
        console.log(data);
        this.redirectMe();
      });
  }

  getMyLdrbrd() {
    this.ldbrdSubscription = this.api
      .leaderboardMe({
        page: 1,
        lastMonth: this.isLastMonth,
      })
      .subscribe((data) => {
        this.myLdrbrd = data;
      });
  }

  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;
  }

  getMyLevel() {
    const data = this.identityService.getDriverMe();
    this.myAffilate = data;
  }

  redirectMe() {
    if (this.myTeam === null) {
      this.router.navigate(["/teams/join-teams"]);
      this.notify.success("", "first_join", 3000);
    }
  }

  getRewards() {
    this.rapi.rewardsList().subscribe((data) => {
      this.teamreward = data.team_bonus;
    });
  }
}
