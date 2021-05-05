import { BinaryRaceComponent } from './components/binary-race/binary-race.component';
import { UnityraceComponent } from './unityrace/unityrace.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { OrderModule } from 'ngx-order-pipe';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRacesComponent } from './pages/all-races/all-races.component';
import { RaceTypeComponent } from './pages/race-type/race-type.component';
import { WatchRaceShortComponent } from './components/watch-race-short/watch-race-short.component';
import { CommonModule as ninja } from '../common/common.module';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { RaceLayoutComponent } from '../common/components/layout/race-layout/race-layout.component';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { OthersModule } from '../others/others.module';
import { StartRaceComponent } from './pages/start-race/start-race.component';
import { CarModule } from '../car/car.module';
import { MiniLdrbrdComponent } from './components/mini-ldrbrd/mini-ldrbrd.component';
import { BinaryInitialSelectionComponent } from './components/binary-initial-selection/binary-initial-selection.component';
import { ChartModule } from 'angular-highcharts';
import { BinaryWinnerComponent } from './components/binary-winner/binary-winner.component';
import { BinaryTradeComponent } from './components/binary-trade/binary-trade.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: '', redirectTo: 'start-race', pathMatch: 'full'
      },
      {
        path: 'start-race', component: StartRaceComponent
      },
      {
        path: 'all-races', component: AllRacesComponent
      },
      {
        path: 'race-type', component: RaceTypeComponent
      }
    ]
  },
  {
    canActivate: [AuthUserGuard],
    path: '',
    component: RaceLayoutComponent,
    children: [
      {
        path: '', redirectTo: 'start-race', pathMatch: 'full'
      },
      { path: 'watch-race-3min/:id', component: WatchRaceShortComponent },
      { path: 'watch-multiple-races', component: MultiViewComponent },
      { path: 'binary-fuel', component: BinaryInitialSelectionComponent },
      { path: 'binary-race/:id', component: BinaryRaceComponent },
      { path: 'binary-trade/:id', component: BinaryTradeComponent }
    ]
  }
];

@NgModule({
  declarations: [AllRacesComponent, WatchRaceShortComponent,
    StartRaceComponent, MiniLdrbrdComponent,
    MultiViewComponent, RaceTypeComponent, UnityraceComponent,
    BinaryInitialSelectionComponent,MultiViewComponent, RaceTypeComponent, UnityraceComponent, 
    BinaryRaceComponent, BinaryWinnerComponent, BinaryTradeComponent],
  imports: [
    CommonModule,
    ninja,
    OthersModule,
    RouterModule.forChild(routes),
    CarModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    OrderModule,
    ChartModule
  ]
})
export class RaceModule { }
