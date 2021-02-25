/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Wallet } from '../models/wallet';
import { BuyWallet } from '../models/buy-wallet';
@Injectable({
  providedIn: 'root',
})
class GameWalletService extends __BaseService {
  static readonly gameWalletBuyCreatePath = '/game-wallet/buy';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   * @return Returns updated user wallet
   */
  gameWalletBuyCreateResponse(data: BuyWallet): __Observable<__StrictHttpResponse<Wallet>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/game-wallet/buy`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Wallet>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Returns updated user wallet
   */
  gameWalletBuyCreate(data: BuyWallet): __Observable<Wallet> {
    return this.gameWalletBuyCreateResponse(data).pipe(
      __map(_r => _r.body as Wallet)
    );
  }
}

module GameWalletService {
}

export { GameWalletService }
