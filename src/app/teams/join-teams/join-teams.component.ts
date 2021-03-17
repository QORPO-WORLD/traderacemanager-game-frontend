import { AuthService } from './../../user/services/auth.service';
import { RewardsService, LeaderboardService } from 'src/app/api/services';
import { BalanceService } from './../../common/services/balance.service';
import { Subscription } from 'rxjs';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../../api/services/teams.service';
import { DriversService } from '../../api/services/drivers.service';

@Component({
  selector: 'app-join-teams',
  templateUrl: './join-teams.component.html',
  styleUrls: ['./join-teams.component.scss']
})
export class JoinTeamsComponent implements OnInit, OnDestroy {
  teams: any;
  myTeam: string;
  myTeamData: any;
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
  startNow = false;
  myTeamReward: any;
  myRewards: any;
  ioioreward: number;
  myDriverStats: any;
  constructor(protected api: TeamsService, protected notify: NotifiqService,
    protected driversApi: DriversService,
    private balanceService: BalanceService, private rapi: RewardsService, private identityService: AuthService,
    private lapi: LeaderboardService) {

  }

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
  }


  getRewards() {
    this.rapi.rewardsList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }


  getMyTeamReward() {
    this.teamSubscription = this.lapi.leaderboardTeamInternalList().subscribe(
      data => {

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


  getMydriver() {
    setTimeout(() => {
      this.myDriverStats = this.identityService.getStorageIdentity();
    }, 500);
  }

}
