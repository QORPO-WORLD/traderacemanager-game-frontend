import { AppErrorHandler } from './common/services/error.handler';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import { JwtInterceptor } from './user/services/interceptors/jwt.interceptor';

import { NgModule, ErrorHandler } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule as ninja } from 'src/app/common/common.module';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { NgxHotjarModule, NgxHotjarRouterModule, NgxHotjarService } from 'ngx-hotjar';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ninja, CommonModule, ApiModule, UserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxHotjarModule.forRoot('2133538'),
    NgxHotjarRouterModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    HttpClient,
    //GoogleAnalytics,
    NgxHotjarService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
