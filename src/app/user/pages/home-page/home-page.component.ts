import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  menuOpen = false;
  windowWidth = 1920;
  useMobileVideo = false;

  constructor() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 640) {
      this.useMobileVideo = true;
    }
  }

  ngOnInit() {}

  myCars: Array<any> = [
    { name: 'car1', value: 600, stakes: 0.6 },
    { name: 'car2', value: 600, stakes: 0.6 },
    { name: 'car3', value: 600, stakes: 0.6 },
    { name: 'car4', value: 600, stakes: 0.6 }
  ];
  carIndex = 0;

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


}
