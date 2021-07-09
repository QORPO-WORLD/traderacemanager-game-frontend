import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as ninja } from '../common/common.module';
import { OthersModule } from '../others/others.module';
import { TranslateModule } from '@ngx-translate/core';

import { JoinTeamsComponent } from './join-teams/join-teams.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { LeaderboardComponent} from './leaderboard/leaderboard.component';
import {OwnersManagersComponent} from './owners-managers/owners-managers.component';

import { MyTeamPlayersComponent } from './components/my-team-players/my-team-players.component';
import { AllPlayersComponent } from './components/all-players/all-players.component';
import { OwnerLeaderboardComponent } from './components/owner-leaderboard/owner-leaderboard.component';
import { ManagerComponent} from './components/manager/manager.component';
import { OwnerComponent } from './components/owner/owner.component';
import { BestRacersComponent } from './best-racers/best-racers.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { RaceModule } from '../race/race.module';



const routes: Routes = [
  {

    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: '', redirectTo: 'join-teams', pathMatch: 'prefix'
      },
      {
        path: 'join-teams', component: JoinTeamsComponent
      },
      {
        path: 'my-team', component: MyTeamComponent
      },
      { 
        path: 'leaderboard', component: LeaderboardComponent
      },
      { 
        path: 'owners-managers', component: OwnersManagersComponent
      },
      { 
        path: 'best-racers', component: BestRacersComponent
      }
    ]
  }
];
@NgModule({
  declarations: [JoinTeamsComponent, MyTeamComponent,
  MyTeamPlayersComponent, LeaderboardComponent,
  AllPlayersComponent, OwnersManagersComponent,OwnerComponent, ManagerComponent,
  OwnerLeaderboardComponent, BestRacersComponent],
  imports: [
    CommonModule,
    ninja,
    RaceModule,
    OthersModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class TeamsModule { }
