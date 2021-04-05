

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  windowWidth;
  menuActive = 1;
  reviewSlide = 0;
  maxRevSlides = 2;
  isMenuActive = false;
  activeMenu = 0;


  constructor() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 1300) {
      this.maxRevSlides = 3;
    }
    if (this.windowWidth < 900) {
      this.maxRevSlides = 5;
    }
    if (this.windowWidth < 450) {
      this.maxRevSlides = 11;
    }
  }

  ngOnInit() {}

  activateMenu() {
    if (this.activeMenu === 0) {
      this.isMenuActive = true;
      this.activeMenu = 1;
    } else {
      this.isMenuActive = false;
      this.activeMenu = 0;
    }
  }

  nextRev() {
    if (this.reviewSlide !== this.maxRevSlides) {
      this.reviewSlide++;
    }
  }

  prevRev() {
    if (this.reviewSlide !== 0) {
      this.reviewSlide--;
    }
  }
  reset() {
    let element;
    element = document.querySelector('.hamburger');
    element.classList.remove('hamburgerclick');
    void element.offsetWidth;
    element.classList.add('hamburgerclick');
  }


}
