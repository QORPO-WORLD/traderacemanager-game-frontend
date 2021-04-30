import { NotifiqService } from "./../../services/notifiq.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TeamsService } from "../../../api/services/teams.service";
import { AuthService } from "../../../user/services/auth.service";
import { BalanceService } from "../../../common/services/balance.service";

@Component({
  selector: "app-teams-selection",
  templateUrl: "./teams-selection.component.html",
  styleUrls: ["./teams-selection.component.scss"],
})
export class TeamsSelectionComponent implements OnInit {
  @Input() modalVersion = false;
  @Output() modalOpen = new EventEmitter<boolean>();
  teams: any;
  myTeam: string;
  myTeamData: any;
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
  startNow = false;
  myDriverStats: any;
  ownerIndex = 0;
  animationState = 0;
  startTeamIndex = 0;
  sliceBalancer = 3;
  myWW = 1920;
  selectedTeamId = 1;

  constructor(
    protected api: TeamsService,
    private identityService: AuthService,
    private balanceService: BalanceService,
    protected notify: NotifiqService
  ) {
    this.width();
  }

  ngOnInit() {
    this.getMyTeam();
    this.getCurrentMonth();
    this.getMydriver();
  }

  width() {
    this.myWW = window.innerWidth;
    if (this.myWW <= 640) {
      this.sliceBalancer = 1;
    } else {
      this.sliceBalancer = 3;
    }
  }

  getTeams() {
    this.api.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.teams = data.results;
    });
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeam = data.team;
    this.getTeams();
    this.myTeamData = data;
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
          this.notify.error(
            "sucess",
            "Thank you for your interest! You will be part of the team from"
          );
        }, 100);
      });
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
          console.log(teamId);
          if (this.modalVersion === true) {
            this.closeModal();
          }
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
      console.log(this.myDriverStats);
    }, 500);
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  animateTeam(id: number) {
    this.animationState = id;
    setTimeout(() => {
      this.joinTeamFree(id);
    }, 2200);
  }

  nextTeam() {
    if (this.startTeamIndex < this.teams.length - this.sliceBalancer) {
      this.startTeamIndex++;
    } else this.startTeamIndex = 0;
  }

  prevTeam() {
    if (this.startTeamIndex > 0) {
      this.startTeamIndex--;
    } else this.startTeamIndex = this.teams.length - this.sliceBalancer;
  }
}
