import { first } from 'rxjs/operators';
import { NotifiqService } from "./../../services/notifiq.service";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { TeamsService } from "../../../api/services/teams.service";
import { AuthService } from "../../../user/services/auth.service";
import { BalanceService } from "../../../common/services/balance.service";

@Component({
  selector: "app-teams-selection",
  templateUrl: "./teams-selection.component.html",
  styleUrls: ["./teams-selection.component.scss"],
})
export class TeamsSelectionComponent implements OnInit {
  @Output() endsIn = new EventEmitter<string>();
  @Input() managerType = false;
  teams: any;
  myDriverBalances: any;
  myTeam: string;
  myTeamData: any;
  mySettings = { type: "team", numOfBanners: 2 };
  joinFree = false;
  teamreward: any;
  currMonth: number;
  myMembEnds: string;
  showInfoBubble = false;
  managerDisclaim = false;
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
  modalOpened = 0;

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
    this.getBalance();
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
      for (let i = 0; i < this.teams.length; i++) {
        this.teams[i].statState = 1;
        if (this.teams[i].name === this.myTeam) {
          if(this.teams[i].memberships[0].date_to != null)
            this.myMembEnds = this.teams[i].memberships[0].date_to;
          else if(this.teams[i].memberships.length > 1 && this.teams[i].memberships[1].date_to != null)
            this.myMembEnds = this.teams[i].memberships[1].date_to;
        }
      }
      if (this.myMembEnds !== undefined) {
        this.getMembEnd();
      }
      // this.reorderTeams();
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

  getBalance(){
    this.myDriverBalances = this.identityService.getBalance();
  }

  getMembEnd() {
    this.endsIn.emit(this.myMembEnds);
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

  reorderTeams() {
    let helper = [...this.teams];
    let specificItem = helper.filter((item) => item.name === "TRADER");
    if (specificItem !== undefined) {
      let firstTwo = helper.splice(0, 2);
      helper = helper.filter((item) => item.name !== "TRADER");
      this.teams = [...firstTwo, ...specificItem, ...helper]; 
    }
  }

  openMembershipModal(state: number, teamId?: number) {
    this.modalOpened = state;
    if (teamId) {
      this.selectedTeamId = teamId;
    }
  }

  nextStat(teamIndex: number) {
    if (this.teams[teamIndex].statState < 3) {
      this.teams[teamIndex].statState++;
    } else {
      this.teams[teamIndex].statState = 1;
    }
  }

  prevStat(teamIndex: number) {
    if (this.teams[teamIndex].statState > 1) {
      this.teams[teamIndex].statState--;
    } else {
      this.teams[teamIndex].statState = 3;
    }
  }

  becomeManager(id: number) {

    this.api.becomeManager(id, { reason: 'reason is null' }).subscribe
      (data => {
        this.getTeams();
        this.managerDisclaim = false;
      });
  }

  openManagerModal(id: number) {
    this.selectedTeamId = id;
    this.managerDisclaim = true;
  }

  closeManagerModal() {
    this.selectedTeamId = null;
    this.managerDisclaim = false;
  }

}
