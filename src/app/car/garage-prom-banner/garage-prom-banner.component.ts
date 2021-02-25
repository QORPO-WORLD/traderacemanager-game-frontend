import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-garage-prom-banner',
  templateUrl: './garage-prom-banner.component.html',
  styleUrls: ['./garage-prom-banner.component.scss'],
})
export class GaragePromBannerComponent implements OnInit, OnDestroy {

  constructor() { }

  bannerInterval: any;
  numOfBanners = 1;
  bannerIndicator = 1;

  ngOnInit() {
    this.randomStart();
  }

  ngOnDestroy() {
    clearInterval(this.bannerInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.bannerInterval);
  }

  nextBanner() {
    this.bannerInterval = setInterval(() => {
      if (this.bannerIndicator < this.numOfBanners) {
        this.bannerIndicator++;
      } else {
        this.bannerIndicator = 1;
      }
    }, 7000);
  }

  randomStart() {
    this.bannerIndicator = Math.floor(Math.random() * (this.numOfBanners) + 1);
  }

  manualChange(id: number) {
    this.bannerIndicator = id;
    clearInterval(this.bannerInterval);
    this.nextBanner();
  }

}
