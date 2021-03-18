import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  menuOpen = false;
  windowWidth = 1920;
  useMobileVideo = false;
  reviewSlide = 0;
  maxRevSlides = 2;
  topBackIndex = 1;
  backInterval: any;
  myCars: Array<any> = [
    { name: 'car1', value: 600, stakes: 0.6 },
    { name: 'car2', value: 600, stakes: 0.6 },
    { name: 'car3', value: 600, stakes: 0.6 },
    { name: 'car4', value: 600, stakes: 0.6 }
  ];
  carIndex = 0;

  constructor() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 1300) {
      this.maxRevSlides = 3;
    }
    if (this.windowWidth < 900) {
      this.maxRevSlides = 5;
    }
    if (this.windowWidth < 640) {
      this.useMobileVideo = true;
    }
    if (this.windowWidth < 450) {
      this.maxRevSlides = 11;
    }
  }

  ngOnInit() {
    this.nextBackSlide();
  }

  ngOnDestroy() {
    clearInterval(this.backInterval);
  }

  routerOnDeactivate() {
    clearInterval(this.backInterval);
  }

  nextCar(){
    if (this.carIndex + 1 === this.myCars.length) {
      this.carIndex = 0;
    } else {
      this.carIndex++;
    }
  }

  prevCar(){
    if (this.carIndex - 1 < 0) {
      this.carIndex = this.myCars.length - 1;
    } else {
      this.carIndex--;
    }
  }

  manualChange(i: number){
    this.carIndex = i;
  }

  scrollToView(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  nextRev(){
    if(this.reviewSlide !== this.maxRevSlides){
      this.reviewSlide++;
    }
  }

  prevRev(){
    if(this.reviewSlide !== 0){
      this.reviewSlide--;
    }
  }

  nextBackSlide(){
    this.backInterval = setInterval(() => {
      if (this.topBackIndex < 3) {
        this.topBackIndex++;
      } else {
        this.topBackIndex = 1;
      }
    }, 9000);
  }


}
