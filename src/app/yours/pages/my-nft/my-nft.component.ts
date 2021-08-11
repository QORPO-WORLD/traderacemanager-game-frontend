import { MyCars } from "./../../../api/models/my-cars";
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { CarsService, DriversService } from "../../../api/services";
import { NotifyService } from "./../../../common/services/notify.service";
import { AuthService } from "./../../../user/services/auth.service";
import { BalanceService } from "./../../../common/services/balance.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-nft",
  templateUrl: "./my-nft.component.html",
  styleUrls: ["./my-nft.component.scss"],
})
export class MyNftComponent implements OnInit, OnChanges {
  timeoutPrev: any;
  timeoutNext: any;
  showDeposit = false;
  cars: any;
  buyedCar: any;
  editionIndex = 1;
  myCars: any;
  carsSorted: any;
  allCars: any;
  timeoutPage: any;
  animation = 0;
  animateArrow = false;
  animateArrowRight = false;

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
    {
      id: 60,
      position: 59,
      collection: "Common",
      name: "TESLA",
      image: "car60",
      type: "car",
      rank: "low",
      amount: [],
      alt: "nft car Tesla",
    },
    //bronze
    {
      id: 25,
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
      id: 26,
      position: 1,
      free: 12000,
      collection: "Common",
      name: "PANTHER",
      prize: "600 IOI",
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 27,
      position: 2,
      free: 24000,
      collection: "Common",
      name: "ONYX",
      prize: "600 IOI",
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 28,
      position: 3,
      free: 48000,
      collection: "Common",
      name: "ZANDER",
      prize: "600 IOI",
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 29,
      position: 4,
      free: 96000,
      collection: "Common",
      name: "CYBORG",
      prize: "600 IOI",
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 30,
      position: 5,
      free: 192000,
      collection: "Common",
      name: "VULCANIC",
      prize: "600 IOI",
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 31,
      position: 24,
      collection: "Common rare",
      name: "LUNA",
      prize: "3 600 IOI",
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
      id: 32,
      position: 6,
      free: 288000,
      collection: "Super",
      name: "DORIAN",
      prize: "1 000 IOI",
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 33,
      position: 7,
      free: 432000,
      collection: "Super",
      name: "PANTHER",
      prize: "1 000 IOI",
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 34,
      position: 8,
      free: 648000,
      collection: "Super",
      name: "ONYX",
      prize: "1 000 IOI",
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 35,
      position: 9,
      free: 972000,
      collection: "Super",
      name: "ZANDER",
      prize: "1 000 IOI",
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 36,
      position: 10,
      free: 1458000,
      collection: "Super",
      name: "PYTHON",
      prize: "1 000 IOI",
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 37,
      position: 11,
      free: 2187000,
      collection: "Super",
      name: "VULCANIC",
      prize: "1 000 IOI",
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 38,
      position: 25,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      prize: "6 000 IOI",
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
      id: 39,
      position: 12,
      free: 3000000,
      collection: "Epic",
      name: "CYBORG",
      prize: "1 600 IOI",
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 40,
      position: 13,
      free: 3600000,
      collection: "Epic",
      name: "RHINO",
      prize: "1 600 IOI",
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 41,
      position: 14,
      free: 4320000,
      collection: "Epic",
      name: "HYPER",
      prize: "1 600 IOI",
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 42,
      position: 15,
      free: 5184000,
      collection: "Epic",
      name: "BULL",
      prize: "1 600 IOI",
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 43,
      position: 16,
      free: 6220000,
      collection: "Epic",
      name: "PYTHON",
      prize: "1 600 IOI",
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 44,
      position: 17,
      free: 7465000,
      collection: "Epic",
      name: "HITMAN",
      prize: "1 600 IOI",
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hitman",
    },
    {
      id: 45,
      position: 26,
      collection: "Epic rare",
      name: "MIDAS",
      prize: "9 600 IOI",
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
      id: 46,
      position: 18,
      free: 8200000,
      collection: "Legendary",
      name: "HYPER",
      prize: "2 600 IOI",
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 47,
      position: 19,
      free: 9000000,
      collection: "Legendary",
      name: "DORIAN",
      prize: "2 600 IOI",
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 48,
      position: 20,
      free: 9900000,
      collection: "Legendary",
      name: "VULCANIC",
      prize: "2 600 IOI",
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 49,
      position: 21,
      free: 10890000,
      collection: "Legendary",
      name: "BULL",
      prize: "2 600 IOI",
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 50,
      position: 22,
      free: 12000000,
      collection: "Legendary",
      name: "KNOCKOUT",
      prize: "2 600 IOI",
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car knockout",
    },
    {
      id: 51,
      position: 23,
      free: 13200000,
      collection: "Legendary",
      name: "LARA",
      prize: "2 600 IOI",
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car lara",
    },
    {
      id: 52,
      position: 27,
      collection: "Legendary rare",
      name: "BLUE STORM",
      prize: "15 600 IOI",
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
      id: 53,
      collection: "Special",
      name: "DAO Maker",
      link: "@TheDaoMaker",
      image: "car41",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car DAOMaker",
    },
    {
      id: 54,
      collection: "Special",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      image: "car42",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Cryptowizard",
    },
    {
      id: 55,
      collection: "Special",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      image: "car44",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Kyle Chasse",
    },
    {
      id: 56,
      collection: "Special",
      name: "Ash WSB",
      link: "@ashWSBreal",
      image: "car45",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Ash WSB",
    },
    {
      id: 57,
      collection: "Special",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      image: "car46",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Tehmoonwalker",
    },
    {
      id: 58,
      collection: "Special",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      image: "car47",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Parabolic Guy",
    },
    {
      id: 59,
      collection: "Special",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      image: "car50",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Altcoin Buzz",
    },
    {
      id: 60,
      collection: "Special",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      image: "car51",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Cryptowizard",
    },
    {
      id: 61,
      collection: "Special",
      name: "Kucoin",
      link: "@kucoincom",
      image: "car52",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Kucoin",
    },
    {
      id: 62,
      collection: "Special",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      image: "car53",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car QuickSwap",
    },
    {
      id: 63,
      collection: "Special",
      name: "Tech Giants",
      link: "@Crypto_giants",
      image: "car54",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Tech Giants",
    },
    {
      id: 64,
      collection: "Special",
      name: "Venly",
      link: "@Venly_io",
      image: "car55",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      rank: "low",
      amount: [],
      alt: "nft car Venly",
    },

