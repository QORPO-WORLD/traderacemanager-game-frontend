import { TeamMember } from './../../../api/models/team-member';
import { LeaderboardService } from 'src/app/api/services';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TeamModalTogglerService } from '../../../common/services/team-modal-toggler.service';


@Component({
  selector: 'app-leaderboard-teams',
  templateUrl: './leaderboard-teams.component.html',
  styleUrls: ['./leaderboard-teams.component.scss']
})
export class LeaderboardTeamsComponent implements OnInit, OnDestroy {
  leaderboardObserver: Subscription;
  teams = [];
  isLastMonth = false;
  constructor(protected api: LeaderboardService, protected toggle: TeamModalTogglerService) {
    this.getLeaderboard();
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    if (this.leaderboardObserver) {
      this.leaderboardObserver.unsubscribe();
    }
  }

  getLeaderboard() {
    this.leaderboardObserver = this.api.leaderboardTeamList({
      page: 1, lastMonth: this.isLastMonth
    }).
      subscribe(data => {
        const newdata: any = data;
        this.teams = newdata.results;
      });
  }

  toggleModal(teamID: number) {
    //this.toggle.change(teamID);
  }

  toggleMonth() {
    //this.toggle.changeMonth();
  }


}
