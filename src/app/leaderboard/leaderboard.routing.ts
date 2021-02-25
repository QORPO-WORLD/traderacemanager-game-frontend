import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { LeaderboardTeamsComponent } from './pages/leaderboard-teams/leaderboard-teams.component';
import { LeaderboardWinnerComponent } from './pages/leaderboard-winner/leaderboard-winner.component';
import { LeaderboardPlayersComponent } from './pages/leaderboard-players/leaderboard-players.component';


import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { ModuleWithProviders } from '@angular/core';
import { InitializeResolver } from '../user/services/initialize.resolver';


const routes: Routes = [
  {
    canActivate: [AuthUserGuard],
    component: SiteLayoutComponent,
    path: 'leaderboard',
    children: [
      { path: '', redirectTo: 'players', pathMatch: 'prefix' },
      { path: 'players', component: LeaderboardPlayersComponent },
      { path: 'players-winners', component: LeaderboardWinnerComponent },
      { path: 'teams', component: LeaderboardTeamsComponent },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
