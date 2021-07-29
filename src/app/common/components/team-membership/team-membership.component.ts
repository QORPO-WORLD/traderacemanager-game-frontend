import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NotifiqService } from "./../../services/notifiq.service";
import { TeamsService } from "../../../api/services/teams.service";
import { AuthService } from "../../../user/services/auth.service";
import { BalanceService } from "../../../common/services/balance.service";

@Component({
  selector: "app-team-membership",
  templateUrl: "./team-membership.component.html",
  styleUrls: ["./team-membership.component.scss"],
})
export class TeamMembershipComponent implements OnInit {
  ň;
  selectedTeam = [];
  selectedMembership = "premium";
  teams: any;
  animation = 1;
  timeoutPrev: any;
  timeoutNext: any;
  myTeam: string;
  myTeamData: any;
  joinFree = false;
  currMonth: number;
  monthCount = 1;
  teamOption = 1;
  startNow = false;
  myDriverStats: any;
  discount: any;
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
      this.reorderTeams();
      this.selectedTeam = this.teams;
      this.selectedTeam = this.selectedTeam.filter(
        (item) => item.id === this.selectedTeamId
      );
      console.log(this.selectedTeam);
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
}
