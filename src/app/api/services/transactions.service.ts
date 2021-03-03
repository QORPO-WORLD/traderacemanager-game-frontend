/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
@Injectable({
  providedIn: 'root',
})
class TransactionsService extends __BaseService {
  static readonly transactionsListPath = '/races/transactions/all';
  static readonly transactionsRacesListPath = '/races/transactions/races';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `TransactionsService.TransactionsListParams` containing the following parameters:
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `action`:
   */
  transactionsListResponse(params: TransactionsService.TransactionsListParams): __Observable<__StrictHttpResponse<Array<Transaction>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.action != null) __params = __params.set('action', params.action.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/transactions/all`,
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
   * @param params The `TransactionsService.TransactionsListParams` containing the following parameters:
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `action`:
   */
  transactionsList(params: TransactionsService.TransactionsListParams): __Observable<Array<Transaction>> {
    return this.transactionsListResponse(params).pipe(
      __map(_r => _r.body as Array<Transaction>)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   */
  transactionsRacesListResponse(page?: number): __Observable<__StrictHttpResponse<Array<Transaction>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/transactions/races`,
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
   * @param page A page number within the paginated result set.
   */
  transactionsRacesList(page?: number): __Observable<Array<Transaction>> {
    return this.transactionsRacesListResponse(page).pipe(
      __map(_r => _r.body as Array<Transaction>)
    );
  }
}

module TransactionsService {

  /**
   * Parameters for transactionsList
   */
  export interface TransactionsListParams {

    /**
     * A page number within the paginated result set.
     */
    page?: number;
    action?: string;
  }
}

export { TransactionsService }
