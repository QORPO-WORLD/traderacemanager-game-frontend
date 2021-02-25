import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as ninja} from '../common/common.module';
import { LeaderboardPlayersComponent } from './pages/leaderboard-players/leaderboard-players.component';
import { LeaderboardTeamsComponent } from './pages/leaderboard-teams/leaderboard-teams.component';
import { LeaderboardWinnerComponent } from './pages/leaderboard-winner/leaderboard-winner.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: '', redirectTo: 'players', pathMatch: 'prefix'
      },
      {
        path: 'players', component: LeaderboardPlayersComponent
      },
      {
        path: 'players-winners', component: LeaderboardWinnerComponent
      },
      {
        path: 'teams', component: LeaderboardTeamsComponent
      }
    ]
  }
];


@NgModule({
  declarations: [LeaderboardPlayersComponent, LeaderboardTeamsComponent, LeaderboardWinnerComponent],
  imports: [
    CommonModule,
    ninja,
    RouterModule.forChild(routes)
  ]
})
export class LeaderboardModule { }
