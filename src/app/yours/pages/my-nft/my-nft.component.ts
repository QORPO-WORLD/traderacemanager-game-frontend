import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { CarsService, DriversService } from "../../../api/services";
import { NotifyService } from "./../../../common/services/notify.service";
import { AuthService } from "./../../../user/services/auth.service";
import { BalanceService } from "./../../../common/services/balance.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-nft",
  templateUrl: "./my-nft.component.html",
  styleUrls: ["./my-nft.component.scss"],
})
export class MyNftComponent implements OnInit {
  cars: any;
  buyedCar: any;
  editionIndex = 1;
  myCars: any;
  carsSorted;
  myCarsSorted = {
    car0: [],
    car1: [],
    car2: [],
    car3: [],
    car4: [],
    car5: [],
    car6: [],
    car7: [],
    car8: [],
    car9: [],
    car10: [],
    car11: [],
    car12: [],
    car13: [],
    car14: [],
    car15: [],
    car16: [],
    car17: [],
    car18: [],
    car19: [],
    car20: [],
    car21: [],
    car22: [],
    car23: [],
    car24: [],
    car25: [],
    car26: [],
    car27: [],
    car28: [],
  };
  products: Array<object> = [
    //bronze
    {
      id: 9,
      collection: "Common",
      name: "RHINO",
      prize: "600 IOI",
      image: "car1",
      type: "car",
      amount: [],
    },
    {
      id: 10,
      collection: "Common",
      name: "PANTHER",
      prize: "600 IOI",
      image: "car2",
      type: "car",
      amount: [],
    },
    {
      id: 11,
      collection: "Common",
      name: "ONYX",
      prize: "600 IOI",
      image: "car3",
      type: "car",
      amount: [],
    },
    {
      id: 12,
      collection: "Common",
      name: "ZANDER",
      prize: "600 IOI",
      image: "car4",
      type: "car",
      amount: [],
    },
    {
      id: 13,
      collection: "Common",
      name: "CYBORG",
      prize: "600 IOI",
      image: "car5",
      type: "car",
      amount: [],
    },
    {
      id: 14,
      collection: "Common",
      name: "VULCANIC",
      prize: "600 IOI",
      image: "car6",
      type: "car",
      amount: [],
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      prize: "3 600 IOI",
      image: "car25",
      type: "car",
      rare: true,
      amount: [],
    },
    //silver
    {
      id: 16,
      collection: "Super",
      name: "DORIAN",
      prize: "1 000 IOI",
      image: "car7",
      type: "car",
      amount: [],
    },
    {
      id: 17,
      collection: "Super",
      name: "PANTHER",
      prize: "1 000 IOI",
      image: "car8",
      type: "car",
      amount: [],
    },
    {
      id: 18,
      collection: "Super",
      name: "ONYX",
      prize: "1 000 IOI",
      image: "car9",
      type: "car",
      amount: [],
    },
    {
      id: 19,
      collection: "Super",
      name: "ZANDER",
      prize: "1 000 IOI",
      image: "car10",
      type: "car",
      amount: [],
    },
    {
      id: 20,
      collection: "Super",
      name: "PYTHON",
      prize: "1 000 IOI",
      image: "car11",
      type: "car",
      amount: [],
    },
    {
      id: 21,
      collection: "Super",
      name: "VULCANIC",
      prize: "1 000 IOI",
      image: "car12",
      type: "car",
      amount: [],
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      prize: "6 000 IOI",
      image: "car26",
      type: "car",
      rare: true,
      amount: [],
    },
    //gold
    {
      id: 23,
      collection: "Epic",
      name: "CYBORG",
      prize: "1 600 IOI",
      image: "car13",
      type: "car",
      amount: [],
    },
    {
      id: 24,
      collection: "Epic",
      name: "RHINO",
      prize: "1 600 IOI",
      image: "car14",
      type: "car",
      amount: [],
    },
    {
      id: 25,
      collection: "Epic",
      name: "HYPER",
      prize: "1 600 IOI",
      image: "car15",
      type: "car",
      amount: [],
    },
    {
      id: 26,
      collection: "Epic",
      name: "BULL",
      prize: "1 600 IOI",
      image: "car16",
      type: "car",
      amount: [],
    },
    {
      id: 27,
      collection: "Epic",
      name: "PYTHON",
      prize: "1 600 IOI",
      image: "car17",
      type: "car",
      amount: [],
    },
    {
      id: 28,
      collection: "Epic",
      name: "HITMAN",
      prize: "1 600 IOI",
      image: "car18",
      type: "car",
      amount: [],
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      prize: "9 600 IOI",
      image: "car27",
      type: "car",
      rare: true,
      amount: [],
    },
    //platinum
    {
      id: 30,
      collection: "Legendary",
      name: "HYPER",
      prize: "2 600 IOI",
      image: "car19",
      type: "car",
      amount: [],
    },
    {
      id: 31,
      collection: "Legendary",
      name: "DORIAN",
      prize: "2 600 IOI",
      image: "car20",
      type: "car",
      amount: [],
    },
    {
      id: 32,
      collection: "Legendary",
      name: "VULCANIC",
      prize: "2 600 IOI",
      image: "car21",
      type: "car",
      amount: [],
    },
    {
      id: 33,
      collection: "Legendary",
      name: "BULL",
      prize: "2 600 IOI",
      image: "car22",
      type: "car",
      amount: [],
    },
    {
      id: 34,
      collection: "Legendary",
      name: "KNOCKOUT",
      prize: "2 600 IOI",
      image: "car23",
      type: "car",
      amount: [],
    },
    {
      id: 35,
      collection: "Legendary",
      name: "LARA",
      prize: "2 600 IOI",
      image: "car24",
      type: "car",
      amount: [],
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      prize: "15 600 IOI",
      image: "car28",
      type: "car",
      rare: true,
      amount: [],
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      prize: "100 IOI",
      image: "white-trm",
      type: "racer",
      amount: [],
    },
    {
      id: 2,
      collection: "Super",
      name: "Flash",
      prize: "100 IOI",
      image: "red-trm",
      type: "racer",
      amount: [],
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      prize: "100 IOI",
      image: "blue-trm",
      type: "racer",
      amount: [],
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      prize: "100 IOI",
      image: "black-trm",
      type: "racer",
      amount: ["yes"],
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      prize: "1 000 IOI",
      image: "lady-rich",
      type: "racer",
      amount: [],
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      prize: "1 000 IOI",
      image: "bad-boy",
      type: "racer",
      amount: [],
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      prize: "1 000 IOI",
      image: "mrs-rich",
      type: "racer",
      amount: [],
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      prize: "10 000 IOI",
      image: "mr-rich",
      type: "racer",
      amount: ["yes"],
    },
    {
      id: 37,
      collection: "Race tracks",
      name: "Free track",
      prize: "Coming soon",
      image: "free-track",
      type: "track",
      amount: ["yes"],
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Desert",
      prize: "Coming soon",
      image: "desert",
      type: "track",
      amount: [],
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest",
      type: "track",
      amount: [],
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      prize: "Coming soon",
      image: "night-city",
      type: "track",
      amount: [],
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge",
      type: "track",
      amount: [],
    },

    {
      id: 42,
      collection: "Race tracks",
      name: "Underground",
      prize: "Coming soon",
      image: "underground",
      type: "track",
      amount: [],
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
      amount: [],
    },

    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
      amount: [],
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
      amount: [],
    },
    {
      id: 46,
      collection: "",
      name: "Team You",
      prize: "1 000 IOI",
      image: "team-you",
      type: "team",
      amount: ["yes"],
    },
    {
      id: 47,
      collection: "",
      name: "Trophy",
      prize: "",
      image: "trophy",
      type: "special",
      ability1: "Yearly",
      amount: ["yes"],
    },
    {
      id: 48,
      collection: "",
      name: "Ring",
      prize: "",
      image: "ring",
      type: "special",
      ability1: "Monthly",
      amount: ["yes"],
    },
  ];
  myCar: any;
  ed1Cars = 0;
  ed2Cars = 0;
  ed3Cars = 0;
  ed4Cars = 0;
  dataReady = false;
  actualCarIndex = 0;
  bestIndex = 0;
  availableCars = [];
  remainingCars = [];
  pageOpen = true;

  myCarsObserver: Subscription;
  vrecoObserver: Subscription;
  myDriverOldObserver: Subscription;
  balanceOldObserver: Subscription;
  sortingDone = false;
  myDriverOld: any;
  slideStylePx = 0;
  editionStylePx = 0;
  editionLvlIndex = 0;
  luckyCar: any;
  myBalance: any;
  carSum: string;
  unlocked: number;
  gotRare = false;

  typeObserver: Subscription;
  assetType: any;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;

  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  specialActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  inRow;
  sliceStart;
  sliceMiddle;
  newProducts;
  assetId;
  title = "All products";
  currentPage;
  maxPage;
  lastPage;
  isPaged;
  filter;

  selectedId = 46;
  selectedType = "team";
  owned;
  marketState = 1;

  showAsset(id: number, type: string, owned) {
    this.selectedId = id;
    this.selectedType = type;
    this.marketState = 2;
    this.owned = owned;
  }
  showAssetBuy(state: number) {
    this.marketState = state;
  }
  constructor(
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getMyCars();
  }

  get balanceHasChanged(): boolean {
    return this.balanceService.balanceChanged;
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }

  ngOnInit(): void {
    const that = this;
    this.getMyOldDriver();
    this.getMyBalance();
  }
  getMyCars() {
    this.clearSortedCars();
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      if (data.length === 0) {
        this.getFreeCar();
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.cars.length; x++) {
          if (objs.cars[x].car_id === 0) {
            this.myCarsSorted.car0.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 1) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 2) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 3) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 4) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 5) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 6) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 7) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 8) {
            this.products[8]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 9) {
            this.products[9]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 10) {
            this.products[10]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 11) {
            this.products[11]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 12) {
            this.products[12]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 13) {
            this.products[14]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 14) {
            this.products[15]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 15) {
            this.products[16]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 16) {
            this.products[17]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 17) {
            this.products[18]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 18) {
            this.products[19]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 19) {
            this.products[21]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 20) {
            this.products[22]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 21) {
            this.products[23]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 22) {
            this.products[24]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 23) {
            this.products[25]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 24) {
            this.products[26]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 25) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 26) {
            this.products[13]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 27) {
            this.products[20]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 28) {
            this.products[27]["amount"].push(objs.cars[x]);
          }
        }
        this.calcEditionNum();
        this.selectCar(objs);
        this.filterAll();
        this.sortingDone = true;
      }
    });
  }

  clearSortedCars() {
    this.myCarsSorted.car0.length = 0;
    this.myCarsSorted.car1.length = 0;
    this.myCarsSorted.car2.length = 0;
    this.myCarsSorted.car3.length = 0;
    this.myCarsSorted.car4.length = 0;
    this.myCarsSorted.car5.length = 0;
    this.myCarsSorted.car6.length = 0;
    this.myCarsSorted.car7.length = 0;
    this.myCarsSorted.car8.length = 0;
    this.myCarsSorted.car9.length = 0;
    this.myCarsSorted.car10.length = 0;
    this.myCarsSorted.car11.length = 0;
    this.myCarsSorted.car12.length = 0;
    this.myCarsSorted.car13.length = 0;
    this.myCarsSorted.car14.length = 0;
    this.myCarsSorted.car15.length = 0;
    this.myCarsSorted.car16.length = 0;
    this.myCarsSorted.car17.length = 0;
    this.myCarsSorted.car18.length = 0;
    this.myCarsSorted.car19.length = 0;
    this.myCarsSorted.car20.length = 0;
    this.myCarsSorted.car21.length = 0;
    this.myCarsSorted.car22.length = 0;
    this.myCarsSorted.car23.length = 0;
    this.myCarsSorted.car24.length = 0;
    this.myCarsSorted.car25.length = 0;
    this.myCarsSorted.car26.length = 0;
    this.myCarsSorted.car27.length = 0;
    this.myCarsSorted.car28.length = 0;
  }

  calcEditionNum() {
    if (this.myCarsSorted.car1.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car2.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car3.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car4.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car5.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car6.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car7.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car8.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car9.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car10.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car11.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car12.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car13.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car14.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car15.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car16.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car17.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car18.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car19.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car20.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car21.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car22.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car23.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car24.length > 0) {
      this.ed4Cars += 1;
    }
  }

  selectCar(data) {
    this.bestIndex = data.cars.length - 1;
    this.myCars = data.cars;
    this.myCar = this.myCars[this.bestIndex];
    this.dataReady = true;
  }

  selectMyCarSPecial(index) {
    this.myCar = this.myCars[index];
  }

  getFreeCar() {
    this.api.carsBuyList("0").subscribe((mycar) => {
      this.getMyCars();
    });
  }
  nextEdition() {
    this.editionLvlIndex++;
    if (this.editionLvlIndex > 3) {
      this.editionLvlIndex = 0;
    }
    this.editionStylePx = this.editionLvlIndex * 650;
  }

  prevEdition() {
    this.editionLvlIndex -= 1;
    if (this.editionLvlIndex < 0) {
      this.editionLvlIndex = 3;
    }
    this.editionStylePx = this.editionLvlIndex * 650;
  }

  getEdition() {
    this.editionStylePx = this.editionLvlIndex * 650;
  }

  getMyOldDriver() {
    this.myDriverOld = this.identityService.getDriverMe();
  }

  checkSum(val: number, by: number) {
    if (val >= by) {
      return 100;
    } else {
      return (val / by) * 100;
    }
  }

  getMyBalance() {
    const data = this.identityService.driverBalance;
    this.myBalance = data;
  }

  resetLucky() {
    this.luckyCar = null;
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
    this.newProducts = this.products.filter(
      (item) => item["type"] === "racer" && item["amount"].length > 0
    );

    this.width();
    this.specialActive = false;
    this.racersActive = true;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = "Your Racers";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "racer";
  }

  filterCars() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "car" && item["amount"].length > 0
    );

    this.width();
    this.specialActive = false;
    this.carsActive = true;
    this.tracksActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = "Your Cars";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "car";
  }
  filterTracks() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "track" && item["amount"].length > 0
    );

    this.width();
    this.specialActive = false;
    this.tracksActive = true;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = "Your Tracks";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "track";
  }
  filterTeams() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "team" && item["amount"].length > 0
    );

    this.width();
    this.specialActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = true;
    this.allActive = false;
    this.title = "Your Teams";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "team";
  }
  filterSpecial() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "special" && item["amount"].length > 0
    );

    this.width();
    this.specialActive = true;
    this.racersActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = "Your Specials";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "racer";
  }
  filterAll() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["amount"].length > 0
    );
    this.width();
    this.specialActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = true;
    this.title = "Your products";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "all";
    console.log(this.products);
    console.log(this.newProducts);
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
