import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { timeStamp } from "console";
import { Tick } from "highcharts";
import { TickerPricesService } from "../../../api/services/ticker-prices.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
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
      shopid: 46,
      collection: "Teams",
      name: "IOI",
      prize: "1000 IOI",
      image: "ioi-team-small",
      type: "team",
    },
  ];

  bundles: Array<object> = [
    {
      id: 1,
      name: "DAOMaker",
      link: "@TheDaoMaker",
      image: "bundle-dao",
      back: "bundle-back3",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 2,
      name: "Shreyansh",
      link: "@shreyansh_27",
      image: "bundle-polygon",
      back: "bundle-back7",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 3,
      name: "KYLE CHASSE",
      link: "@kyle_chasse",
      image: "bundle-kyle",
      back: "bundle-back6",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 4,
      name: "Ash WSB",
      link: "@ashWSBreal",
      image: "bundle-ash",
      back: "bundle-back2",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 5,
      name: "Tehmoonwalker",
      link: "@tehmoonwalker",
      image: "bundle-tehmoon",
      back: "bundle-back1",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 6,
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      image: "bundle-parabolic",
      back: "bundle-back5",
      staking: 6,
      reward: 0.1,
    },
    {
      id: 7,
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      image: "bundle-altcoin",
      back: "bundle-back8",
      staking: 6,
      reward: 0.1,
    },

    {
      id: 8,
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      image: "bundle-wizard",
      back: "bundle-back4",
      staking: 6,
      reward: 0.1,
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
  windowWidth: any;
  menuActive = 1;
  reviewSlide = 0;
  maxRevSlides = 2;
  carouselStep = 1;
  bundleCarStep = 1;
  selectedExchange = 5;
  exSelectorOpened = false;
  isMenuActive = false;
  activeMenu = 0;
  sliceStart: number;
  sliceEnd: number;
  display = window.innerWidth;
  actualMonth: any;
  monthsStart = 0;
  currentIoiPrice: number;
  oldIoiPrice: number;
  ioiIncresing = true;
  monthsEnd: any;
  tickerIoiInterval: any;
  logged = false;
  closeTokenDetail = true;
  xDown = null;
  yDown = null;
  @ViewChild("carousel") carousel: ElementRef;
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
  constructor(protected ticker: TickerPricesService) {
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
    this.getIoiPrice();
    this.tickerIoiInterval = setInterval(() => {
      this.getIoiPrice();
    }, 20000);
    // this.carousel.addEventListener('touchstart', this.handleTouchStart, false);
    // document.addEventListener('touchmove', this.handleTouchMove, false);
  }

  ngOnDestroy(): void {
    clearInterval(this.tickerIoiInterval);
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

  nextCarItem() {
    if (this.carouselStep > 1) {
      this.carouselStep = 1;
    } else {
      this.carouselStep++;
    }
  }

  prevCarItem() {
    if (this.carouselStep < 2) {
      this.carouselStep = 2;
    } else {
      this.carouselStep--;
    }
  }

  manualCarSwitch(index: number) {
    this.carouselStep = index;
    // this.setCarInterval();
  }

  nextBundleCarItem() {
    if (this.bundleCarStep >= this.bundles.length - 1) {
      this.bundleCarStep = 0;
    } else {
      this.bundleCarStep++;
    }
  }

  prevBundleCarItem() {
    if (this.bundleCarStep < 1) {
      this.bundleCarStep = this.bundles.length - 1;
    } else {
      this.bundleCarStep--;
    }
  }

  getIoiPrice() {
    this.ticker.tickerIoiPriceRead().subscribe((data) => {
      if (!this.oldIoiPrice || !this.currentIoiPrice) {
        this.oldIoiPrice = data;
        this.currentIoiPrice = data;
      }
      this.currentIoiPrice = data;
      if (this.oldIoiPrice !== this.currentIoiPrice) {
        this.ioiIncresing =
          this.oldIoiPrice > this.currentIoiPrice ? false : true;
        this.oldIoiPrice = this.currentIoiPrice;
      }
    });
  }

  openLink(url: string) {
    window.open(url, "_blank").focus();
  }

  getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (this.carouselStep < 3) this.carouselStep++;
        else this.carouselStep = 1;
      } else {
        if (this.carouselStep > 1) {
          this.carouselStep--;
        } else {
          this.carouselStep = 3;
        }
      }
    } else {
      if (yDiff > 0) {
        //up
      } else {
        //down
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

}