    //RACERS
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
      id: 9,
      collection: "Special",
      name: "DAO Maker",
      link: "@TheDaoMaker",
      image: "dao-maker",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer DAOMaker",
    },
    {
      id: 10,
      collection: "Special",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      image: "polygon",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Polygon",
    },
    {
      id: 11,
      collection: "Special",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      image: "paid",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Kyle Chasse",
    },
    {
      id: 12,
      collection: "Special",
      name: "Ash WSB",
      link: "@ashWSBreal",
      image: "ash-wsb",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Ash WSB",
    },
    {
      id: 13,
      collection: "Special",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      image: "tehmoonwalker",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Tehmoonwalker",
    },
    {
      id: 14,
      collection: "Special",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      image: "parabolic-guy",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Parabolic Guy",
    },
    {
      id: 15,
      collection: "Special",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      image: "altcoin-buzz",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Altcoin Buzz",
    },
    {
      id: 16,
      collection: "Special",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      image: "cryptowizard",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Cryptowizard",
    },
    {
      id: 17,
      collection: "Special",
      name: "Kucoin",
      link: "@kucoincom",
      image: "kucoin",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Kucoin",
    },
    {
      id: 18,
      collection: "Special",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      image: "quickswap",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Quickswap",
    },
    {
      id: 19,
      collection: "Special",
      name: "Tech Giants",
      link: "@Crypto_giants",
      image: "techgiants",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Tech Giants",
    },
    {
      id: 20,
      collection: "Special",
      name: "Venly",
      link: "@Venly_io",
      image: "venly",
      type: "racer",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Venly",
    },
  ];

  title = "All";
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
  animationPaging = 5;
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
  inRow: number;
  sliceStart: number;
  sliceMiddle: number;
  newProducts: any;
  assetId: any;
  currentPage: number;
  maxPage: number;
  lastPage: number;
  isPaged: any;
  filter: any;
  myCarsvals = 0;
  carBonus: any;
  selectedId = 46;
  selectedType = "team";
  ownedItems: any;
  marketState = 1;

  @Input() depositFlow = false;

  @Output() data = new EventEmitter<{
    state: number;
    id: number;
    type: string;
    owned: number;
  }>();

  constructor(
    public router: Router,
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getMyCars();
  }
  ngOnChanges(): void {
    if (this.depositFlow === true) {
      this.filterAllDep();
    } else {
      this.filterAll();
    }
  }
  ngOnInit(): void {
    const that = this;
    this.getMyOldDriver();
    this.getMyBalance();
    this.calcCarsValue();
  }
  calcCarsValue() {
    for (let x = 0; x < this.myCars.length; x++) {
      if (this.myCars[x].car_id < 7 && this.myCars[x].car_id > 0) {
        this.myCarsvals += 600;
      }
      if (this.myCars[x].car_id >= 7 && this.myCars[x].car_id < 13) {
        this.myCarsvals += 1000;
      }
      if (this.myCars[x].car_id >= 13 && this.myCars[x].car_id < 19) {
        this.myCarsvals += 1600;
      }
      if (this.myCars[x].car_id >= 19 && this.myCars[x].car_id < 25) {
        this.myCarsvals += 2600;
      }
      if (this.myCars[x].car_id === 25) {
        this.myCarsvals += 3600;
      }
      if (this.myCars[x].car_id === 26) {
        this.myCarsvals += 6000;
      }
      if (this.myCars[x].car_id === 27) {
        this.myCarsvals += 9600;
      }
      if (this.myCars[x].car_id === 28) {
        this.myCarsvals += 15600;
      }
    }

    this.getCarBonus();
  }

  getCarBonus() {
    if (this.myCarsvals > 0 && this.myCarsvals < 1000) {
      this.carBonus = 6;
    }
    if (this.myCarsvals > 1000 && this.myCarsvals < 5000) {
      this.carBonus = 12;
    }
    if (this.myCarsvals > 5000 && this.myCarsvals < 10000) {
      this.carBonus = 18;
    }
    if (this.myCarsvals > 10000) {
      this.carBonus = 24;
    }
  }
  showAsset(state: number, id: number, type: string, owned: number) {
    this.marketState = state;
    this.selectedId = id;
    this.selectedType = type;
    this.ownedItems = owned;

    //emits
    this.data.emit({ state, id, type, owned });
  }
  showAssetBuy(state: number) {
    this.marketState = state;
  }

  get balanceHasChanged(): boolean {
    return this.balanceService.balanceChanged;
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
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
          if (objs.cars[x].car_id === 60) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 1) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 2) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 3) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 4) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 5) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 6) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 7) {
            this.products[8]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 8) {
            this.products[9]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 9) {
            this.products[10]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 10) {
            this.products[11]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 11) {
            this.products[12]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 12) {
            this.products[13]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 13) {
            this.products[15]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 14) {
            this.products[16]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 15) {
            this.products[17]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 16) {
            this.products[18]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 17) {
            this.products[19]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 18) {
            this.products[20]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 19) {
            this.products[22]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 20) {
            this.products[23]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 21) {
            this.products[24]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 22) {
            this.products[25]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 23) {
            this.products[26]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 24) {
            this.products[27]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 25) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 26) {
            this.products[14]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 27) {
            this.products[21]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 28) {
            this.products[28]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 41) {
            this.products[29]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 42) {
            this.products[30]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 44) {
            this.products[31]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 45) {
            this.products[32]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 46) {
            this.products[33]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 47) {
            this.products[34]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 50) {
            this.products[35]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 51) {
            this.products[36]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 52) {
            this.products[37]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 53) {
            this.products[38]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 54) {
            this.products[39]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 55) {
            this.products[40]["amount"].push(objs.cars[x]);
          }
        }

        for (let x = 0; x < objs.racers.length; x++) {
          if (objs.racers[x].car_id === 1) {
            this.products[41]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 2) {
            this.products[42]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 3) {
            this.products[43]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 4) {
            this.products[44]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 5) {
            this.products[45]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 6) {
            this.products[46]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 7) {
            this.products[47]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 8) {
            this.products[48]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 11) {
            this.products[49]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 12) {
            this.products[50]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 14) {
            this.products[51]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 15) {
            this.products[52]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 16) {
            this.products[53]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 17) {
            this.products[54]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 20) {
            this.products[55]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 21) {
            this.products[56]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 22) {
            this.products[57]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 23) {
            this.products[58]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 24) {
            this.products[59]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 25) {
            this.products[60]["amount"].push(objs.cars[x]);
          }
        }
        this.calcEditionNum();
        this.selectCar(objs);
        if (this.depositFlow === true) {
          this.filterAllDep();
        } else {
          this.filterAll();
        }

        this.sortingDone = true;
        this.allCars = objs.cars.length;
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

  width() {
    this.display = window.innerWidth;

    this.inRow = 8;
    this.maxPage = 8;
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);

    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
  }

  filterMobile() {
    if (this.mobileFilter === false) {
      this.mobileFilter = true;
    } else {
      this.mobileFilter = false;
    }
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
    this.title = "Tracks";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "track";
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
    this.title = "Specials";
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
    this.title = "All";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "all";
  }

  filterRacersDep() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "racer" && item["collection"] != "Special"
    );

    this.width();
    this.specialActive = false;
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

  filterCarsDep() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "car" && item["collection"] != "Special"
    );

    this.width();
    this.specialActive = false;
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
  filterTracksDep() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item["type"] === "track");

    this.width();
    this.specialActive = false;
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

  filterSpecialDep() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) => item["type"] === "special"
    );

    this.width();
    this.specialActive = true;
    this.racersActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = "Specials";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "racer";
  }
  filterAllDep() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter(
      (item) =>
        (item["type"] === "car" && item["collection"] != "Special") ||
        (item["type"] === "racer" && item["collection"] != "Special")
    );
    this.width();
    this.specialActive = false;
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = true;
    this.title = "All";
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    this.currentPage = 1;
    this.isPaged = 0;
    this.sliceStart = this.inRow * this.isPaged;
    this.sliceMiddle = this.inRow * this.currentPage;
    this.filter = "all";
  }

  back() {
    this.animation = 1;
    if (this.marketState === 1) {
      this.timeoutPrev = setTimeout(() => {
        this.router.navigate(["/race/start-race"]);
      }, 300);
    } else if (this.marketState === 2) {
      this.marketState = 1;
    } else if (this.marketState === 3) {
      this.marketState = 2;
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
