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
  animationState = 0;
  startTeamIndex = 0;
  sliceBalancer = 3;
  myWW = 1920;

  constructor(private api: TeamsService, private identityService: AuthService) {
    this.width();
   }

  ngOnInit() {
    this.getTeams();
    this.getBalance();
  }

  width(){
    this.myWW = window.innerWidth;
    if (this.myWW <= 640) {
      this.sliceBalancer = 1;
    } else {
      this.sliceBalancer = 3;
    }
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
        this.getTeams();
      });
  }

  getBalance(){
    this.myDriverBalances = this.identityService.getBalance();
  }

  nextTeam(){
    if (this.startTeamIndex < this.teams.length - this.sliceBalancer) {
      this.startTeamIndex++;
    } else this.startTeamIndex = 0;
  }

  prevTeam(){
    if (this.startTeamIndex > 0) {
      this.startTeamIndex--;
    } else this.startTeamIndex = this.teams.length - this.sliceBalancer;
  }

}
