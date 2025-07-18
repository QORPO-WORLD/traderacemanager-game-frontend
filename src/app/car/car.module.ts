
import { FavouriteCarsComponent } from "./favourite-cars/favourite-cars.component";

import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { FuelCarComponent } from "./fuel-car/fuel-car.component";
import { RefuelCarComponent } from "./refuel-car/refuel-car.component";
import { CommonModule as ninja } from "../common/common.module";
import { CommonModule } from "@angular/common";
import { RaceLayoutComponent } from "../common/components/layout/race-layout/race-layout.component";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { OrderModule } from "ngx-order-pipe";
import { IonicModule } from "@ionic/angular";
import { DragScrollModule } from "ngx-drag-scroll";
import { NftMarketComponent } from "./nft-market/nft-market.component";
import { NftDetailComponent } from "./nft-detail/nft-detail.component";
import { BuyNftComponent } from "./buy-nft/buy-nft.component";
import { FuelLayoutComponent } from "../common/components/layout/fuel-layout/fuel-layout.component";

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "", redirectTo: "garage/my-cars", pathMatch: "prefix" },
      { path: "fuel-car/:id", component: FuelCarComponent },
    ],
  },
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "", redirectTo: "garage/my-cars", pathMatch: "prefix" },
      { path: "favourite-cars", component: FavouriteCarsComponent },
      { path: "nft-market", component: NftMarketComponent },
    ],
  },
];
@NgModule({
  declarations: [
    FuelCarComponent,
    RefuelCarComponent,
    FavouriteCarsComponent,
    NftMarketComponent,
    NftDetailComponent,
    BuyNftComponent,
  ],
  imports: [
    CommonModule,
    ninja,
    RouterModule.forChild(routes),
    FormsModule,
    OrderModule,
    IonicModule,
    DragScrollModule,
  ],
  exports: [RefuelCarComponent],
})
export class CarModule {}
