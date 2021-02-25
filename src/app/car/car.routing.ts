import { FuelCarComponent } from './fuel-car/fuel-car.component';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { ModuleWithProviders } from '@angular/core';
import { BuyCarsComponent } from './buy-cars/buy-cars.component';


const routes: Routes = [
  {
    canActivate: [AuthUserGuard],
    component: SiteLayoutComponent,
    path: 'car',
    children: [
      { path: '', redirectTo: 'buy-cars', pathMatch: 'prefix' },
      { path: 'buy-cars', component: BuyCarsComponent },
      { path: 'fuel-car/:id', component: FuelCarComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
