
import { BridgeComponent } from './../bridge/bridge.component';
import { ConfirmWithdrawalComponent } from './confirm-withdrawal/confirm-withdrawal.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { AffilateComponent } from './pages/affilate/affilate.component';
import { routing } from './others.routing';
import { CommonModule } from '../common/common.module';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { CommonModule as ninja } from '@angular/common';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { PromotionsBannerComponent } from './components/promotions-banner/promotions-banner.component';
import { DailyTasksComponent } from './components/daily-tasks/daily-tasks.component';
import { FormsModule } from '@angular/forms';
import { AnQrcodeModule } from 'an-qrcode';
import { AboutTokensComponent } from './pages/about-tokens/about-tokens.component';
import { WalletControllerComponent } from './pages/wallet-controller/wallet-controller.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { TransferNftComponent } from './pages/transfer-nft/transfer-nft.component';

const routes: Routes = [

  /*{ path: '', redirectTo: 'affilate', pathMatch: 'prefix' },*/
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: '', redirectTo: 'rewards', pathMatch: 'full'
      },
      {
        path: 'about-tokens/rewards', component: RewardsComponent
      },
      {
        path: 'affilate', component: AffilateComponent
      },
      {
        path: 'about-tokens', component: AboutTokensComponent
      },
      {
        path: 'promotions', component: PromotionsComponent
      },
      {
        path: 'tasks', component: DailyTasksComponent
      },
      {
        path: 'confirm/:id', component: ConfirmWithdrawalComponent
      },
      {
        path: 'loading', component: BridgeComponent
      },
      {
        path: 'wallet-control', component: WalletControllerComponent
      },
      {
        path: 'transfer-nft', component: TransferNftComponent
      }
    ]
  }
];
@NgModule({
  declarations: [RewardsComponent, AffilateComponent,
    PromotionsComponent, ConfirmWithdrawalComponent, PromotionsBannerComponent,
    DailyTasksComponent, BridgeComponent,
    AboutTokensComponent, WalletControllerComponent, TransferNftComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ninja,
    FormsModule,
    AnQrcodeModule,
    JwSocialButtonsModule
  ],
  providers: [
    SocialSharing
  ],
  exports: [
    PromotionsBannerComponent
  ]
})
export class OthersModule { }
