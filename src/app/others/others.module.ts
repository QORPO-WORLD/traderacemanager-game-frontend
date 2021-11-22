import { MaintenanceComponent } from "../common/components/maintenance/maintenance.component";
import { ContactListComponent } from "./../other/components/contact-list/contact-list.component";
import { BridgeComponent } from "./../bridge/bridge.component";
import { ConfirmWithdrawalComponent } from "./confirm-withdrawal/confirm-withdrawal.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
//import { RewardsComponent } from "./pages/rewards/rewards.component";
import { AffilateComponent } from "./pages/affilate/affilate.component";
import { routing } from "./others.routing";
import { CommonModule } from "../common/common.module";
import { CommonModule as ninja } from "@angular/common";
import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { HomepageLayoutComponent } from "../common/components/layout/homepage-layout/homepage-layout.component";
//import { DailyTasksComponent } from "./components/daily-tasks/daily-tasks.component";
import { FormsModule } from "@angular/forms";
import { AnQrcodeModule } from "an-qrcode";
import { WalletControllerComponent } from "./pages/wallet-controller/wallet-controller.component";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { JwSocialButtonsModule } from "jw-angular-social-buttons";
import { TransferNftComponent } from "./pages/transfer-nft/transfer-nft.component";
import { DepositNftComponent } from "./pages/deposit-nft/deposit-nft.component";
import { WithdrawNftComponent } from "./pages/withdraw-nft/withdraw-nft.component";
import { ContactsStaticComponent } from "./contacts-static/contacts-static.component";
import { MyReferralsComponent } from "./pages/my-referrals/my-referrals.component";
import { IonicModule } from "@ionic/angular";
import { DownloadGameComponent } from "./pages/download-game/download-game.component";

const routes: Routes = [
  /*{ path: '', redirectTo: 'affilate', pathMatch: 'prefix' },*/
  {
    path: "maintenance",
    component: MaintenanceComponent,
  },
  {
    path: "",
    component: HomepageLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: "",
        redirectTo: "/other/download",
        pathMatch: "full",
      },
      {
        path: "download",
        component: DownloadGameComponent,
      }
    ],
  },
];
@NgModule({
  declarations: [
    //RewardsComponent,
    AffilateComponent,
    ConfirmWithdrawalComponent,
    //DailyTasksComponent,
    BridgeComponent,
    WalletControllerComponent,
    TransferNftComponent,
    DepositNftComponent,
    WithdrawNftComponent,
    ContactListComponent,
    ContactsStaticComponent,
    MyReferralsComponent,
    MaintenanceComponent,
    DownloadGameComponent
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
  exports: [ AffilateComponent],
})
export class OthersModule {}
