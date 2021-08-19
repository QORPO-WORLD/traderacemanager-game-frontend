import { NftsService } from "../../api/services/nfts.service";
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
  animation = 0;
  marketState = 1;
  selectedId = 1;
  assetsOnPage = 8;
  assets = [];
  choosedAsset = [];
  animationPaging = 0;
  filteredAssets = [];
  title: string;
  sliceStart = 0;
  sliceEnd = this.assetsOnPage;
  page = 1;
  lastPage: any;
  timeoutPage: any;
  animateArrowLeft = false;
  animateArrowRight = false;
  subb: Subscription;
  constructor(
    private api: NftsService,
    private apin: CarsService,
    private router: Router
  ) {
    this.assets = this.api.getAssets();
  }
  ngOnInit() {
    this.activateFilter("all");
  }
  activateFilter(type: string) {
    this.page = 1;
    this.sliceStart = 0;
    this.sliceEnd = this.assetsOnPage;
    if (type === "all") {
      this.filteredAssets = this.assets;
      this.filteredAssets = this.filteredAssets.filter(
        (item) => item.collection !== "Special"
      );
      this.title = type;
    } else {
      this.filteredAssets = this.api.filterType(this.assets, type, false);
      this.title = type;
    }
    this.lastPage = Math.ceil(this.filteredAssets.length / this.assetsOnPage);
  }
  showAsset(state: number, id: number) {
    this.marketState = state;
    this.selectedId = id;
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
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  chooseAsset(id: number, state: number) {
    this.choosedAsset = this.filteredAssets.filter((item) => item.id === id);
    this.showMarketState(state);
  }
  showMarketState(id: number) {
    this.marketState = id;
  }
  back() {
    if (this.marketState === 1) {
      this.router.navigate(["/race/start-race"]);
    } else if (this.marketState === 2) {
      this.marketState = 1;
    } else if (this.marketState === 3) {
      this.marketState = 2;
    }
  }
}
