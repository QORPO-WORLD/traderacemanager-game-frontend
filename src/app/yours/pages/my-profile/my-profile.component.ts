import { first } from "rxjs/operators";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { flushMicrotasks } from "@angular/core/testing";
import { AffiliatesService, CarsService } from "../../../api/services";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/user/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  data = { state: 1, id: 1, type: "car", owned: 0 };
  assetInfo = [];
  ownedItems: number;
  timeoutPrev: any;
  timeoutNext: any;
  animation = 0;
  title = "mynfts";
  getContent: any;
  getSecondContent: any;
  typeObserver: Subscription;
  display = window.innerWidth;
  firstShow = "menu";
  show = "nfts";
  showSecond: string;
  myDriverStats: any;
  selectedId = 1;
  selectedType = "racer";

  mobileMenu = true;
  depositFlow = false;
  affiliate: any;
  state = 1;
  ownedRacers: any;
  myCarsObserver: Subscription;
  @Input() marketState = 1;
  products: Array<object> = [
    //bronze

    {
      id: 1,
      collection: "Super",
      name: "Axle",
      price: 100,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Axle",
      likes: "2k",
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      price: 100,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Flash",
      likes: "2k",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      price: 100,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Octane",
      likes: "2k",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      price: 100,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Punisher",
      likes: "2k",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 1000,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Lady Rich",
      likes: "2k",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 1000,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Rich Junior",
      likes: "2k",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 1000,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Mrs. Rich",
      likes: "2k",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 10000,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
      alt: "nft racer mr. rich",
      likes: "2k",
    },
  ];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private identityService: AuthService,
    protected affisrvc: AffiliatesService,
    private capi: CarsService
  ) {}

  ngOnInit() {
    this.getMyAssets();
    this.getAssetType();
    this.getMyLevel();
    this.getMydriver();
    this.width();
  }
  getMyLevel() {
    this.affiliate = this.identityService.getStorageAff();
  }
  activatePage(p: string) {
    this.show = p;
  }
  activateSecondPage(p) {
    this.showSecond = p;
  }
  width() {
    this.display = window.innerWidth;
  }
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }
  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.getContent = params["controlType"];
      this.getSecondContent = params["secondControlType"];

      if (!this.getContent) {
        this.getContent = "menu";
      }

      this.firstShow = this.getContent;
      this.show = this.getContent;
      this.showSecond = this.getSecondContent;
    });
  }

  back() {
    this.animation = 1;
    if (screen.availHeight > screen.availWidth) {
      if (this.mobileMenu === true && this.marketState != 2) {
        this.timeoutPrev = setTimeout(() => {
          this.router.navigate(["/race/start-race"]);
          this.timeoutReset();
        }, 300);
      } else if (this.marketState === 2) {
        this.marketState = 1;
      } else {
        this.mobileMenu = true;
      }
    } else {
      if (this.title === "mynfts" && this.marketState != 2) {
        this.timeoutPrev = setTimeout(() => {
          this.router.navigate(["/race/start-race"]);
          this.timeoutReset();
        }, 300);
        //MY-NFTS BACKING
      }
      if (this.title === "mynfts" && this.marketState === 2) {
        this.timeoutPrev = setTimeout(() => {
          this.marketState = 1;
          this.timeoutReset();
        }, 300);
      }
      if (this.title != "mynfts") {
        this.timeoutPrev = setTimeout(() => {
          this.router.navigate(["/race/start-race"]);
          this.timeoutReset();
        }, 300);
      }
    }
  }

  timeoutReset() {
    clearTimeout(this.timeoutNext);
    clearTimeout(this.timeoutPrev);
  }
  logout() {
    this.identityService.logout();
  }
  getNewState(state: number) {
    this.state = state;
  }
  resolveMarketAsset(data: Array<any>) {
    this.assetInfo = data;
  }
  resolveDetailAsset(state: number) {
    this.marketState = state;
  }
  toggleDeposit() {
    this.title = "null";
    this.title = "mynfts";
    this.depositFlow = true;
    this.mobileMenu = false;
    this.marketState = 1;
  }
  filterHighestValue() {
    //highest price racer
    const maxValueOfRacer = Math.max(
      ...this.ownedRacers.map((o) => o.price),
      0
    );

    this.ownedRacers = this.ownedRacers.filter(
      (item) => item["price"] === maxValueOfRacer
    );
  }
  filterMyAssets() {
    this.ownedRacers = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "racer"
    );
  }

  getMyAssets() {
    this.myCarsObserver = this.capi.carsMineList().subscribe((data) => {
      if (data.length === 0) {
        null;
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.racers.length; x++) {
          if (objs.racers[x].car_id === 1) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 2) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 3) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 4) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 5) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 6) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 7) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 8) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
        }
      }
      this.filterMyAssets();
      this.filterHighestValue();
    });
  }
}
