import { MetaBuyComponent } from "./components/meta-buy/meta-buy.component";
import { IoiloaderComponent } from "./components/ioiloader/ioiloader.component";
import { SynergizerComponent } from "./../synergizer/synergizer.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { MyRacesAdComponent } from "./components/shared/my-races-ad/my-races-ad.component";
import { CreateFastFuelCarComponent } from "./components/shared/create-fast/create-fast.component";
import { BalanceService } from "./services/balance.service";
import { QuickDepositComponent } from "./components/quick-deposit/quick-deposit.component";
import { QuickTransferComponent } from "./components/quick-transfer/quick-transfer.component";
import { QuickWithdrawComponent } from "./components/quick-withdraw/quick-withdraw.component";
import { PlatformService } from "./services/platform.service";
import { NotifyService } from "./services/notify.service";
import { HttpClientModule } from "@angular/common/http";
import { NotifiqComponent } from "./components/shared/notifiq/notifiq.component";
import { NotifiqService } from "./services/notifiq.service";
import { TimerComponent } from "./../others/components/timer/timer.component";
import { TimerLongComponent } from "./../others/components/timer-long/timer-long.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomCurrencyPipe } from "./utils/custom-currency-pipe";
import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { CustomDatePipe } from "./utils/custom-date-pipe";
import { NoCommaPipe } from "./utils/nocomma-pipe";
import { OrdinalPipe } from "./utils/ordinal-pipe";
import { SoNumberPipe } from "./utils/so-number-pipe";
import { TitleService } from "./services/title.service";
import { ErrorService } from "./services/error.service";
import { HttpService } from "./services/http.service";
import { LoaderService } from "./services/loader-service";
import { ArraySortPipe } from "./utils/orderby-pipe";
import { CacheService } from "./services/cache.service";
import { ContactService } from "./services/contact.service";
import { ContactResource } from "./resources/contact-resource";
import { FormsModule } from "@angular/forms";
import { TwoDigitDecimaNumberDirective } from "./utils/twoDigits";
import { SiteLayoutComponent } from "./components/layout/default/site-layout/site-layout.component";
import { FuelLayoutComponent } from "./components/layout/fuel-layout/fuel-layout.component";
import { NotificationService } from "../notification/services/notification.service";
import { NotificationResource } from "../notification/resources/notification.resource";
import { CommonModule as ninja } from "@angular/common";
import { RaceLayoutComponent } from "./components/layout/race-layout/race-layout.component";
import { IonicModule } from "@ionic/angular";
import { AnQrcodeModule } from "an-qrcode";
import { ShowTipsComponent } from "./components/show-tips/show-tips.component";
import { CreateTipsComponent } from "./components/create-tips/create-tips.component";

import { MyHammerConfig } from "./resources/my-hammer.config";
import { HammerGestureConfig } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { FastFuelCarComponent } from "./components/shared/fast-fuel/fast-fuel.component";
import { MySettingsComponent } from "./components/shared/my-settings/my-settings.component";
import { ExpBarComponent } from "./components/shared/exp-bar/exp-bar.component";
import { LangSwitcherComponent } from "./components/shared/lang-switcher/lang-switcher.component";
import { MyChatComponent } from "./components/my-chat/my-chat.component";
import { IndicatorComponent } from "./components/indicator/indicator.component";
import { TechIndicatorComponent } from "./components/tech-indicator/tech-indicator.component";
import { DailyTipModalComponent } from "./components/daily-tip-modal/daily-tip-modal.component";
import { WaitingTransferComponent } from "./components/waiting-transfer/waiting-transfer.component";
import { OrderModule } from "ngx-order-pipe";
import { TeamsSelectionComponent } from "./components/teams-selection/teams-selection.component";
import { RaceInfoModalComponent } from "./components/race-info-modal/race-info-modal.component";
import { TeamMembershipComponent } from "./components/team-membership/team-membership.component";
import { LoadingModalComponent } from "./components/shared/loading-modal/loading-modal.component";
import { RulesInfoModalComponent } from "./components/shared/rules-info-modal/rules-info-modal.component";
import { RaceBonusModalComponent } from "./components/shared/race-bonus-modal/race-bonus-modal.component";
import { TutorialModalComponent } from "./components/shared/tutorial-modal/tutorial-modal.component";
import { FooterComponent } from "./components/shared/footer/footer.component";

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ninja,
    HttpClientModule,
    IonicModule,
    AnQrcodeModule,
    TranslateModule,
    OrderModule,
  ],
  declarations: [
    CustomCurrencyPipe,
    CustomDatePipe,
    NoCommaPipe,
    SoNumberPipe,
    OrdinalPipe,
    ArraySortPipe,
    TimerComponent,
    TimerLongComponent,
    NotifiqComponent,
    TwoDigitDecimaNumberDirective,
    SiteLayoutComponent,
    RaceLayoutComponent,
    QuickDepositComponent,
    QuickTransferComponent,
    QuickWithdrawComponent,
    FastFuelCarComponent,
    CreateFastFuelCarComponent,
    MySettingsComponent,
    ExpBarComponent,
    LangSwitcherComponent,
    MyRacesAdComponent,
    NotificationListComponent,
    SynergizerComponent,
    MyChatComponent,
    IndicatorComponent,
    TechIndicatorComponent,
    DailyTipModalComponent,
    ShowTipsComponent,
    CreateTipsComponent,
    WaitingTransferComponent,
    TeamsSelectionComponent,
    RaceInfoModalComponent,
    FuelLayoutComponent,
    IoiloaderComponent,
    TeamMembershipComponent,
    LoadingModalComponent,
    MetaBuyComponent,
    RulesInfoModalComponent,
    TutorialModalComponent,
    RaceBonusModalComponent,
    FooterComponent,
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe,
    SoNumberPipe,
    ArraySortPipe,
    TitleService,
    ErrorService,
    LoaderService,
    HttpService,
    CacheService,
    ContactService,
    ContactResource,
    NotifiqService,
    NotificationService,
    NotificationResource,
    NotifyService,
    PlatformService,
    BalanceService,
    {
      provide: HammerGestureConfig,
      useClass: MyHammerConfig,
    },
  ],
  exports: [
    CustomCurrencyPipe,
    CustomDatePipe,
    NoCommaPipe,
    SoNumberPipe,
    OrdinalPipe,
    ArraySortPipe,
    TimerComponent,
    TimerLongComponent,
    NotifiqComponent,
    ArraySortPipe,
    TwoDigitDecimaNumberDirective,
    SiteLayoutComponent,
    RaceLayoutComponent,
    QuickDepositComponent,
    QuickTransferComponent,
    QuickWithdrawComponent,
    TranslateModule,
    FastFuelCarComponent,
    MySettingsComponent,
    CreateFastFuelCarComponent,
    ExpBarComponent,
    LangSwitcherComponent,
    MyRacesAdComponent,
    SynergizerComponent,
    MyChatComponent,
    IndicatorComponent,
    TechIndicatorComponent,
    DailyTipModalComponent,
    ShowTipsComponent,
    CreateTipsComponent,
    TeamsSelectionComponent,
    RaceInfoModalComponent,
    IoiloaderComponent,
    LoadingModalComponent,
    MetaBuyComponent,
    RulesInfoModalComponent,
    RaceBonusModalComponent,
    FooterComponent,
  ],
  entryComponents: [],
})
export class CommonModule {}
