import { ContactListComponent } from "./../other/components/contact-list/contact-list.component";
import { BridgeComponent } from "./../bridge/bridge.component";
import { ConfirmWithdrawalComponent } from "./confirm-withdrawal/confirm-withdrawal.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RewardsComponent } from "./pages/rewards/rewards.component";
import { AffilateComponent } from "./pages/affilate/affilate.component";
import { routing } from "./others.routing";
import { CommonModule } from "../common/common.module";
import { CommonModule as ninja } from "@angular/common";
import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { DailyTasksComponent } from "./components/daily-tasks/daily-tasks.component";
import { FormsModule } from "@angular/forms";
import { AnQrcodeModule } from "an-qrcode";
import { AboutTokensComponent } from "./pages/about-tokens/about-tokens.component";
import { WalletControllerComponent } from "./pages/wallet-controller/wallet-controller.component";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { JwSocialButtonsModule } from "jw-angular-social-buttons";
import { TransferNftComponent } from "./pages/transfer-nft/transfer-nft.component";
import { DepositNftComponent } from "./pages/deposit-nft/deposit-nft.component";
import { WithdrawNftComponent } from "./pages/withdraw-nft/withdraw-nft.component";
import { ContactsStaticComponent } from "./contacts-static/contacts-static.component";
import { MyReferralsComponent } from "./pages/my-referrals/my-referrals.component";
import { IonicModule } from "@ionic/angular";

const routes: Routes = [
  /*{ path: '', redirectTo: 'affilate', pathMatch: 'prefix' },*/
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: "",
        redirectTo: "rewards",
        pathMatch: "full",
      },
      {
        path: "rewards",
        component: RewardsComponent,
      },
      {
        path: "affilate",
        component: AffilateComponent,
      },
      {
        path: "about-tokens",
        component: AboutTokensComponent,
      },
      {
        path: "tasks",
        component: DailyTasksComponent,
      },
      {
        path: "confirm/:id",
        component: ConfirmWithdrawalComponent,
      },
      {
        path: "loading",
        component: BridgeComponent,
      },
      {
        path: "wallet-control",
        component: WalletControllerComponent,
      },
      {
        path: "transfer-nft",
        component: TransferNftComponent,
      },
      {
        path: "deposit-nft",
        component: DepositNftComponent,
      },
      {
        path: "withdraw-nft",
        component: WithdrawNftComponent,
      },
      {
        path: "contats",
        component: ContactsStaticComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    RewardsComponent,
    AffilateComponent,
    ConfirmWithdrawalComponent,
    DailyTasksComponent,
    BridgeComponent,
    AboutTokensComponent,
    WalletControllerComponent,
    TransferNftComponent,
    DepositNftComponent,
    WithdrawNftComponent,
    ContactListComponent,
    ContactsStaticComponent,
    MyReferralsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ninja,
    FormsModule,
    AnQrcodeModule,
    JwSocialButtonsModule,
    IonicModule,
  ],
  providers: [SocialSharing],
  exports: [AboutTokensComponent, AffilateComponent, RewardsComponent],
})
export class OthersModule {}
