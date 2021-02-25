import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  slideIndicator = 1;
  slideInterval: any;
  numOfSlides = 5;

  constructor(
    private platform: Platform) {
    
  }

  ngOnInit() {
    this.nextSlide();
    this.randomStart();
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.slideInterval);
  }

  nextSlide() {
    this.slideInterval = setInterval(() => {
      if (this.slideIndicator < this.numOfSlides) {
        this.slideIndicator++;
      } else {
        this.slideIndicator = 1;
      }
    }, 9000);
  }

  randomStart() {
    this.slideIndicator = Math.floor(Math.random() * (this.numOfSlides) + 1);
  }

  manualChange(id: number) {
    this.slideIndicator = id;
    clearInterval(this.slideInterval);
    this.nextSlide();
  }

  swipeLeft() {
    this.slideIndicator = this.slideIndicator - 1;
    if (this.slideIndicator < 1) {
      this.slideIndicator = this.numOfSlides;
    }
    clearInterval(this.slideInterval);
    this.nextSlide();
  }

  swipeRight() {
    this.slideIndicator++;
    if (this.slideIndicator > this.numOfSlides) {
      this.slideIndicator = 1;
    }
    clearInterval(this.slideInterval);
    this.nextSlide();
  }

}
