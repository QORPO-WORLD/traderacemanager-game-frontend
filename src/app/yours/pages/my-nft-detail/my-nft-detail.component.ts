import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-my-nft-detail",
  templateUrl: "./my-nft-detail.component.html",
  styleUrls: ["./my-nft-detail.component.scss"],
})
export class MyNftDetailComponent implements OnInit {
  infoRoi = false;
  infoRoiYearly = false;
  @Input() assetInfo: Array<any>;
  @Output() marketState = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  backToProducts() {
    this.marketState.emit(1);
  }
}
