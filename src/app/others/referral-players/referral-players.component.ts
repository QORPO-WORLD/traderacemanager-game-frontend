import { Affiliates } from './../../api/models/affiliates';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AffiliatesService } from '../../api/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-referral-players',
  templateUrl: './referral-players.component.html',
  styleUrls: ['./referral-players.component.scss']
})
export class ReferralPlayersComponent implements OnInit, OnDestroy {
  affilatesList: Array<Affiliates>;
  actualPage = 1;
  totalPages: number;
  offObserver: Subscription;
  constructor(protected api: AffiliatesService) { }

  ngOnInit(): void {
    this.getReferralPlayers();
  }

  ngOnDestroy() {
    if (this.offObserver) {
      this.offObserver.unsubscribe();
    }
  }

  getReferralPlayers() {
    this.offObserver = this.api.affiliatesList(this.actualPage).subscribe(data => {
      const newdata: any = data;
      this.totalPages = newdata.total_pages;
      this.affilatesList = newdata.results;
    });
  }

  nextPage() {
    this.actualPage++;
    this.getReferralPlayers();
  }
  prevPage() {
    this.actualPage--;
    this.getReferralPlayers();
  }

  resolveLevel(item) {
    if (item === 1) {
      return 'level1';
    } else if (item === 2) {
      return 'level2';
    } else if (item === 3) {
      return 'level3';
    } else if (item === 4) {
      return 'level4';
    }
  }

}
