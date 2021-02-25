import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RewardsMe } from 'src/app/api/models';
import { RewardsService } from '../../../api/services';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotions-banner',
  templateUrl: './promotions-banner.component.html',
  styleUrls: ['./promotions-banner.component.scss'],
})
export class PromotionsBannerComponent implements OnInit, OnDestroy {

  @Input() bannerType: {type: string, numOfBanners: number};

  constructor(private rwrdsrvc: RewardsService, private router: Router) { }

  bannerIndicator = 1;
  bonusTicketOpened = false;
  myRewards: any;
  rewardsMe: RewardsMe;
  transObserver: Subscription;
  merewardObserver: Subscription;
  bannerInterval: any;

  ngOnInit() {
    this.getRewards();
    this.getMyRewards();
    this.nextBanner();
    this.randomStart();
  }

  ngOnDestroy() {
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
    if (this.merewardObserver) {
      this.merewardObserver.unsubscribe();
    }
    clearInterval(this.bannerInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.bannerInterval);
  }

  nextBanner() {
    this.bannerInterval = setInterval(() => {
      if (this.bannerIndicator < this.bannerType.numOfBanners) {
        this.bannerIndicator++;
      } else {
        this.bannerIndicator = 1;
      }
    }, 7000);
  }

  randomStart() {
    this.bannerIndicator = Math.floor(Math.random() * (this.bannerType.numOfBanners) + 1);
  }

  manualChange(id: number) {
    this.bannerIndicator = id;
    clearInterval(this.bannerInterval);
    this.nextBanner();
  }

  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList()
      .subscribe(data => {
        const oldData: any = data;
        this.myRewards = data;
      });
  }
  getMyRewards() {
    this.merewardObserver = this.rwrdsrvc.rewardsMeList()
      .subscribe(data => {
        this.rewardsMe = data;
      });
  }

  playFree() {
    this.router.navigate(['/car/fuel-car/0']);
  }
}
