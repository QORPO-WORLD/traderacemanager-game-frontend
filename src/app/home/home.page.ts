import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  products: Array<object> = [
    {
      id: 1,
      collection: "Racers",
      name: "Mr. Rich",
      prize: "1152 IOI",
      image: "mr-rich-small",
      type: "racer",
    },
    {
      id: 2,
      collection: "Cars",
      name: "BLUE STORM",
      prize: "15 600 IOI",
      image: "car28",
      type: "car",
    },
    {
      id: 3,
      collection: "Tracks",
      name: "Night City",
      prize: "",
      image: "night-city",
      type: "track",
    },
    {
      id: 4,
      collection: "Teams",
      name: "IOI",
      prize: "",
      image: "ioi-team-small",
      type: "team",
    },
  ];

  windowWidth;
  menuActive = 1;
  reviewSlide = 0;
  maxRevSlides = 2;
  isMenuActive = false;
  activeMenu = 0;
  sliceStart;
  sliceEnd;
  display = window.innerWidth;

  constructor() {
    this.width();
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

  width() {
    this.display = window.innerWidth;

    if (this.display <= 640) {
      this.sliceStart = 0;
      this.sliceEnd = 1;
    }
    if (this.display > 640 && this.display <= 1024) {
      this.sliceStart = 0;
      this.sliceEnd = 2;
    }
    if (this.display > 1024) {
      this.sliceStart = 0;
      this.sliceEnd = 3;
    }
  }
  pageLeft() {
    if (this.sliceStart > 0) {
      this.sliceStart = this.sliceStart - 1;
      this.sliceEnd = this.sliceEnd - 1;
    }
  }
  pageRigth() {
    if (this.sliceEnd < this.products.length) {
      this.sliceStart = this.sliceStart + 1;
      this.sliceEnd = this.sliceEnd + 1;
    }
  }
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
    element = document.querySelector(".hamburger");
    element.classList.remove("hamburgerclick");
    void element.offsetWidth;
    element.classList.add("hamburgerclick");
  }
  resetArrowL() {
    let element;
    element = document.querySelector(".arrow-left");
    element.classList.remove("hover");
    void element.offsetWidth;
    element.classList.add("hover");
  }
  resetArrowR() {
    let element;
    element = document.querySelector(".arrow-right");
    element.classList.remove("hover");
    void element.offsetWidth;
    element.classList.add("hover");
  }
}
