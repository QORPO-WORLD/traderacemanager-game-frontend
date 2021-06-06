import { first } from "rxjs/operators";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { flushMicrotasks } from "@angular/core/testing";
import { AffiliatesService } from "../../../api/services";
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
  marketState = 1;
  mobileMenu = true;

  affiliate: any;
  state = 1;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private identityService: AuthService,
    protected affisrvc: AffiliatesService
  ) {}

  ngOnInit() {
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
  getNewState(state: number) {
    this.state = state;
  }
  resolveMarketAsset(data) {
    this.data = data;

    this.marketState = this.data.state;
    this.selectedId = this.data.id;
    this.selectedType = this.data.type;
    this.ownedItems = this.data.owned;

    console.log(this.marketState);
    console.log(this.selectedId);
    console.log(this.selectedType);
    console.log(this.ownedItems);
  }
  resolveDetailAsset(state: number) {
    this.marketState = state;
  }
}
