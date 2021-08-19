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
import { NftsService } from "../../../api/services/nfts.service";

@Component({
  selector: "app-my-nft",
  templateUrl: "./my-nft.component.html",
  styleUrls: ["./my-nft.component.scss"],
})
export class MyNftComponent implements OnInit, OnChanges {
  loading = true;
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
  animateArrow = false;
  animateArrowRight = false;

  products = [];
  assets = [];
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
  totalNfts = 0;
  typeObserver: Subscription;
  assetType: any;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;
  choosedAsset = [];
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  specialActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  assetsOnPage = 8;
  sliceStart: number;
  sliceEnd: number;
  newProducts: any;
  assetId: any;
  page: number;
  maxPage: number;
  lastPage: number;
  isPaged: any;
  filter: any;
  myCarsvals = 0;
  carBonus: any;
  selectedId = 46;
  selectedType = "team";
  ownedItems: any;
  @Input() depositFlow = false;
  @Output() marketState = new EventEmitter<number>();
  @Output() data = new EventEmitter<Array<any>>();

  constructor(
    private apin: NftsService,
    public router: Router,
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getMyAssets();
  }
  ngOnInit() {}
  ngOnChanges(): void {
    if (this.depositFlow === true) {
      this.filterType(this.products, "all", false, true);
    } else {
      this.filterType(this.products, "all", false, false);
    }
  }

  filterType(
    entry: Array<any>,
    type: string,
    bundles: boolean,
    deposit: boolean
  ) {
    this.page = 1;
    this.sliceStart = 0;
    this.sliceEnd = this.assetsOnPage;
    let sortedProducts = entry;
    if (type === "all") {
      if (bundles === false) {
        deposit === false
          ? (sortedProducts = entry.filter(
              (item) => item.type !== "bundle" && item.amount > 0
            ))
          : (sortedProducts = entry.filter((item) => item.type !== "bundle"));
      } else {
        deposit === false
          ? (sortedProducts = entry.filter((item) => item.amount > 0))
          : (sortedProducts = entry);
      }
    } else {
      if (bundles === false) {
        deposit === false
          ? (sortedProducts = entry.filter(
              (item) =>
                item.type === type && item.type !== "bundle" && item.amount > 0
            ))
          : (sortedProducts = entry.filter(
              (item) => item.type === type && item.type !== "bundle"
            ));
      } else {
        deposit === false
          ? (sortedProducts = entry.filter(
              (item) => item.type === type && item.amount > 0
            ))
          : (sortedProducts = entry.filter((item) => item.type === type));
      }
    }

    this.title = type;
    this.newProducts = sortedProducts;
    this.lastPage = Math.ceil(this.newProducts.length / this.assetsOnPage);
  }

  chooseAsset(id: number) {
    this.choosedAsset = this.newProducts.filter((item) => item.id === id);
    this.data.emit(this.choosedAsset);
    this.showMarketState(2);
  }
  showMarketState(id: number) {
    this.marketState.emit(id);
  }

  get balanceHasChanged(): boolean {
    return this.balanceService.balanceChanged;
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }
  getMyAssets() {
    this.assets = this.apin.getAssets();
    this.products = this.assets;
    for (let k = 0; k < this.products.length; k++) {
      this.products[k].amount = 0;
    }
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      const objsx: any = data;
      const myCars: any = objsx.cars_by_tier;
      const myRacers: any = objsx.racers_by_tier;

      for (const [key, value] of Object.entries(myCars)) {
        for (let y = 0; y < this.products.length; y++) {
          if (
            +key === this.products[y].tier &&
            this.products[y].type === "car"
          ) {
            this.products[y].amount = +value;
          }
        }
      }
      for (const [key, value] of Object.entries(myRacers)) {
        for (let y = 0; y < this.products.length; y++) {
          if (
            +key === this.products[y].tier &&
            this.products[y].type === "racer"
          ) {
            this.products[y].amount = +value;
          }
        }
      }

      console.log(this.assets);
      console.log("Pridelovanie assetov");
      this.filterType(this.products, "all", false, false);
      this.loading = false;
    });
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

  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  timeoutReset() {
    clearTimeout(this.timeoutPage);
  }
  pagination(type: string) {
    if (type === "plus") {
      this.animationPaging = 2;
      const timeout = window.setTimeout(() => {
        this.animationPaging = 3;
        this.page < this.lastPage ? this.page++ : null;
        this.sliceStart = (this.page - 1) * this.assetsOnPage;
        this.sliceEnd = this.page * this.assetsOnPage;
        clearTimeout(timeout);
      }, 300);
    } else if (type === "minus") {
      this.animationPaging = 4;
      const timeout = window.setTimeout(() => {
        this.animationPaging = 1;
        this.page > 1 ? this.page-- : null;
        this.sliceStart = (this.page - 1) * this.assetsOnPage;
        this.sliceEnd = this.page * this.assetsOnPage;
        clearTimeout(timeout);
      }, 300);
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
