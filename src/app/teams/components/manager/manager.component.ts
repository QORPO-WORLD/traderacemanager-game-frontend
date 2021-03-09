import { TeamsService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  teams: any;
  constructor(private api: TeamsService) { }

  ngOnInit() {
    this.getTeams();
  }
  
  getTeams() {
    this.api.teamsList().subscribe(data => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.teams = data.results;
    });
  }

  becomeManager(id: number) {

    this.api.becomeManager(id, { reason: 'reason is null' }).subscribe
      (data => {
        console.log(data);
      });
  }

}
