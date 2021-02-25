/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MyCryptoAddress } from '../models/my-crypto-address';
import { Assets } from '../models/assets';
import { Wallet } from '../models/wallet';
import { BuyWallet } from '../models/buy-wallet';
import { Coin } from '../models/coin';
import { Order } from '../models/order';
import { Deposit } from '../models/deposit';
import { DepositCallback } from '../models/deposit-callback';
import { ExchangeRate } from '../models/exchange-rate';
import { WalletBalance } from '../models/wallet-balance';
import { NitroWalletExchange } from '../models/nitro-wallet-exchange';
import { SystemNitroWallet } from '../models/system-nitro-wallet';
import { Transaction } from '../models/transaction';
import { TransferWallet } from '../models/transfer-wallet';
@Injectable({
  providedIn: 'root',
})
class NitroWalletService extends __BaseService {
  static readonly nitroWalletPartialUpdatePath = '/nitro-wallet';
  static readonly nitroWalletAssetsListPath = '/nitro-wallet/assets/';
  static readonly nitroWalletBuyCreatePath = '/nitro-wallet/buy';
  static readonly nitroWalletCoinsListPath = '/nitro-wallet/coins/';
  static readonly nitroWalletDepositCreatePath = '/nitro-wallet/deposit';
  static readonly nitroWalletDepositCallbackCreatePath = '/nitro-wallet/deposit/callback';
  static readonly nitroWalletExchangeListPath = '/nitro-wallet/exchange';
  static readonly nitroWalletExchangeCreatePath = '/nitro-wallet/exchange';
  static readonly nitroWalletOrderListPath = '/nitro-wallet/order';
  static readonly nitroWalletSystemListPath = '/nitro-wallet/system';
  static readonly nitroWalletTransactionsListPath = '/nitro-wallet/transactions/';
  static readonly nitroWalletTransferCreatePath = '/nitro-wallet/transfer';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   * @return Update crypto address for wallet
   */
  nitroWalletPartialUpdateResponse(data: MyCryptoAddress): __Observable<__StrictHttpResponse<MyCryptoAddress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/nitro-wallet`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MyCryptoAddress>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Update crypto address for wallet
   */
  nitroWalletPartialUpdate(data: MyCryptoAddress): __Observable<MyCryptoAddress> {
    return this.nitroWalletPartialUpdateResponse(data).pipe(
      __map(_r => _r.body as MyCryptoAddress)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   * @return Return list of user wallets
   */
  nitroWalletAssetsListResponse(page?: number): __Observable<__StrictHttpResponse<Array<Assets>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/assets/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Assets>>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   * @return Return list of user wallets
   */
  nitroWalletAssetsList(page?: number): __Observable<Array<Assets>> {
    return this.nitroWalletAssetsListResponse(page).pipe(
      __map(_r => _r.body as Array<Assets>)
    );
  }

  /**
   * @param data undefined
   * @return Returns updated user wallet
   */
  nitroWalletBuyCreateResponse(data: BuyWallet): __Observable<__StrictHttpResponse<Wallet>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/buy`,
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
  nitroWalletBuyCreate(data: BuyWallet): __Observable<Wallet> {
    return this.nitroWalletBuyCreateResponse(data).pipe(
      __map(_r => _r.body as Wallet)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   * @return Return list of supported coins
   */
  nitroWalletCoinsListResponse(page?: number): __Observable<__StrictHttpResponse<Array<Coin>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/coins/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Coin>>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   * @return Return list of supported coins
   */
  nitroWalletCoinsList(page?: number): __Observable<Array<Coin>> {
    return this.nitroWalletCoinsListResponse(page).pipe(
      __map(_r => _r.body as Array<Coin>)
    );
  }

  /**
   * @param data undefined
   * @return Deposit request created.
   */
  nitroWalletDepositCreateResponse(data: Deposit): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/deposit`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Deposit request created.
   */
  nitroWalletDepositCreate(data: Deposit): __Observable<Order> {
    return this.nitroWalletDepositCreateResponse(data).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param data undefined
   */
  nitroWalletDepositCallbackCreateResponse(data: DepositCallback): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/deposit/callback`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param data undefined
   */
  nitroWalletDepositCallbackCreate(data: DepositCallback): __Observable<null> {
    return this.nitroWalletDepositCallbackCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `NitroWalletService.NitroWalletExchangeListParams` containing the following parameters:
   *
   * - `from_currency`:
   *
   * - `amount`:
   *
   * - `to_currency`:
   *
   * @return Provides conversion rate.
   */
  nitroWalletExchangeListResponse(params: NitroWalletService.NitroWalletExchangeListParams): __Observable<__StrictHttpResponse<ExchangeRate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.fromCurrency != null) __params = __params.set('from_currency', params.fromCurrency.toString());
    if (params.amount != null) __params = __params.set('amount', params.amount.toString());
    if (params.toCurrency != null) __params = __params.set('to_currency', params.toCurrency.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/exchange`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ExchangeRate>;
      })
    );
  }
  /**
   * @param params The `NitroWalletService.NitroWalletExchangeListParams` containing the following parameters:
   *
   * - `from_currency`:
   *
   * - `amount`:
   *
   * - `to_currency`:
   *
   * @return Provides conversion rate.
   */
  nitroWalletExchangeList(params: NitroWalletService.NitroWalletExchangeListParams): __Observable<ExchangeRate> {
    return this.nitroWalletExchangeListResponse(params).pipe(
      __map(_r => _r.body as ExchangeRate)
    );
  }

  /**
   * @param data undefined
   * @return Exchange currency for another currency.
   */
  nitroWalletExchangeCreateResponse(data: NitroWalletExchange): __Observable<__StrictHttpResponse<WalletBalance>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/exchange`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WalletBalance>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Exchange currency for another currency.
   */
  nitroWalletExchangeCreate(data: NitroWalletExchange): __Observable<WalletBalance> {
    return this.nitroWalletExchangeCreateResponse(data).pipe(
      __map(_r => _r.body as WalletBalance)
    );
  }

  /**
   * @param invoice_id undefined
   * @return Provides order status.
   */
  nitroWalletOrderListResponse(invoiceId?: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (invoiceId != null) __params = __params.set('invoice_id', invoiceId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/order`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param invoice_id undefined
   * @return Provides order status.
   */
  nitroWalletOrderList(invoiceId?: string): __Observable<Order> {
    return this.nitroWalletOrderListResponse(invoiceId).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @return Returns system balances
   */
  nitroWalletSystemListResponse(): __Observable<__StrictHttpResponse<SystemNitroWallet>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/system`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SystemNitroWallet>;
      })
    );
  }
  /**
   * @return Returns system balances
   */
  nitroWalletSystemList(): __Observable<SystemNitroWallet> {
    return this.nitroWalletSystemListResponse().pipe(
      __map(_r => _r.body as SystemNitroWallet)
    );
  }

  /**
   * @param params The `NitroWalletService.NitroWalletTransactionsListParams` containing the following parameters:
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `action`:
   */
  nitroWalletTransactionsListResponse(params: NitroWalletService.NitroWalletTransactionsListParams): __Observable<__StrictHttpResponse<Array<Transaction>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.action != null) __params = __params.set('action', params.action.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/transactions/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Transaction>>;
      })
    );
  }
  /**
   * @param params The `NitroWalletService.NitroWalletTransactionsListParams` containing the following parameters:
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `action`:
   */
  nitroWalletTransactionsList(params: NitroWalletService.NitroWalletTransactionsListParams): __Observable<Array<Transaction>> {
    return this.nitroWalletTransactionsListResponse(params).pipe(
      __map(_r => _r.body as Array<Transaction>)
    );
  }

  /**
   * @param data undefined
   * @return Returns updated user wallet
   */
  nitroWalletTransferCreateResponse(data: TransferWallet): __Observable<__StrictHttpResponse<Wallet>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/nitro-wallet/transfer`,
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
  nitroWalletTransferCreate(data: TransferWallet): __Observable<Wallet> {
    return this.nitroWalletTransferCreateResponse(data).pipe(
      __map(_r => _r.body as Wallet)
    );
  }
}

module NitroWalletService {

  /**
   * Parameters for nitroWalletExchangeList
   */
  export interface NitroWalletExchangeListParams {
    fromCurrency: string;
    amount: string;
    toCurrency?: string;
  }

  /**
   * Parameters for nitroWalletTransactionsList
   */
  export interface NitroWalletTransactionsListParams {

    /**
     * A page number within the paginated result set.
     */
    page?: number;
    action?: string;
  }
}

export { NitroWalletService }
