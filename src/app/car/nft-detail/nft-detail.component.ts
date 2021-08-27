import { Subscription } from "rxjs";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarsService } from "../../api/services/cars.service";

@Component({
  selector: "app-nft-detail",
  templateUrl: "./nft-detail.component.html",
  styleUrls: ["./nft-detail.component.scss"],
})
export class NftDetailComponent implements OnInit {
  loading = false;
  remainingAssets = [];
  assetsSubscribe: Subscription;
  @Input() assetInfo: Array<any>;
  @Output() marketState = new EventEmitter<number>();
  constructor(private api: CarsService) {}
  ngOnInit() {
    this.getRemainingCars();
  }
  getRemainingCars() {
    this.assetsSubscribe = this.api.carsShowroomList().subscribe((data) => {
      const objs: any = data;
      const cars: any = objs.remaining_cars_by_tier;
      const racers: any = objs.remaining_racers_by_tier;
      const bundles: any = objs.remaining_packs_by_tier;
      if (this.assetInfo[0].type === "car") {
        this.remainingAssets = cars;
        this.remainingAssets = this.remainingAssets.filter(
          (item) => item.tier === this.assetInfo[0].tier
        );
        if (this.remainingAssets.length === 0) {
          this.remainingAssets = [
            {
              count: 0,
            },
          ];
        }
      } else if (this.assetInfo[0].type === "racer") {
        this.remainingAssets = racers.filter(
          (item) => item.tier === this.assetInfo[0].tier
        );
        if (this.remainingAssets.length === 0) {
          this.remainingAssets = [
            {
              count: 0,
            },
          ];
        }
      } else if (this.assetInfo[0].type === "bundle") {
        this.remainingAssets = bundles.filter(
          (item) => item.tier === this.assetInfo[0].tier
        );
        if (this.remainingAssets.length === 0) {
          this.remainingAssets = [
            {
              count: 0,
            },
          ];
        }
      }
    });
  }
  changeMarketState(id: number) {
    this.marketState.emit(id);
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
