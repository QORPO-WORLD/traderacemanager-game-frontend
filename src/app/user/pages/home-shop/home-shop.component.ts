import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-shop",
  templateUrl: "./home-shop.component.html",
  styleUrls: ["./home-shop.component.scss"],
})
export class HomeShopComponent implements OnInit {
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;
  products: Array<object> = [
    //bronze
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      price: "600",
      image: "car1",
      gif: "car1-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 10,
      position: 1,
      free: 12000,
      collection: "Common",
      name: "PANTHER",
      price: "600",
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 11,

      position: 2,
      free: 24000,
      collection: "Common",
      name: "ONYX",
      price: "600",
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 12,
      position: 3,
      free: 48000,
      collection: "Common",
      name: "ZANDER",
      price: "600",
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 13,
      position: 4,
      free: 96000,
      collection: "Common",
      name: "CYBORG",
      price: "600",
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 14,
      position: 5,
      free: 192000,
      collection: "Common",
      name: "VULCANIC",
      price: "600",
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      price: "3 600",
      image: "car25",
      gif: "car25-animation",
      type: "car",
      rare: true,
      ability1: 0.6,
      ability2: 6,
      amount: [],
      alt: "nft car luna",
    },
    //silver
    {
      id: 16,
      position: 6,
      free: 288000,
      collection: "Super",
      name: "DORIAN",
      price: "1 000",
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 17,
      position: 7,
      free: 432000,
      collection: "Super",
      name: "PANTHER",
      price: "1 000",
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 18,
      position: 8,
      free: 648000,
      collection: "Super",
      name: "ONYX",
      price: "1 000",
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 19,
      position: 9,
      free: 972000,
      collection: "Super",
      name: "ZANDER",
      price: "1 000",
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 20,
      position: 10,
      free: 1458000,
      collection: "Super",
      name: "PYTHON",
      price: "1 000",
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 21,
      position: 11,
      free: 2187000,
      collection: "Super",
      name: "VULCANIC",
      price: "1 000",
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: "6 000",
      image: "car26",
      gif: "car26-animation",
      type: "car",
      rare: true,
      ability1: 1.98,
      ability2: 12,
      amount: [],
      alt: "nft car silver knight",
    },
    //gold
    {
      id: 23,
      position: 12,
      free: 3000000,
      collection: "Epic",
      name: "CYBORG",
      price: "1 600",
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 24,
      position: 13,
      free: 3600000,
      collection: "Epic",
      name: "RHINO",
      price: "1 600",
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 25,
      position: 14,
      free: 4320000,
      collection: "Epic",
      name: "HYPER",
      price: "1 600",
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 26,
      position: 15,
      free: 5184000,
      collection: "Epic",
      name: "BULL",
      price: "1 600",
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 27,
      position: 16,
      free: 6220000,
      collection: "Epic",
      name: "PYTHON",
      price: "1 600",
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 28,
      position: 17,
      free: 7465000,
      collection: "Epic",
      name: "HITMAN",
      price: "1 600",
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hitman",
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      price: "9 600",
      image: "car27",
      gif: "car27-animation",
      type: "car",
      rare: true,
      ability1: 4.74,
      ability2: 18,
      amount: [],
      alt: "nft car midas",
    },
    //platinum
    {
      id: 30,
      position: 18,
      free: 8200000,
      collection: "Legendary",
      name: "HYPER",
      price: "2 600",
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 31,
      position: 19,
      free: 9000000,
      collection: "Legendary",
      name: "DORIAN",
      price: "2 600",
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 32,
      position: 20,
      free: 9900000,
      collection: "Legendary",
      name: "VULCANIC",
      price: "2 600",
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 33,
      position: 21,
      free: 10890000,
      collection: "Legendary",
      name: "BULL",
      price: "2 600",
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 34,
      position: 22,
      free: 12000000,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: "2 600",
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car knockout",
    },
    {
      id: 35,
      position: 23,
      free: 13200000,
      collection: "Legendary",
      name: "LARA",
      price: "2 600",
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car lara",
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: "15 600",
      image: "car28",
      gif: "car28-animation",
      type: "car",
      rare: true,
      ability1: 10.25,
      ability2: 24,
      amount: [],
      alt: "nft car blue storm",
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      price: "100",
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Axle",
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      price: "100",
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Flash",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      price: "100",
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Octane",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      price: "100",
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Punisher",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: "1 000",
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Lady Rich",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: "1 000",
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Rich Junior",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: "1 000",
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Mrs. Rich",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: "10 000",
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
      alt: "nft racer mr. rich",
    },
    {
      id: 37,
      collection: "Race tracks",
      name: "Free track",
      price: "Soon",
      image: "free-track",
      type: "track",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track free",
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Desert",
      price: "Soon",
      image: "desert",
      type: "track",
      bet: "1",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track desert",
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      price: "Soon",
      image: "dark-forest",
      type: "track",
      bet: "5",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track dark forest",
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      price: "Soon",
      image: "night-city",
      type: "track",
      bet: "10",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track night city",
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      price: "Soon",
      image: "sea-bridge",
      type: "track",
      bet: "50",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track sea bridge",
    },

