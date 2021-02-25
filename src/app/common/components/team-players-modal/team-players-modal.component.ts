import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamModalTogglerService } from '../../services/team-modal-toggler.service';
import { Subscription } from 'rxjs';
import { PlayerLeaderboard } from '../../../api/models/player-leaderboard';
import { LeaderboardService, TeamsService } from 'src/app/api/services';
import { CountryCodes } from './../../../user/components/countries/country-codes';

@Component({
  selector: 'app-team-players-modal',
  templateUrl: './team-players-modal.component.html',
  styleUrls: ['./team-players-modal.component.scss'],
})


export class TeamPlayersModalComponent implements OnInit, OnDestroy {

  toggleObserver: Subscription;
  monthObserver: Subscription;
  myLdrbrdObserver: Subscription;
  teamsObserver: Subscription;
  teamModal: any;
  leaderboardObserver: Subscription;
  players: PlayerLeaderboard[];
  is24race = false;
  isLastMonth = false;
  actualPage = 1;
  myTeamPlayers: PlayerLeaderboard[];
  countryList = CountryCodes;
  myLdrbrd: any;
  myTeam: any;
  moonRider: PlayerLeaderboard;
  myStats: PlayerLeaderboard;
  teams = [];

  constructor(protected toggle: TeamModalTogglerService, protected api: LeaderboardService, protected teamsrvc: TeamsService) {
    this.getPlayersLeaderboard();
    this.getMyLeaderboard();
    this.getTeamsLeaderboard();
  }


  ngOnInit() {
    this.getModalState();
    this.getMonth();
  }

  ngOnDestroy() {
    if (this.toggleObserver) {
      this.toggleObserver.unsubscribe();
    }
    if (this.monthObserver) {
      this.monthObserver.unsubscribe();
    }
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.teamsObserver) {
      this.teamsObserver.unsubscribe();
    }
  }

  getModalState() {
    this.toggleObserver = this.toggle.getEmittedValue()
      .subscribe(item => {
        this.teamModal = item;
        this.getMoonRider();
        this.getMyStats();
        this.getMyTeamPlayers();
    });
  }

  getMonth() {
    this.monthObserver = this.toggle.getMonth()
      .subscribe(item => {
        this.isLastMonth = item;
        this.getMyLeaderboard();
        this.getPlayersLeaderboard();
        this.getMyStats();
        this.getTeamsLeaderboard();
    });
  }

  changeModalState() {
    this.toggle.change(1);
  }

  changeMonthState() {
    this.toggle.changeMonth();
  }

  getPlayersLeaderboard() {
    this.leaderboardObserver = this.api.leaderboardPlayerList({
      page: this.actualPage, lastMonth: this.isLastMonth, isRace24: this.is24race
    }).
      subscribe(data => {
        const newdata: any = data;
        this.players = newdata.results;
      });
  }

  getMyLeaderboard() {
    this.myLdrbrdObserver = this.api.leaderboardMe({
      page: 1, lastMonth: this.isLastMonth
    })
      .subscribe(data => {
        this.myLdrbrd = data;
      });
  }

  getTeamsLeaderboard() {
    this.leaderboardObserver = this.api.leaderboardTeamList({
      page: 1, lastMonth: this.isLastMonth
    }).
      subscribe(data => {
        const newdata: any = data;
        this.teams = newdata.results;
      });
  }

  getMyTeamPlayers() {
    const myPlayers = this.players.filter(player => player.team_id === this.teamModal.teamId);
    this.myTeamPlayers = myPlayers.slice(0, 10);
  }

  getMyStats() {
    const infoOmne = this.players.find(obj => obj.player_position === this.myLdrbrd.player_position_in_team);
    this.myStats = infoOmne;
  }

  getMoonRider() {
    const myTeam = this.teams.find(obj => obj.team_id === this.teamModal.teamId);
    const moonRiderStats = this.players.find(obj => obj.user_id === myTeam.roi_leader_id);
    this.moonRider = moonRiderStats;
  }

}
