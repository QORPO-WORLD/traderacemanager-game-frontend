import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-home-nft-detail",
  templateUrl: "./home-nft-detail.component.html",
  styleUrls: ["./home-nft-detail.component.scss"],
})
export class HomeNftDetailComponent implements OnInit {
  loading = false;
  infoRoi = false;
  infoRoiYearly = false;
  remainingAssets = [];
  @Input() assetInfo: Array<any>;
  @Output() marketState = new EventEmitter<number>();
  constructor() {}
  ngOnInit() {}

  changeMarketState(id: number) {
    this.marketState.emit(id);
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
