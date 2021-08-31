import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NotifiqService } from "./../../services/notifiq.service";
import { TeamsService } from "../../../api/services/teams.service";
import { AuthService } from "../../../user/services/auth.service";
import { BalanceService } from "../../../common/services/balance.service";

declare let ga: any;
declare let gtag: any;

@Component({
  selector: "app-team-membership",
  templateUrl: "./team-membership.component.html",
  styleUrls: ["./team-membership.component.scss"],
})
export class TeamMembershipComponent implements OnInit {
  accountInfo: any;
  selectedTeam = [];
  selectedMembership = "premium";
  teams: any;
  animation = 1;
  timeoutPrev: any;
  timeoutNext: any;
  myTeam = [];
  myTeamData: any;
  joinFree = false;
  currMonth: number;
  monthCount = 1;
  teamOption = 1;
  startNow = false;
  myDriverStats: any;
  discount: any;
  myMembEnd: any;
  teamMembEnd: any;
  myBrowser: any;
  @Input() monthlyPrice = 50;
  @Input() quarterlyPrice = 135;
  @Input() yearlyPrice = 420;
  @Input() selectedTeamId = 1;
  @Output() openedModal = new EventEmitter<number>();

  constructor(
    public router: Router,
    protected api: TeamsService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    protected notify: NotifiqService
  ) {}

  ngOnInit() {
    this.getDiscount();

    this.accountInfo = this.identityService.getDriverMe();
    this.getTeams();
  }

  getDiscount() {
    this.api.teamsList().subscribe((data) => {
      const datax: any = data;
      this.discount = datax.discount[0];
    });
  }
  back() {
    this.animation = 2;
    this.timeoutPrev = setTimeout(() => {
      this.openedModal.emit(0);
      this.timeoutReset();
    }, 300);
  }

  timeoutReset() {
    clearTimeout(this.timeoutNext);
    clearTimeout(this.timeoutPrev);
  }

  joinTeam(teamId: number) {
    this.api
      .teamsJoinCreate({
        join_team_id: teamId,
        join_paid_membership: true,
        month_count: this.monthCount,
        join_now: this.startNow,
      })
      .subscribe((data) => {
        this.notifyChangedBalance();

        let gaMonthCount = "one month";
        if (this.monthCount === 1) {
          gtag("event", "conversion", {
            send_to: "AW-580556065/7WI1CICqmN8CEKGq6pQC",
            value: this.monthlyPrice,
            currency: "USD",
            transaction_id: "",
          });
        } else if (this.monthCount === 3) {
          gaMonthCount = "three month";
          gtag("event", "conversion", {
            send_to: "AW-580556065/MlkaCIHbmN8CEKGq6pQC",
            value: this.quarterlyPrice,
            currency: "USD",
            transaction_id: "",
          });
        } else if (this.monthCount === 12) {
          gaMonthCount = "one year";
          gtag("event", "conversion", {
            send_to: "AW-580556065/KA9sCLjomN8CEKGq6pQC",
            value: this.yearlyPrice,
            currency: "USD",
            transaction_id: "",
          });
        }
        ga("event", "buy_premium_account", {
          eventCategory: "buy_premium_account",
          eventAction: gaMonthCount,
        });

        setTimeout(() => {
          this.identityService.updateLeaderboardMe();
          this.identityService.updateDriverMe();
          this.getMydriver();
          this.getMyTeam();
          this.notify.error("sucess", "You are now part of the team!");
          this.back();
        }, 100);
      });
  }
  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeam = data.team;
    this.getTeams();
    this.myTeamData = data;
  }
  getTeams() {
    this.api.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.teams = data.results;
      this.myTeam = this.teams.filter(
        (item) => item.name === this.accountInfo.team
      );
      this.selectedTeam = this.teams.filter(
        (item) => item.id === this.selectedTeamId
      );
      this.getMembEndSafari();
      this.reorderTeams();
    });
  }
  reorderTeams() {
    let helper = [...this.teams];
    let specificItem = helper.filter((item) => item.name === "TRADER");
    if (specificItem !== undefined) {
      let firstTwo = helper.splice(0, 2);
      helper = helper.filter((item) => item.name !== "TRADER");
      this.teams = [...firstTwo, ...specificItem, ...helper];
    }
  }

  joinTeamFree(teamId: number) {
    this.api
      .teamsJoinCreate({
        join_team_id: teamId,
        join_paid_membership: false,
        month_count: this.monthCount,
        join_now: this.startNow,
      })
      .subscribe((data) => {
        setTimeout(() => {
          this.identityService.updateLeaderboardMe();
          this.identityService.updateDriverMe();
          this.getMydriver();
          this.getMyTeam();
          this.back();
        }, 100);
      });
  }

  notifyChangedBalance() {
    this.balanceService.balanceHasbeenChanged();
  }

  resolveJoin(teamId: number) {
    if (this.joinFree === false) {
      this.joinTeam(teamId);
    } else {
      this.joinTeamFree(teamId);
    }
  }

  getCurrentMonth() {
    let month = new Date().getMonth();
    month++;
    if (month === 12) {
      this.currMonth = 0;
    } else {
      this.currMonth = month;
    }
  }

  getMydriver() {
    setTimeout(() => {
      this.myDriverStats = this.identityService.getStorageIdentity();
    }, 500);
  }

  getMembEndSafari() {
    this.myMembEnd = this.selectedTeam[0].last_membership_ends_at.replace(
      " ",
      "T"
    );
    this.teamMembEnd = this.myTeam[0].memberships[0].date_to.replace(" ", "T");
  }
}
