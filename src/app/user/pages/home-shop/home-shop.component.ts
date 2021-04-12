import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-shop",
  templateUrl: "./home-shop.component.html",
  styleUrls: ["./home-shop.component.scss"],
})
export class HomeShopComponent implements OnInit {
  products: Array<object> = [
    //bronze
    {
      id: 9,
      collection: "Common",
      name: "RHINO",
      prize: "600 IOI",
      image: "car1",
      type: "car",
    },
    {
      id: 10,
      collection: "Common",
      name: "PANTHER",
      prize: "600 IOI",
      image: "car2",
      type: "car",
    },
    {
      id: 11,
      collection: "Common",
      name: "ONYX",
      prize: "600 IOI",
      image: "car3",
      type: "car",
    },
    {
      id: 12,
      collection: "Common",
      name: "ZANDER",
      prize: "600 IOI",
      image: "car4",
      type: "car",
    },
    {
      id: 13,
      collection: "Common",
      name: "CYBORG",
      prize: "600 IOI",
      image: "car5",
      type: "car",
    },
    {
      id: 14,
      collection: "Common",
      name: "VULCANIC",
      prize: "600 IOI",
      image: "car6",
      type: "car",
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      prize: "3 600 IOI",
      image: "car25",
      type: "car",
      rare: true,
    },
    //silver
    {
      id: 16,
      collection: "Super",
      name: "DORIAN",
      prize: "1 000 IOI",
      image: "car7",
      type: "car",
    },
    {
      id: 17,
      collection: "Super",
      name: "PANTHER",
      prize: "1 000 IOI",
      image: "car8",
      type: "car",
    },
    {
      id: 18,
      collection: "Super",
      name: "ONYX",
      prize: "1 000 IOI",
      image: "car9",
      type: "car",
    },
    {
      id: 19,
      collection: "Super",
      name: "ZANDER",
      prize: "1 000 IOI",
      image: "car10",
      type: "car",
    },
    {
      id: 20,
      collection: "Super",
      name: "PYTHON",
      prize: "1 000 IOI",
      image: "car11",
      type: "car",
    },
    {
      id: 21,
      collection: "Super",
      name: "VULCANIC",
      prize: "1 000 IOI",
      image: "car12",
      type: "car",
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      prize: "6 000 IOI",
      image: "car26",
      type: "car",
      rare: true,
    },
    //gold
    {
      id: 23,
      collection: "Epic",
      name: "CYBORG",
      prize: "1 600 IOI",
      image: "car13",
      type: "car",
    },
    {
      id: 24,
      collection: "Epic",
      name: "RHINO",
      prize: "1 600 IOI",
      image: "car14",
      type: "car",
    },
    {
      id: 25,
      collection: "Epic",
      name: "HYPER",
      prize: "1 600 IOI",
      image: "car15",
      type: "car",
    },
    {
      id: 26,
      collection: "Epic",
      name: "BULL",
      prize: "1 600 IOI",
      image: "car16",
      type: "car",
    },
    {
      id: 27,
      collection: "Epic",
      name: "PYTHON",
      prize: "1 600 IOI",
      image: "car17",
      type: "car",
    },
    {
      id: 28,
      collection: "Epic",
      name: "HITMAN",
      prize: "1 600 IOI",
      image: "car18",
      type: "car",
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      prize: "9 600 IOI",
      image: "car27",
      type: "car",
      rare: true,
    },
    //platinum
    {
      id: 30,
      collection: "Legendary",
      name: "HYPER",
      prize: "2 600 IOI",
      image: "car19",
      type: "car",
    },
    {
      id: 31,
      collection: "Legendary",
      name: "DORIAN",
      prize: "2 600 IOI",
      image: "car20",
      type: "car",
    },
    {
      id: 32,
      collection: "Legendary",
      name: "VULCANIC",
      prize: "2 600 IOI",
      image: "car21",
      type: "car",
    },
    {
      id: 33,
      collection: "Legendary",
      name: "BULL",
      prize: "2 600 IOI",
      image: "car22",
      type: "car",
    },
    {
      id: 34,
      collection: "Legendary",
      name: "KNOCKOUT",
      prize: "2 600 IOI",
      image: "car23",
      type: "car",
    },
    {
      id: 35,
      collection: "Legendary",
      name: "LARA",
      prize: "2 600 IOI",
      image: "car24",
      type: "car",
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      prize: "15 600 IOI",
      image: "car28",
      type: "car",
      rare: true,
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      prize: "100 IOI",
      image: "avatar-white",
      type: "racer",
    },
    {
      id: 2,
      collection: "Super",
      name: "Flash",
      prize: "100 IOI",
      image: "avatar-red",
      type: "racer",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      prize: "100 IOI",
      image: "avatar-blue",
      type: "racer",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      prize: "100 IOI",
      image: "avatar-black",
      type: "racer",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      prize: "1 000 IOI",
      image: "lady-rich",
      type: "racer",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      prize: "1 000 IOI",
      image: "bad-boy",
      type: "racer",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      prize: "1 000 IOI",
      image: "mrs-rich",
      type: "racer",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      prize: "10 000 IOI",
      image: "mr-rich",
      type: "racer",
    },
    {
      id: 37,
      collection: "Race tracks",
      name: "Free track",
      prize: "Coming soon",
      image: "free-track",
      type: "track",
      bet: "",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Desert",
      prize: "Coming soon",
      image: "desert",
      type: "track",
      bet: "1",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest",
      type: "track",
      bet: "5",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      prize: "Coming soon",
      image: "night-city",
      type: "track",
      bet: "10",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge",
      type: "track",
      bet: "50",
      ability1: "2 minutes",
      ability2: "Random events",
    },

    {
      id: 42,
      collection: "Race tracks",
      name: "Underground",
      prize: "Coming soon",
      image: "underground",
      type: "track",
      bet: "100",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
    },
    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
    },
    {
      id: 46,
      collection: "",
      name: "Team You",
      prize: "1 000 IOI",
      image: "team-you",
      type: "team",
    },
  ];
  typeObserver: Subscription;
  assetType: any;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  inRow;
  sliceStart;
  sliceMiddle;
  newProducts = this.products;
  assetId;
  title = "All products";
  currentPage;
  maxPage;
  lastPage;
  isPaged;
  filter;

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
      if (this.assetFilter === "team") {
        this.filterTeams();
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
  prevPageCars() {
    if (this.sliceStart > 0) {
      this.sliceStart = this.sliceStart - this.inRow;
      this.sliceMiddle = this.sliceMiddle - this.inRow;
      this.isPaged = this.isPaged - 1;
    }
  }
  nextPageCars() {
    if (this.sliceMiddle < this.newProducts.length) {
      this.sliceStart = this.sliceStart + this.inRow;
      this.sliceMiddle = this.sliceMiddle + this.inRow;
      this.isPaged = this.isPaged + 1;
    }
  }

  filterRacers() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "racer");

    this.width();
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
  filterTeams() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "team");

    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = true;
    this.allActive = false;
    this.title = "Teams";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "team";
  }
  filterAll() {
    this.newProducts = this.products;

    this.width();
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
  //NAVBAR//
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;

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
  resetPageArrowLeft() {
    let page;
    page = document.querySelector(".pagebtn-l");
    page.classList.remove("clickPage");
    void page.offsetWidth;
    page.classList.add("clickPage");
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
    }
  }
  resetPageArrowRight() {
    let page;
    page = document.querySelector(".pagebtn-r");
    page.classList.remove("clickPage");
    void page.offsetWidth;
    page.classList.add("clickPage");
    if (this.currentPage <= this.newProducts.length / 8) {
      this.currentPage = this.currentPage + 1;
    }
  }
}
