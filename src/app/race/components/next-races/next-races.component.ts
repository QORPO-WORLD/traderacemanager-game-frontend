import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NextRaceV2 } from 'src/app/api/models';
import { DriversService, RacesService } from 'src/app/api/services';

@Component({
  selector: 'app-next-races',
  templateUrl: './next-races.component.html',
  styleUrls: ['./next-races.component.scss'],
})
export class NextRacesComponent implements OnInit, OnDestroy {
  newNextData: NextRaceV2[];
  raceData: any;
  raceObserver: Subscription;
  balanceObserver: Subscription;
  latestObserver: Subscription;
  rdObserver: Subscription;

  latestData: any;
  oldData: any;
  timerReady = false;
  selectedrace: NextRaceV2;
  trxBalance = 0;
  latestInterval: any;
  newItemStyle = '';
  constructor(private api: RacesService, private ntrsrvc: DriversService) { }

  ngOnInit() {
    this.getAllRaces();
    this.getBalance();
    this.getLatest();
    this.latestInterval = setInterval(() => {
      this.getLatest();
    }, 120000);
  }
  ngOnDestroy() {
    if (this.raceObserver) {
      this.raceObserver.unsubscribe();
    }
    if (this.balanceObserver) {
      this.balanceObserver.unsubscribe();
    }
    if (this.latestObserver) {
      this.latestObserver.unsubscribe();
    }
    if (this.rdObserver) {
      this.rdObserver.unsubscribe();
    }
    clearInterval(this.latestInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.latestInterval);
    if (this.rdObserver) {
      this.rdObserver.unsubscribe();
    }
  }

  getAllRaces() {
    this.timerReady = false;
    this.raceObserver = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;
      nedata.sort((a, b) => {
        return a.starts_in_seconds - b.starts_in_seconds;
      }
      );
      this.newNextData = nedata;
      this.selectNext(0);
      this.timerReady = true;
    });
  }

  selectNext(indexik: number) {
    this.selectedrace = this.newNextData[indexik];
  }

  getBalance() {
    this.balanceObserver = this.ntrsrvc.driversBalances().subscribe(data => {
      this.trxBalance = data.game_wallet_ioi;
    });
  }

  completeTimer() {
    setTimeout(() => {
      this.getAllRaces();
    }, 2000);
  }

  getLatest() {
  /*  this.latestObserver = this.api.racesLatestWinnersList()
      .subscribe(data => {
        const newdata: any = data;
        this.oldData = this.latestData;
        this.latestData = newdata.latest;
        this.animateFirst();
      });
      */
  }
  animateFirst() {
    if (this.oldData[0].updated !== this.latestData[0].updated) {
      this.newItemStyle = 'new-item';
      setTimeout(() => {
        this.newItemStyle = '';
      }, 1000);
    }
  }


}
