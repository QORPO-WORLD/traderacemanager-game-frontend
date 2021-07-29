import { NotifyService } from './../../services/notify.service';
import { Router } from '@angular/router';
import { DriversService } from 'src/app/api/services';

import { Subscription } from 'rxjs';
import { BalanceService } from './../../services/balance.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-maintanance',
  templateUrl: './maintanance.component.html',
  styleUrls: ['./maintanance.component.scss'],
})
export class MaintananceComponent implements OnInit, OnDestroy {
  mainInterval: any;
  balObserver: Subscription;
  constructor(private api: DriversService, private route: Router, private notify: NotifyService) { }

  ngOnInit() {
    this.checkDeployed();
    this.mainInterval = setInterval(() => {
      this.checkDeployed();
    }, 5000);
  }

  checkDeployed() {
    this.api.driversBalances().subscribe(data => {
      this.clearAndRefresh();
    });
  }

  clearAndRefresh() {
    clearInterval(this.mainInterval);
    this.route.navigate(['/race/start-race']);
    this.notify.error('You are using new version of Trade Race Manager, app will be reloaded.')
    setTimeout(() => {
      window.location.reload();
    }, 1500)
  }

  ngOnDestroy() {
    clearInterval(this.mainInterval);
    if (this.balObserver) {
      this.balObserver.unsubscribe();
    }
  }

}
