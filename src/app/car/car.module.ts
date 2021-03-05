import { EditFastFuelCarComponent } from './../common/components/shared/edit-fast/edit-fast.component';
import { FavouriteCarsComponent } from './favourite-cars/favourite-cars.component';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { BuyCarsComponent } from './buy-cars/buy-cars.component';
import { FuelCarComponent } from './fuel-car/fuel-car.component';
import { RefuelCarComponent } from './refuel-car/refuel-car.component';
import { GaragePromBannerComponent } from './garage-prom-banner/garage-prom-banner.component';
import { CommonModule as ninja } from '../common/common.module';
import { CommonModule } from '@angular/common';
import { RaceLayoutComponent } from '../common/components/layout/race-layout/race-layout.component';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { OrderModule } from 'ngx-order-pipe';
import { IonicModule } from '@ionic/angular';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { DragScrollModule } from 'ngx-drag-scroll';

const routes: Routes = [
  {
    path: '',
    component: RaceLayoutComponent,
    children: [
      { path: '', redirectTo: 'garage/my-car', pathMatch: 'prefix' },
      { path: 'fuel-car/:id', component: FuelCarComponent }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', redirectTo: 'garage/my-car', pathMatch: 'prefix' },
      { path: 'garage', component: BuyCarsComponent },
      { path: 'garage/my-cars', component: MyCarsComponent },
      { path: 'favourite-cars', component: FavouriteCarsComponent }
    ]
  }
];
@NgModule({
  declarations: [BuyCarsComponent, FuelCarComponent, GaragePromBannerComponent,
    MyCarsComponent, RefuelCarComponent,
    FavouriteCarsComponent, EditFastFuelCarComponent],
  imports: [
    CommonModule,
    ninja,
    RouterModule.forChild(routes),
    FormsModule,
    OrderModule,
    IonicModule,
    DragScrollModule
  ],
  exports: [RefuelCarComponent]
})
export class CarModule { }
