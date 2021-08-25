import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NftsService } from "../../../api/services/nfts.service";

@Component({
  selector: "app-home-bundle-detail",
  templateUrl: "./home-bundle-detail.component.html",
  styleUrls: ["./home-bundle-detail.component.scss"],
})
export class HomeBundleDetailComponent implements OnInit {
  products = [];
  infoRoi = false;
  infoRoiYearly = false;
  position: number;

  displayArray = [];
  @Input() assetType = "bundle";
  @Input() assetId = 1;
  @Input() assetPosition = 1;
  @Output() modalActive = new EventEmitter<number>();
  @Output() marketState = new EventEmitter<number>();

  noGifActive = true;
  gifName = "";
  animationActive = false;
  timer = null;

  timer2 = null;

  constructor(private api: NftsService) {
    this.products = this.api.getAssets();
  }

  ngOnInit() {
    this.resolveShowAsset();
  }

  showAnimation() {
    this.animationActive = false;
    this.noGifActive = true;
    this.gifName = "none1";
    this.timer2 = setTimeout(() => {
      this.gifName = "black-trm-animation";
      this.animationActive = true;
      this.noGifActive = false;
    }, 1);
    this.timer = setTimeout(() => {
      this.animationActive = false;
      this.gifName = "none1";
      this.noGifActive = true;
    }, 6500);
  }

  activateAnimation() {
    clearTimeout(this.timer2);
    clearTimeout(this.timer);
    this.showAnimation();
  }

  resolveShowAsset() {
    this.displayArray = this.products.filter(
      (asset) => asset["id"] === this.assetId
    );
    this.position = this.displayArray[0]["tier"];
  }

  showBuyModal() {
    this.marketState.emit(3);
  }

  showModal(p) {
    this.modalActive.emit(p);
  }
  back() {
    {
      this.marketState.emit(1);
    }
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
