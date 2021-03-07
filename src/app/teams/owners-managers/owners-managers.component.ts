import { Subscription } from 'rxjs';
import { RewardsService, LeaderboardService, TeamsService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-owners-managers',
  templateUrl: './owners-managers.component.html',
  styleUrls: ['./owners-managers.component.scss'],
})
export class OwnersManagersComponent implements OnInit, OnDestroy {
  OwnerManagerType = 'home'; 
  teamreward: number;
  rsubsciption: Subscription;
  transObserver: Subscription;
  isManager = false;
  myRewards: any;
  myLdrbrd: any;
  ioioreward: number;
  teamId: number;
  reason = 'Reason to join the team';
  constructor(private rapi: LeaderboardService, private rapina: RewardsService, private identityService: AuthService,
  private tservice: TeamsService) { }

  ngOnInit() {
    this.getRewards();
    this.getAllRewards();
    this.getMyLeaderboard();
  }

  ngOnDestroy() {
    if (this.rsubsciption) {
      this.rsubsciption.unsubscribe();
    }
  }

  scrollToView(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getRewards() {
    this.rsubsciption = this.rapi.leaderboardTeamInternalList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }


  getAllRewards() {
    this.transObserver = this.rapina.rewardsList()
      .subscribe(data => {
        this.myRewards = data;
        this.ioioreward = Number(data.team_bonus);
      });
  }
  

  getMyLeaderboard() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
  }

  becomeManager() {

    this.tservice.becomeManager(this.teamId, { reason: this.reason }).subscribe
      (data => {
        console.log(data);
      });
  }


}
