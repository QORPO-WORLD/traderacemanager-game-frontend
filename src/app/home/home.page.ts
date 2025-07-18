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
      shopid: 8,
      collection: "Racers",
      name: "Mr. Rich",
      prize: "10 000 IOI",
      image: "mr-rich",
      type: "racer",
    },
    {
      id: 2,
      shopid: 36,
      collection: "Cars",
      name: "BLUE STORM",
      prize: "15 600 IOI",
      image: "car28",
      type: "car",
    },
    {
      id: 3,
      shopid: 41,
      collection: "Tracks",
      name: "Night City",
      prize: "Coming soon",
      image: "night-city-small",
      type: "track",
    },
    {
      id: 4,
      shopid: 46,
      collection: "Teams",
      name: "IOI",
      prize: "1000 IOI",
      image: "ioi-team-small",
      type: "team",
    },
  ];

  months: Array<object> = [
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "February",
    },
    {
      id: 3,
      name: "March",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "May",
    },
    {
      id: 6,
      name: "June",
    },
    {
      id: 7,
      name: "July",
    },
    {
      id: 8,
      name: "August",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "October",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
  ];

  twitterName = "twitter.svg";
  telegramName = "telegram.svg";
  facebookName = "facebook.svg";
  instagramName = "instagram.svg";
  twitchName = "twitch.svg";
  youtubeName = "youtube.svg";
  bitcoinName = "btc.png";
  windowWidth;
  menuActive = 1;
  reviewSlide = 0;
  maxRevSlides = 2;
  isMenuActive = false;
  activeMenu = 0;
  sliceStart;
  sliceEnd;
  display = window.innerWidth;
  actualMonth;
  monthsStart = 0;
  monthsEnd;
  logged = false;
  getMonth() {
    var today = new Date();
    var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var monthNumber = +month;
    this.actualMonth = month;
  }
  nextPageMonths() {
    if (this.monthsEnd < this.months.length) {
      this.monthsStart = this.monthsStart + 1;
      this.monthsEnd = this.monthsEnd + 1;
    }
  }
  prevPageMonths() {
    if (this.monthsStart > 0) {
      this.monthsStart = this.monthsStart - 1;
      this.monthsEnd = this.monthsEnd - 1;
    }
  }
  constructor() {
    this.getMonth();
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

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem("auth-token"));
    if (token) {
      this.logged = true;
    }
  }

  width() {
    this.display = window.innerWidth;

    if (this.display <= 1024) {
      this.monthsStart = 0;
      this.monthsEnd = 3;
    }
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
      this.monthsStart = 0;
      this.monthsEnd = 4;
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
    if (this.sliceStart > 0) {
      let element;
      element = document.querySelector(".arrow-left");
      element.classList.remove("hover");
      void element.offsetWidth;
      element.classList.add("hover");
    }
  }
  resetArrowR() {
    if (this.sliceEnd < this.products.length) {
      let element;
      element = document.querySelector(".arrow-right");
      element.classList.remove("hover");
      void element.offsetWidth;
      element.classList.add("hover");
    }
  }
  resetArrowMonthsL() {
    if (this.monthsStart > 0) {
      let element;
      element = document.querySelector(".leftarrow");
      element.classList.remove("month-arrow-click");
      void element.offsetWidth;
      element.classList.add("month-arrow-click");
    }
  }
  resetArrowMonthsR() {
    if (this.monthsEnd < this.months.length) {
      let element;
      element = document.querySelector(".rightarrow");
      element.classList.remove("month-arrow-click");
      void element.offsetWidth;
      element.classList.add("month-arrow-click");
    }
  }

  //FOOTER HOVERING
  changeImage(n) {
    if (n === "twitter.svg") {
      this.twitterName = "twitter-blue.png";
    }
    if (n === "twitter-blue.png") {
      this.twitterName = "twitter.svg";
    }
    //TELEGRAM

    if (n === "telegram.svg") {
      this.telegramName = "telegram-blue.png";
    }
    if (n === "telegram-blue.png") {
      this.telegramName = "telegram.svg";
    }
    //FACEBOOK

    if (n === "facebook.svg") {
      this.facebookName = "facebook-blue.png";
    }
    if (n === "facebook-blue.png") {
      this.facebookName = "facebook.svg";
    }
    //IG

    if (n === "instagram.svg") {
      this.instagramName = "instagram-blue.png";
    }
    if (n === "instagram-blue.png") {
      this.instagramName = "instagram.svg";
    }
    //TWITCH
    if (n === "twitch.svg") {
      this.twitchName = "twitch-blue.png";
    }
    if (n === "twitch-blue.png") {
      this.twitchName = "twitch.svg";
    }
    //YOUTUBE
    if (n === "youtube.svg") {
      this.youtubeName = "youtube-blue.png";
    }
    if (n === "youtube-blue.png") {
      this.youtubeName = "youtube.svg";
    }
    //BTC
    if (n === "btc.png") {
      this.bitcoinName = "btc-blue.png";
    }
    if (n === "btc-blue.png") {
      this.bitcoinName = "btc.png";
    }
  }

}
