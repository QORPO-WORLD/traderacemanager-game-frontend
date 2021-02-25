import { Subscription } from 'rxjs';
import { RewardsService, LeaderboardService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  ioioreward: number;
  constructor(private rapi: LeaderboardService, private rapina: RewardsService) { }

  ngOnInit() {
    this.getRewards();
    this.getAllRewards();
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


}
