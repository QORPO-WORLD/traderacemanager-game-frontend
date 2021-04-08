import { Transaction } from 'src/app/api/models';
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
  raceTransactions: Transaction[];
  winnerObservable: Subscription;
  winnersList = [];
  showFinalModal = false;
  actualPage = 1;
  actualPageWinner = 1;
  totalPages: number;
  totalPagesWinner: number;
  atualUrl: string;
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
        console.log(this.totalPages);
      });
  }


  getRaceWinner(rid: string) {
    this.winnerObservable = this.rapi.racesWinnerList(rid, this.actualPageWinner).subscribe(data => {
      const datax: any = data;
      this.winnersList = datax.winners;
      this.totalPagesWinner = datax.total_pages;
      this.showFinalModal = true;
      this.atualUrl = rid;
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
