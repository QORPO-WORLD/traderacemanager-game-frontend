/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AffiliatesService } from './services/affiliates.service';
import { AuthService } from './services/auth.service';
import { BlockchainService } from './services/blockchain.service';
import { CarsService } from './services/cars.service';
import { DriversService } from './services/drivers.service';
import { GameWalletService } from './services/game-wallet.service';
import { LeaderboardService } from './services/leaderboard.service';
import { MetricsService } from './services/metrics.service';
import { MfaService } from './services/mfa.service';
import { NitroWalletService } from './services/nitro-wallet.service';
import { RacesV2Service } from './services/races-v2.service';
import { RacesService } from './services/races.service';
import { RewardsService } from './services/rewards.service';
import { TeamChatService } from './services/team-chat.service';
import { TeamsService } from './services/teams.service';
import { TickerPricesService } from './services/ticker-prices.service';
import { TradingPoolService } from './services/trading-pool.service';
import { TransactionsService } from './services/transactions.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AffiliatesService,
    AuthService,
    BlockchainService,
    CarsService,
    DriversService,
    GameWalletService,
    LeaderboardService,
    MetricsService,
    MfaService,
    NitroWalletService,
    RacesV2Service,
    RacesService,
    RewardsService,
    TeamChatService,
    TeamsService,
    TickerPricesService,
    TradingPoolService,
    TransactionsService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
