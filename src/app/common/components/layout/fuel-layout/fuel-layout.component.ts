import { NotifiqService } from './../../../services/notifiq.service';
import { BalanceService } from './../../../services/balance.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractComponent } from '../../abstract.component';
import { Identity } from '../../../../user/models/identity';
import { DriversService, AffiliatesService, AuthService as ninja } from '../../../../api/services';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';


declare let $: any;


@Component({
  selector: 'app-fuel-layout',
  templateUrl: './fuel-layout.component.html',
  styleUrls: ['./fuel-layout.component.scss']
})
export class FuelLayoutComponent extends AbstractComponent implements OnInit, OnDestroy {

  public identity: Identity;
  public menuVisible = false;
  profileObservable: Subscription;
  routeObservable: Subscription;
  myLevelObserver: Subscription;
  myDriverObserver: Subscription;
  myCarBoost = 0;
  myTeamBoost = 0;
  myTokenBoost = 0;
  myAffilateBoost = 0;
  showChat = false;
  switchBalance = false;
  menuOpen = false;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: "customSelect profileSelect"
  };
  myAffilate: any;
  myDriver: any;
  myDriverStats: any;
  interval: any;
  refreshInterval: any;
  walletSubscription: Subscription;
  // @Output() valueChange = new EventEmitter();
  balanceChanged: boolean;
  constructor(public router: Router,
    protected driverSrvc: DriversService, protected affisrvc: AffiliatesService,
    private identityService: AuthService, private balanceService: BalanceService,
    private uapi: ninja, private notify: NotifiqService) {
    super();
    this.balanceChanged = this.balanceService.balanceChanged;
    
  }
  get isSidebarVisible(): boolean {
    return this.balanceService.balanceChanged;
  }


  ngOnInit() {
    //this.getMyProfile();
    const balFirst = JSON.parse(localStorage.getItem('bal-first-time'));
    if (balFirst) {
     // console.log('ok');
    } else {
      this.getCryptoStats();
    }
 
    if (balFirst) {
      this.getCryptoStats();
    }
    this.getMyLevel();
    this.getMydriver();
    this.interval = setInterval(() => {
      this.getCryptoStats();
    }, 60000);

    this.balanceService.balanceChange.subscribe(data => {
      this.getCryptoStats();
    });
  }

  ngOnDestroy() {
    if (this.profileObservable) {
      this.profileObservable.unsubscribe();
    }
    if (this.routeObservable) {
      this.routeObservable.unsubscribe();
    }
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
    if (this.myLevelObserver) {
      this.myLevelObserver.unsubscribe();
    }
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
    clearInterval(this.interval);
    
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
    
  }

  logout() {
    clearInterval(this.interval);
    
    this.identityService.logout();
  }




  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriver = data;
  }

  getMyLevel() {
    this.myAffilate = this.identityService.getStorageAff();
  }

  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }

  onActivate(e, elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: 'auto', block: 'start' });
  }



}
