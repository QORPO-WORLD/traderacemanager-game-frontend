import { AuthService } from './../../../user/services/auth.service';
import { CountryCodes } from './../../../user/components/countries/country-codes';
import { PlayerLeaderboard } from './../../../api/models/player-leaderboard';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LeaderboardService, DriversService } from 'src/app/api/services';
import { TeamModalTogglerService } from '../../../common/services/team-modal-toggler.service';
import { TournamentLeaderboard } from 'src/app/api/models';

@Component({
  selector: 'app-mini-ldrbrd',
  templateUrl: './mini-ldrbrd.component.html',
  styleUrls: ['./mini-ldrbrd.component.scss']
})
export class MiniLdrbrdComponent implements OnInit, OnDestroy {
  leaderboardObserver: Subscription;
  myLdrbrdObserver: Subscription;
  @Input() players: TournamentLeaderboard[];
  @Input() tourIndex: number;
  is24race = false;
  isLastMonth = false;
  myLdrbrd: any;
  showSeparator = false;
  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];
  actualPage = 1;
  totalPages: number;
  countryList = CountryCodes;
  myDriverObserver: Subscription;
  myDriver: any;
  myStats = [];
  constructor(protected api: LeaderboardService, protected toggle: TeamModalTogglerService,
    protected driver: DriversService, private identityService: AuthService) {

  }

  ngOnInit(): void {
    this.getMydriver();
  }

  ngOnDestroy() {
    if (this.leaderboardObserver) {
      this.leaderboardObserver.unsubscribe();
    }
    if (this.myLdrbrdObserver) {
      this.myLdrbrdObserver.unsubscribe();
    }
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity(); this.myDriver = data;
    this.getMyStats(data.id);

  }

  getMyStats(id: string) {
    for (let x = 0; x < this.players.length; x++) {
      if (this.players[x].user_id === id) {
        if(this.players[x].position > 10){
          this.showSeparator = true;
        }
        this.myStats.push(this.players[x]);
      }
    }
  }

}
