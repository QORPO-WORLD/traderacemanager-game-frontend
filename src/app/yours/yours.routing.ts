import { TransactionsComponent } from './../yours/pages/transactions/transactions.component';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { MyRacesComponent } from './pages/my-races/my-races.component';


const routes: Routes = [

  {
    path: 'your-races',
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'my-races',
        component: MyRacesComponent
      }
    ]
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
