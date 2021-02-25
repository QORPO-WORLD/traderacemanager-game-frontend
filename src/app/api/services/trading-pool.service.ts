/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LockedTradingPool } from '../models/locked-trading-pool';
import { LockTradingPool } from '../models/lock-trading-pool';
import { TradingPoolRewards } from '../models/trading-pool-rewards';
@Injectable({
  providedIn: 'root',
})
class TradingPoolService extends __BaseService {
  static readonly tradingPoolLockCreatePath = '/nitro-wallet/trading-pool/lock';
  static readonly tradingPoolRewardsListPath = '/nitro-wallet/trading-pool/rewards';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   * @return Returns locked balance in USD
   */
  tradingPoolLockCreateResponse(data: LockTradingPool): __Observable<__StrictHttpResponse<LockedTradingPool>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/trading-pool/lock`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LockedTradingPool>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Returns locked balance in USD
   */
  tradingPoolLockCreate(data: LockTradingPool): __Observable<LockedTradingPool> {
    return this.tradingPoolLockCreateResponse(data).pipe(
      __map(_r => _r.body as LockedTradingPool)
    );
  }

  /**
   * @return Returns locked balance in USD and earned amount.
   */
  tradingPoolRewardsListResponse(): __Observable<__StrictHttpResponse<TradingPoolRewards>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/trading-pool/rewards`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TradingPoolRewards>;
      })
    );
  }
  /**
   * @return Returns locked balance in USD and earned amount.
   */
  tradingPoolRewardsList(): __Observable<TradingPoolRewards> {
    return this.tradingPoolRewardsListResponse().pipe(
      __map(_r => _r.body as TradingPoolRewards)
    );
  }
}

module TradingPoolService {
}

export { TradingPoolService }
