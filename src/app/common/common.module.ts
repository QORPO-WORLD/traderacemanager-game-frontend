import { SynergizerComponent } from './../synergizer/synergizer.component';
import { BalanceService } from './services/balance.service';
import { PlatformService } from './services/platform.service';
import { NotifyService } from './services/notify.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifiqComponent } from './components/shared/notifiq/notifiq.component';
import { NotifiqService } from './services/notifiq.service';
import { TimerComponent } from './../others/components/timer/timer.component';
import { TimerLongComponent } from './../others/components/timer-long/timer-long.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from './utils/custom-currency-pipe';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CustomDatePipe } from './utils/custom-date-pipe';
import { NoCommaPipe } from './utils/nocomma-pipe';
import { OrdinalPipe } from './utils/ordinal-pipe';
import { SoNumberPipe } from './utils/so-number-pipe';
import { TitleService } from './services/title.service';
import { ErrorService } from './services/error.service';
import { HttpService } from './services/http.service';
import { LoaderService } from './services/loader-service';
import { ArraySortPipe } from './utils/orderby-pipe';
import { CacheService } from './services/cache.service';
import { ContactService } from './services/contact.service';
import { ContactResource } from './resources/contact-resource';
import { FormsModule } from '@angular/forms';
import { TwoDigitDecimaNumberDirective } from './utils/twoDigits';
import { SiteLayoutComponent } from './components/layout/default/site-layout/site-layout.component';
import { FuelLayoutComponent } from './components/layout/fuel-layout/fuel-layout.component';
import { NotificationService } from '../notification/services/notification.service';
import { NotificationResource } from '../notification/resources/notification.resource';
import { CommonModule as ninja } from '@angular/common';
import { RaceLayoutComponent } from './components/layout/race-layout/race-layout.component';
import { IonicModule } from '@ionic/angular';
import { AnQrcodeModule } from 'an-qrcode';

import { MyHammerConfig } from './resources/my-hammer.config';
import { HammerGestureConfig } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { OrderModule } from 'ngx-order-pipe';
import { LoadingModalComponent } from './components/shared/loading-modal/loading-modal.component';

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
    OrderModule
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
    SynergizerComponent,
    FuelLayoutComponent,
    LoadingModalComponent
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
      useClass: MyHammerConfig
    }
  ],
  exports: [ CustomCurrencyPipe, CustomDatePipe, NoCommaPipe, SoNumberPipe, OrdinalPipe, ArraySortPipe,
    TimerComponent, TimerLongComponent, NotifiqComponent, ArraySortPipe,
    TwoDigitDecimaNumberDirective, SiteLayoutComponent, RaceLayoutComponent, TranslateModule,
    SynergizerComponent, LoadingModalComponent],
  entryComponents: []
})

export class CommonModule {

}
