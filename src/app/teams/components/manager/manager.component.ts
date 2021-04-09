import { TeamsService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {

  teams: any;
  myDriverBalances: any;
  ownerIndex = 0;

  constructor(private api: TeamsService, private identityService: AuthService) { }

  ngOnInit() {
    this.getTeams();
    this.getBalance();
  }
  
  getTeams() {
    this.api.teamsList().subscribe(data => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.teams = data.results;
      console.log(this.teams);
    });
  }

  becomeManager(id: number) {

    this.api.becomeManager(id, { reason: 'reason is null' }).subscribe
      (data => {
        this.getTeams();
      });
  }

  getBalance(){
    this.myDriverBalances = this.identityService.getBalance();
  }

}
