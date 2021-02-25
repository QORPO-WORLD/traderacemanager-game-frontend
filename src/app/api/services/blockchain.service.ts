/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BlockchainDeposit } from '../models/blockchain-deposit';
import { BlockchainWithdrawal } from '../models/blockchain-withdrawal';
@Injectable({
  providedIn: 'root',
})
class BlockchainService extends __BaseService {
  static readonly blockchainConfirmWithdrawalCreatePath = '/blockchain/confirm-withdrawal/{confirmation_hash}';
  static readonly blockchainDepositCreatePath = '/blockchain/deposit/';
  static readonly blockchainWithdrawCreatePath = '/blockchain/withdraw/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param confirmation_hash undefined
   */
  blockchainConfirmWithdrawalCreateResponse(confirmationHash: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blockchain/confirm-withdrawal/${confirmationHash}`,
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
   * @param confirmation_hash undefined
   */
  blockchainConfirmWithdrawalCreate(confirmationHash: string): __Observable<null> {
    return this.blockchainConfirmWithdrawalCreateResponse(confirmationHash).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  blockchainDepositCreateResponse(data: BlockchainDeposit): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blockchain/deposit/`,
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
  blockchainDepositCreate(data: BlockchainDeposit): __Observable<null> {
    return this.blockchainDepositCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  blockchainWithdrawCreateResponse(data: BlockchainWithdrawal): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blockchain/withdraw/`,
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
  blockchainWithdrawCreate(data: BlockchainWithdrawal): __Observable<null> {
    return this.blockchainWithdrawCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module BlockchainService {
}

export { BlockchainService }
