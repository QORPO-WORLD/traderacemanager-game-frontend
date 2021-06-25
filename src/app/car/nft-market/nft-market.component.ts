import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarsService } from "../../api/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-nft-market",
  templateUrl: "./nft-market.component.html",
  styleUrls: ["./nft-market.component.scss"],
})
export class NftMarketComponent implements OnInit {
  animation = 5;
  timeoutPrev: any;
  timeoutNext: any;
  carSum: string;
  marketState = 3;
  selectedId = 1;
  isPaged = 0;
  selectedType = "racers";
  timeoutPage: any;
  animationPaging = 0;
  animateArrow = false;
  animateArrowRight = false;
  products: Array<object> = [
    //bronze
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      price: 600,
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
      position: 0,
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
      position: 1,
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
      position: 2,
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
      position: 3,
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
      position: 4,
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
      position: 5,
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
      position: 6,
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
      position: 7,
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
      position: 0,
      type: "bundle",
      name: "DAOMaker",
      link: "@TheDaoMaker",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-dao",
      racer: "dao-maker",
      car: "car41",
      avatar: "dao-avatar",
      back: "dao-back",
    },
    {
      id: 44,
      position: 1,
      type: "bundle",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-polygon",
      racer: "polygon",
      car: "car42",
    },
    {
      id: 45,
      position: 3,
      type: "bundle",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-kyle",
      racer: "paid",
      car: "car44",
      avatar: "paid-avatar",
      back: "paid-back",
    },
    {
      id: 46,
      position: 4,
      type: "bundle",
      name: "Ash WSB",
      link: "@ashWSBreal",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-ash",
      racer: "ash-wsb",
      car: "car45",
      avatar: "ash-avatar",
      back: "ash-back",
    },
    {
      id: 47,
      position: 5,
      type: "bundle",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-tehmoon",
      racer: "tehmoonwalker",
      car: "car46",
      avatar: "tehmoon-avatar",
      back: "tehmoon-back",
    },

    {
      id: 48,
      position: 6,
      type: "bundle",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-parabolic",
      racer: "parabolic-guy",
      car: "car47",
      avatar: "parabolic-avatar",
      back: "parabolic-back",
    },
    {
      id: 49,
      position: 9,
      type: "bundle",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-altcoin",
      racer: "altcoin-buzz",
      car: "car50",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
    {
      id: 50,
      position: 10,
      type: "bundle",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-wizard",
      racer: "cryptowizard",
      car: "car51",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
  ];
  title = "All";
  filter = 0; // 0 = all // 1 = racers // 2 = cars // 3 = tracks
  selectedPosition: number;
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  bundlesActive = false;
  allActive = true;
  sliceStart: number;
  sliceMiddle: number;
  display = window.innerWidth;
  newProducts = this.products;
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;
  assetType: any;
  mobileFilter = false;
  inRow: number;
  currentPage = 1;
  maxPage: number;
  lastPage: number;
  typeObserver: Subscription;
  modalActive: any;

  constructor(
    protected api: CarsService,
    private route: ActivatedRoute,
    public router: Router
  ) {
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
      this.assetType = params["assetType"];
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

      if (this.assetType === "bundle") {
        this.filterBundles();
      }
    });
  }
  back() {
    this.animation = 1;
    if (this.marketState === 1) {
      this.timeoutPrev = setTimeout(() => {
        this.router.navigate(["/race/start-race"]);
        this.timeoutReset();
      }, 300);
    } else if (this.marketState === 2) {
      this.marketState = 1;
    } else if (this.marketState === 3) {
      this.marketState = 2;
    }
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
    this.inRow = 8;
    this.maxPage = 8;

    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
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
    this.bundlesActive = false;
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
    this.bundlesActive = false;
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
    this.bundlesActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Tracks";
  }

  filterBundles() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "bundle"
    );

    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.bundlesActive = true;
    this.allActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "Bundles";
  }
  filterAll() {
    this.newProducts = this.products;

    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = true;
    this.bundlesActive = false;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.title = "All";
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

  getShowroomCars() {
    this.api.carsShowroomList().subscribe((data) => {
      const objs: any = data;
      this.carSum = objs.remaining_cars.toString();
    });
  }

  showAsset(state: number, id: number, type: string, position: number) {
    this.marketState = state;
    this.selectedPosition = position;
    this.selectedId = id;
    this.selectedType = type;
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
      this.animationPaging = 3;
      this.timeoutPage = setTimeout(() => {
        this.animationPaging = 2;
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
      this.animationPaging = 1;
      this.timeoutPage = setTimeout(() => {
        this.animationPaging = 0;
        this.sliceStart = this.inRow * this.isPaged;
        this.sliceMiddle = this.inRow * this.currentPage;
        this.timeoutPage = null;
        this.animateArrowRight = false;
      }, 300);
    }
  }
  showAssetBuy(state: number) {
    this.marketState = state;
  }
  showModal(modal: number) {
    this.modalActive = modal;
  }
}
