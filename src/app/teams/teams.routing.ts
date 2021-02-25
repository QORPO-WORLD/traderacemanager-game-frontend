import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { ModuleWithProviders } from '@angular/core';

// pages
import { JoinTeamsComponent } from './join-teams/join-teams.component';


const routes: Routes = [

  {
    canActivate: [AuthUserGuard],
    component: SiteLayoutComponent,
    path: 'teams',
    children: [
      { path: '', redirectTo: 'join-teams', pathMatch: 'prefix' },
      { path: 'join-teams', component: JoinTeamsComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
