import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { ModuleWithProviders } from '@angular/core';
import { InitializeResolver } from '../user/services/initialize.resolver';

// pages


const routes: Routes = [
  {
    canActivate: [AuthUserGuard],
    component: SiteLayoutComponent,
    resolve: { init: InitializeResolver },
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'prefix' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