    {
      id: 42,

      collection: "Race tracks",
      name: "Underground",
      price: "Soon",
      image: "underground",
      type: "track",
      bet: "100",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track underground",
    },
    {
      id: 43,
      type: "bundle",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle1",
      avatar: "tehmoon-avatar",
      back: "tehmoon-back",
    },
    {
      id: 44,
      type: "bundle",
      name: "Ash WSB",
      link: "@ashWSBreal",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle2",
      avatar: "ash-avatar",
      back: "ash-back",
    },
    {
      id: 45,
      type: "bundle",
      name: "DAOMaker",
      link: "@TheDaoMaker",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle3",
      avatar: "dao-avatar",
      back: "dao-back",
    },
    {
      id: 46,
      type: "bundle",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle4",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
    {
      id: 47,
      type: "bundle",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle5",
      avatar: "parabolic-avatar",
      back: "parabolic-back",
    },
    {
      id: 48,
      type: "bundle",
      name: "PAID Network",
      link: "@kyle_chasse",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle6",
      avatar: "paid-avatar",
      back: "paid-back",
    },
  ];
  typeObserver: Subscription;
  assetType: any;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;
  timeoutPage: any;
  animation = 0;
  animateArrow = false;
  animateArrowRight = false;
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  bundlesActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  inRow: number;
  sliceStart: number;
  sliceMiddle: number;
  newProducts = this.products;
  assetId: any;
  title = "All products";
  currentPage: number;
  maxPage: number;
  lastPage: number;
  isPaged: any;
  filter: any;

  constructor(private route: ActivatedRoute) {
    this.getAssetType();
    this.width();
  }

  ngOnInit() {}

  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.assetPage = +params["page"];
      this.assetStartPage = +params["startPage"];
      this.assetFilter = params["filter"];
      if (!this.assetFilter) {
        this.filterAll();
      }
      if (!this.assetPage) {
        this.assetPage = 1;
      }
      if (!this.assetStartPage) {
        this.assetStartPage = 0;
      }

      if (this.assetFilter === "racer") {
        this.filterRacers();
      }
      if (this.assetFilter === "car") {
        this.filterCars();
      }
      if (this.assetFilter === "track") {
        this.filterTracks();
      }

      if (this.assetFilter === "bundle") {
        this.filterBundles();
      }
      if (this.assetFilter === "all") {
        this.filterAll();
      }
      this.currentPage = this.assetPage;
      this.isPaged = this.assetStartPage;
    });
  }

  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  widthFilter() {
    this.display = window.innerWidth;
  }
  width() {
    this.display = window.innerWidth;

    if (this.display > 750 && this.display < 1300) {
      this.inRow = 9;
      this.maxPage = 9;
      this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
      this.sliceStart = this.inRow * this.isPaged;
      this.sliceMiddle = this.inRow * this.currentPage;
    } else {
      this.inRow = 8;
      this.maxPage = 8;
      this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);

      this.sliceStart = this.inRow * this.isPaged;
      this.sliceMiddle = this.inRow * this.currentPage;
    }
  }

  filterMobile() {
    if (this.mobileFilter === false) {
      this.mobileFilter = true;
    } else {
      this.mobileFilter = false;
    }
  }

  filterRacers() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "racer");

    this.width();
    this.bundlesActive = false;
    this.racersActive = true;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = "Racers";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "racer";
  }

  filterCars() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "car");

    this.width();
    this.bundlesActive = false;
    this.carsActive = true;
    this.tracksActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = "Cars";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "car";
  }
  filterTracks() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "track");

    this.width();
    this.bundlesActive = false;
    this.tracksActive = true;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = "Tracks";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "track";
  }

  filterBundles() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "bundle"
    );

    this.width();
    this.bundlesActive = true;
    this.racersActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = "Bundles";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "Bundle";
  }
  filterAll() {
    this.newProducts = this.products;

    this.width();
    this.bundlesActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = true;
    this.title = "All products";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "all";
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
  reset() {
    let element;
    element = document.querySelector(".hamburger");
    element.classList.remove("hamburgerclick");
    void element.offsetWidth;
    element.classList.add("hamburgerclick");
  }
  timeoutReset() {
    clearTimeout(this.timeoutPage);
  }
  prevPageCars() {
    if (this.currentPage > 0) {
      this.animateArrow = false;
      this.animateArrow = true;
      this.timeoutReset();
      this.currentPage--;
      this.isPaged--;
      this.animation = 3;
      this.timeoutPage = setTimeout(() => {
        this.animation = 2;
        this.sliceStart = this.inRow * this.isPaged;
        this.sliceMiddle = this.inRow * this.currentPage;
        this.timeoutPage = null;
        this.animateArrow = false;
      }, 300);
    }
  }
  nextPageCars() {
    if (this.currentPage < this.newProducts.length / this.inRow) {
      this.animateArrowRight = false;
      this.animateArrowRight = true;
      this.timeoutReset();
      this.currentPage++;
      this.isPaged++;
      this.animation = 1;
      this.timeoutPage = setTimeout(() => {
        this.animation = 0;
        this.sliceStart = this.inRow * this.isPaged;
        this.sliceMiddle = this.inRow * this.currentPage;
        this.timeoutPage = null;
        this.animateArrowRight = false;
      }, 300);
    }
  }
}
