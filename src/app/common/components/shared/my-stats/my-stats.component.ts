import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.component.html',
  styleUrls: ['./my-stats.component.scss'],
})
export class MyStatsComponent implements OnInit {

  myLdrbrdObserver: Subscription;
  isLastMonth = false;
  myLdrbrd: any;
  winPercent = 0;

  constructor(protected ldrbrdSrvc: LeaderboardService) { }

  ngOnInit() {
    this.getMyLeaderboard();
  }

  getMyLeaderboard() {
    this.myLdrbrdObserver = this.ldrbrdSrvc.leaderboardMe({
      page: 1, lastMonth: this.isLastMonth
    })
      .subscribe(data => {
        this.myLdrbrd = data;
        this.getWinsPercent(data);
        console.log(data);
      });
  }

  getWinsPercent(data: any){
    this.winPercent = (data.wins * 100) / data.total_races;
  }

}
