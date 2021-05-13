import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarsService } from "../../api/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-nft-market",
  templateUrl: "./nft-market.component.html",
  styleUrls: ["./nft-market.component.scss"],
})
export class NftMarketComponent implements OnInit {
  carSum: string;
  marketState = 1;
  selectedId = 1;
  isPaged = 0;
  selectedType = "racers";
  timeoutPage: any;
  animation = 0;

  products: Array<object> = [
    //bronze
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      prize: "600 IOI",
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
      prize: "600 IOI",
      image: "car2",
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
      prize: "600 IOI",
      image: "car3",
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
      prize: "600 IOI",
      image: "car4",
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
      prize: "600 IOI",
      image: "car5",
      type: "car",
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
      prize: "600 IOI",
      image: "car6",
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
      prize: "3 600 IOI",
      image: "car25",
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
      prize: "1 000 IOI",
      image: "car7",
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
      prize: "1 000 IOI",
      image: "car8",
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
      prize: "1 000 IOI",
      image: "car9",
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
      prize: "1 000 IOI",
      image: "car10",
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
      prize: "1 000 IOI",
      image: "car11",
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
      prize: "1 000 IOI",
      image: "car12",
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
      prize: "6 000 IOI",
      image: "car26",
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
      prize: "1 600 IOI",
      image: "car13",
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
      prize: "1 600 IOI",
      image: "car14",
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
      prize: "1 600 IOI",
      image: "car15",
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
      prize: "1 600 IOI",
      image: "car16",
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
      prize: "1 600 IOI",
      image: "car17",
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
      prize: "1 600 IOI",
      image: "car18",
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
      prize: "9 600 IOI",
      image: "car27",
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
      prize: "2 600 IOI",
      image: "car19",
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
      prize: "2 600 IOI",
      image: "car20",
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
      prize: "2 600 IOI",
      image: "car21",
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
      prize: "2 600 IOI",
      image: "car22",
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
      prize: "2 600 IOI",
      image: "car23",
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
      prize: "2 600 IOI",
      image: "car24",
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
      prize: "15 600 IOI",
      image: "car28",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "10 000 IOI",
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
      prize: "Coming soon",
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
      prize: "Coming soon",
      image: "desert",
      type: "track",
      bet: "1 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track desert",
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest",
      type: "track",
      bet: "5 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track dark forest",
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      prize: "Coming soon",
      image: "night-city",
      type: "track",
      bet: "10 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track night city",
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge",
      type: "track",
      bet: "50 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track sea bridge",
    },

    {
      id: 42,
      collection: "Race tracks",
      name: "Underground",
      prize: "Coming soon",
      image: "underground",
      type: "track",
      bet: "100 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track underground",
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
      amount: [],
      alt: "nft team btc",
    },

    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
      amount: [],
      alt: "nft team ioi",
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
      amount: [],
      alt: "nft team alt",
    },
    {
      id: 46,
      collection: "",
      name: "You",
      prize: "1 000 IOI",
      image: "team-you",
      type: "team",
      ability1: "50 IOI",
      ability2: "20%",
      amount: [],
      alt: "nft tea you",
    },
    {
      id: 47,
      collection: "",
      name: "Trophy",
      prize: "",
      image: "trophy",
      type: "special",
      ability2: "Yearly",
      amount: [],
      alt: "nft yearly trophy",
    },
    {
      id: 48,
      collection: "",
      name: "Ring",
      prize: "",
      image: "ring",
      type: "special",
      ability1: "Entry to yearly tournament",
      ability2: "Monthly",
      amount: [],
      alt: "nft monthly ring",
    },
  ];
  title = "All products";
  filter = 0; // 0 = all // 1 = racers // 2 = cars // 3 = tracks
  selectedPosition: number;
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  specialActive = false;
  allActive = true;
  sliceStart: number;
  sliceMiddle: number;
  display = window.innerWidth;
  newProducts = this.products;

  assetType: any;
  mobileFilter = false;
  inRow: number;
  currentPage = 1;
  maxPage: number;
  lastPage: number;
  typeObserver: Subscription;

  modalActive: any;

  constructor(protected api: CarsService, private route: ActivatedRoute) {
    this.width();
  }

  ngOnInit() {
    this.getShowroomCars();
    this.getAssetType();
  }

  closeModal() {
    this.modalActive = false;
  }

  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.assetType = params["type"];
      if (!this.assetType) {
        this.assetType = "all";
      }
      if (this.assetType === "car") {
        this.filterCars();
      }
      if (this.assetType === "racer") {
        this.filterRacers();
      }
      if (this.assetType === "track") {
        this.filterTracks();
      }
      if (this.assetType === "team") {
        this.filterTeams();
      }
      if (this.assetType === "special") {
        this.filterSpecial();
      }
    });
  }

  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  filterMobile() {
    if (this.mobileFilter === false) {
      this.mobileFilter = true;
    } else {
      this.mobileFilter = false;
    }
  }

  width() {
    this.display = window.innerWidth;
    if (this.display > 640 && this.display < 1300) {
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

  filterRacers() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "racer");
    this.width();
    this.racersActive = true;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.specialActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Racers";
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
    this.specialActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Cars";
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
    this.specialActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Tracks";
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
    this.specialActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Teams";
  }
  filterSpecial() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "special"
    );

    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.specialActive = true;
    this.allActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Special";
  }
  filterAll() {
    this.newProducts = this.products;

    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = true;
    this.specialActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "All products";
  }

  //NAVBAR
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

  getShowroomCars() {
    this.api.carsShowroomList().subscribe((data) => {
      const objs: any = data;
      this.carSum = objs.remaining_cars.toString();
    });
  }

  showAsset(id: number, type: string, position: number) {
    if (
      this.newProducts["name"] != "BTC" &&
      this.newProducts["name"] != "ALT" &&
      this.newProducts["name"] != "IOI"
    ) {
      this.selectedPosition = position;
      this.selectedId = id;
      this.selectedType = type;
      this.marketState = 2;
    }
  }

  timeoutReset() {
    clearTimeout(this.timeoutPage);
  }
  prevPageCars() {
    if (this.currentPage > 0) {
      this.timeoutReset();
      this.currentPage--;
      this.isPaged--;
      this.animation = 3;
      this.timeoutPage = setTimeout(() => {
        this.animation = 2;
        this.sliceStart = this.inRow * this.isPaged;
        this.sliceMiddle = this.inRow * this.currentPage;
        this.timeoutPage = null;
      }, 300);
    }
    console.log("paged" + this.isPaged);
    console.log("current" + this.currentPage);
    console.log("start" + this.sliceStart);
    console.log("end" + this.sliceMiddle);
  }
  nextPageCars() {
    if (this.currentPage < this.newProducts.length / this.inRow) {
      this.timeoutReset();
      this.currentPage++;
      this.isPaged++;
      this.animation = 1;
      this.timeoutPage = setTimeout(() => {
        this.animation = 0;
        this.sliceStart = this.inRow * this.isPaged;
        this.sliceMiddle = this.inRow * this.currentPage;
        this.timeoutPage = null;
      }, 300);
    }
    console.log("paged" + this.isPaged);
    console.log("current" + this.currentPage);
    console.log("start" + this.sliceStart);
    console.log("end" + this.sliceMiddle);
  }
  showAssetBuy(state: number) {
    this.marketState = state;
  }
  showModal(modal: number) {
    this.modalActive = modal;
  }
}
