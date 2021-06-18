/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Ticker } from '../models/ticker';
@Injectable({
  providedIn: 'root',
})
class TickerPricesService extends __BaseService {
  static readonly tickerPricesReadPath = '/other/ticker/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint to retrieve current prices from Ticker.
   * @param id A unique integer value identifying this ticker.
   */
  tickerPricesReadResponse(id: number): __Observable<__StrictHttpResponse<Ticker>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/other/ticker/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticker>;
      })
    );
  }
  /**
   * API endpoint to retrieve current prices from Ticker.
   * @param id A unique integer value identifying this ticker.
   */
  tickerPricesRead(id: number): __Observable<Ticker> {
    return this.tickerPricesReadResponse(id).pipe(
      __map(_r => _r.body as Ticker)
    );
  }



   /**
   * API endpoint to retrieve current price of IOI token for not logged in user.
   */
    tickerIoiPrice(): __Observable<__StrictHttpResponse<any>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;
  
      let req = new HttpRequest<any>(
        'GET',
        this.rootUrl + `/kucoin-price`,
        __body,
        {
          headers: __headers,
          params: __params,
          responseType: 'json'
        });
  
      return this.http.request<any>(req).pipe(
        __filter(_r => _r instanceof HttpResponse),
        __map((_r) => {
          return _r as __StrictHttpResponse<Ticker>;
        })
      );
    }
    /**
     * API endpoint to retrieve current price of IOI token for not logged in user.
     */
    tickerIoiPriceRead(): __Observable<any> {
      return this.tickerIoiPrice().pipe(
        __map(_r => _r.body as any)
      );
    }
}

module TickerPricesService {
}

export { TickerPricesService }
