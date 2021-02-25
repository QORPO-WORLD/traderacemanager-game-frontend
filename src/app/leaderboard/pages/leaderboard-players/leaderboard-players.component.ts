import { CountryCodes } from './../../../user/components/countries/country-codes';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaderboardService } from 'src/app/api/services';
import { TeamModalTogglerService } from '../../../common/services/team-modal-toggler.service';

@Component({
  selector: 'app-leaderboard-players',
  templateUrl: './leaderboard-players.component.html',
  styleUrls: ['./leaderboard-players.component.scss']
})
export class LeaderboardPlayersComponent implements OnInit, OnDestroy {
  leaderboardObserver: Subscription;
  myLdrbrdObserver: Subscription;
  players: PlayerLeaderboard[];
  is24race = false;
  isLastMonth = false;
  myLdrbrd: any;
  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];
  actualPage = 1;
  totalPages: number;
  countryList = CountryCodes;
  constructor(protected api: LeaderboardService, protected toggle: TeamModalTogglerService) {
    this.getLeaderboard();
    this.getMyLeaderboard();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.leaderboardObserver) {
      this.leaderboardObserver.unsubscribe();
    }
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
  }

  getLeaderboard() {
    this.leaderboardObserver = this.api.leaderboardPlayerList({
      page: this.actualPage, lastMonth: this.isLastMonth, isRace24: this.is24race
    }).
      subscribe(data => {
        const newdata: any = data;
        this.players = newdata.results;
        this.totalPages = newdata.total_pages;
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

  nextPage() {
    this.actualPage++;
    this.getLeaderboard();
  }
  prevPage() {
    this.actualPage--;
    this.getLeaderboard();
  }

  resetMonth() {
    this.toggle.resetMonth();
  }

}
