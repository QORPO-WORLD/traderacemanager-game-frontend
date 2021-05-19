import { Experience, ExperienceService } from 'src/app/common/services/experience.service';
import { RacesService } from '../../../api/services/races.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NextRaceV2 } from 'src/app/api/models';
import { DriversService, TeamsService } from 'src/app/api/services';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-race-selection',
  templateUrl: './race-selection.component.html',
  styleUrls: ['./race-selection.component.scss'],
})
export class RaceSelectionComponent implements OnInit {

  raceType = 'trx';
  raceObserver: Subscription;
  tsubscribe: Subscription;
  selRaceType: string;
  currentExpLevel: number;
  myDriverBalances: any;
  signedIntoRace = false;
  newNextData: NextRaceV2[];
  fastEnabled = false;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  myTeamStats: any;
  myTeamName: any;
  constructor(private route: ActivatedRoute, private experience: ExperienceService, protected api: RacesService,
              private dapi: DriversService, private identityService: AuthService, private tapi: TeamsService) {
    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }

  ngOnInit(): void {
    this.getRaceType();
    this.fastFuelEnabled();
    this.getMydriverBalances();
    this.getMyTeam();
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeamName = data.team;
    this.getTeams();
  }

  getRaceType(){
    this.raceObserver = this.route
      .queryParams
      .subscribe(params => {
        this.raceType = params['raceType'];
      });
  }

  fastFuelEnabled() {
    this.dapi.driversFavFuelList().subscribe(
      data => {
        const datax: any = data;
        if (datax.length > 0) {
          this.fastEnabled = true;
        }
      }
    );
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance = this.myDriverBalances.game_wallet_ioi + this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
    const datax =  this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }

  getTeams() {
    this.tsubscribe = this.tapi.teamsList().subscribe(data => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });
       this.myTeamStats = newdata.find(x => x.name === this.myTeamName);
    });
  }

}
