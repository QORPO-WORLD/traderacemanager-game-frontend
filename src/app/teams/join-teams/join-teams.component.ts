import { AuthService } from "./../../user/services/auth.service";
import { RewardsService, LeaderboardService } from "src/app/api/services";
import { BalanceService } from "./../../common/services/balance.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../common/services/notifiq.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { TeamsService } from "../../api/services/teams.service";
import { DriversService } from "../../api/services/drivers.service";
import { timelineEnd } from "console";

@Component({
  selector: "app-join-teams",
  templateUrl: "./join-teams.component.html",
  styleUrls: ["./join-teams.component.scss"],
})
export class JoinTeamsComponent implements OnInit, OnDestroy {
  typeObserver: Subscription;
  teams: any;
  myTeam: string;
  myTeamData: any;
  teamSubscription: Subscription;
  transObserver: Subscription;
  historyObserver: Subscription;
  mySettings = { type: "team", numOfBanners: 2 };
  joinFree = false;
  teamreward: any;
  currMonth: number;
  showInfoBubble = false;
  allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthCount = 1;
  teamOption = 1;
  offerState = 1;
  startNow = false;
  myTeamReward: any;
  offerInterval: any;
  myRewards: any;
  ioioreward: number;
  myDriverStats: any;
  myMembEnd: any;
  myTeamAllData: any;
  historyPoints: any;
  @ViewChild("teamSelection") teamSelection: any;
  discount: any;
  constructor(
    protected api: TeamsService,
    protected notify: NotifiqService,
    protected driversApi: DriversService,
    private balanceService: BalanceService,
    private rapi: RewardsService,
    private identityService: AuthService,
    private lapi: LeaderboardService
  ) {}

  ngOnInit(): void {
    this.getRewards();
    this.getMyTeamReward();
    this.getAllRewards();
    this.getMydriver();
  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
    if (this.historyObserver) {
      this.historyObserver.unsubscribe();
    }
    clearInterval(this.offerInterval);
  }

  getRewards() {
    this.rapi.rewardsList().subscribe((data) => {
      this.teamreward = data.team_bonus;
    });
  }

  getMyTeamReward() {
    this.teamSubscription = this.lapi
      .leaderboardTeamInternalList()
      .subscribe((data) => {
        this.myTeamAllData = data;
        this.myTeamReward = data.team_bonus;
      });
  }

  getAllRewards() {
    this.transObserver = this.rapi.rewardsList().subscribe((data) => {
      this.myRewards = data;
      this.ioioreward = Number(data.team_bonus);
    });
  }
  getHistoryPoints() {
    this.historyObserver = this.api.getTeamHistoryPoints().subscribe((data) => {
      this.historyPoints = data;
    });
  }

  getMydriver() {
    setTimeout(() => {
      this.myDriverStats = this.identityService.getStorageIdentity();
    }, 500);
  }

  changeOffer() {
    if (this.offerState === 1) {
      this.offerState = 2;
    } else {
      this.offerState = 1;
    }
  }
  getPremium() {
    this.teamSelection.openMembershipModal(
      1,
      this.myDriverStats.next_month_team_id
    );
  }

  getMembEnd(event: any) {
    this.myMembEnd = event;
    this.myMembEnd = this.myMembEnd.replace(" ", "T");
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
