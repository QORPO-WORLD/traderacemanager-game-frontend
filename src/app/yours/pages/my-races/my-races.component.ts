import { TransactionsService, RacesService } from 'src/app/api/services';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-races',
  templateUrl: './my-races.component.html',
  styleUrls: ['./my-races.component.scss']
})
export class MyRacesComponent implements OnInit, OnDestroy {
  transObserver: Subscription;
  raceTransactions = [];
  winnerObservable: Subscription;
  winnersList = [];
  showFinalModal = false;
  actualPage = 1;
  totalPages: number;
  constructor(protected api: TransactionsService, protected rapi: RacesService) {

  }

  ngOnInit(): void {
    this.getMyRacesTransactions();
  }

  ngOnDestroy() {
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
    if (this.winnerObservable) {
      this.winnerObservable.unsubscribe();
    }
  }

  getMyRacesTransactions() {
    this.transObserver = this.api.transactionsRacesList(this.actualPage)
      .subscribe(data => {
        const newdata: any = data;
        this.raceTransactions = newdata.results;
        this.totalPages = newdata.total_pages;
      });
  }


  getRaceWinner(rid: string) {
    this.winnerObservable = this.rapi.racesWinnerList(rid).subscribe(data => {
      const datax: any = data;
      this.winnersList = datax.winners;
      this.showFinalModal = true;
    });
  }

  nextPage() {
    this.actualPage++;
    this.getMyRacesTransactions();
  }
  prevPage() {
    this.actualPage--;
    this.getMyRacesTransactions();
  }
}
