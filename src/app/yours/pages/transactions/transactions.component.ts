import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from 'src/app/api/models';
import { TransactionsService } from 'src/app/api/services';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transObserver: Subscription;
  transactions: Transaction[];
  actualPage = 1;
  totalPages: number;
  constructor(protected api: TransactionsService) {

  }

  ngOnInit(): void {
    this.getTransactions();
  }

  ngOnDestroy() {
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
  }

  getTransactions() {
    this.transObserver = this.api.transactionsList({
      page: this.actualPage

    }).
      subscribe(data => {
        const newdata: any = data;
        this.transactions = newdata.results;
        this.totalPages = newdata.total_pages;
        console.log(this.transactions);
      });
  }

  nextPage() {
    this.actualPage++;
    this.getTransactions();
  }
  prevPage() {
    this.actualPage--;
    this.getTransactions();
  }

}
