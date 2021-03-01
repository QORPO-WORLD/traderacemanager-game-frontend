import { AuthService } from './../../user/services/auth.service';
import { RewardsService, LeaderboardService } from 'src/app/api/services';
import { BalanceService } from './../../common/services/balance.service';
import { Subscription } from 'rxjs';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../../api/services/teams.service';
import { DriversService } from '../../api/services/drivers.service';
import { TeamModalTogglerService } from '../../common/services/team-modal-toggler.service';

@Component({
  selector: 'app-join-teams',
  templateUrl: './join-teams.component.html',
  styleUrls: ['./join-teams.component.scss']
})
export class JoinTeamsComponent implements OnInit, OnDestroy {
  teams: any;
  myTeam: string;
  myTeamData: any;
  myTeamObserver: Subscription;
  teamSubscription: Subscription;
  transObserver: Subscription;
  mySettings = { type: 'team', numOfBanners: 2 };
  joinFree = false;
  teamreward: any;
  currMonth: number;
  showInfoBubble = false;
  allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  monthCount = 1;
  teamOption = 1;
  startNow = true;
  myTeamReward: any;
  myRewards: any;
  ioioreward: number;
  constructor(protected api: TeamsService, protected notify: NotifiqService,
    protected driversApi: DriversService, protected toggle: TeamModalTogglerService,
    private balanceService: BalanceService, private rapi: RewardsService, private identityService: AuthService,
    private lapi: LeaderboardService) {

  }

  ngOnInit(): void {
    this.getMyTeam();
    this.getRewards();
    this.getCurrentMonth();
    this.getMyTeamReward();
    this.getAllRewards();
  }

  ngOnDestroy() {
    if (this.myTeamObserver) {
      this.myTeamObserver.unsubscribe();
    }
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
  }

  getTeams() {
    this.api.teamsList().subscribe(data => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.teams = data.results;
      console.log(this.teams);
      console.log(data);
    });
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeam = data.team;
    this.getTeams();
    this.myTeamData = data;
    console.log(data);

  }

  joinTeam(teamId: number) {
    this.api.teamsJoinCreate({ join_team_id: teamId, join_paid_membership: true, month_count: this.monthCount, join_now: this.startNow }).
      subscribe(data => {
        this.notifyChangedBalance();
        
        this.identityService.updateDriverMe();
        this.getMyTeam();
      });
  }

  joinTeamFree(teamId: number) {
    this.api.teamsJoinCreate({ join_team_id: teamId, join_paid_membership: false }).
      subscribe(data => {
        this.getMyTeam();
      });
  }

  toggleModal(teamID: number) {
    this.toggle.change(teamID);
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


  getRewards() {
    this.rapi.rewardsList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }

  scrollToView(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
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



  getMyTeamReward() {
    this.teamSubscription = this.lapi.leaderboardTeamInternalList().subscribe(
      data => {
        console.log(data);
        this.myTeamReward = data.team_bonus;
      }
    );
  }

  getAllRewards() {
    this.transObserver = this.rapi.rewardsList()
      .subscribe(data => {
        this.myRewards = data;
        this.ioioreward = Number(data.team_bonus);
      });
  }
  


}
