/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Affiliates } from '../models/affiliates';
import { AffiliateDetails } from '../models/affiliate-details';
@Injectable({
  providedIn: 'root',
})
class AffiliatesService extends __BaseService {
  static readonly affiliatesListPath = '/me/list-affiliates';
  static readonly affiliatesMePath = '/me/affiliate-data';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint to list user affiliates.
   * @param page A page number within the paginated result set.
   */
  affiliatesListResponse(page?: number): __Observable<__StrictHttpResponse<Array<Affiliates>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    //if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/me/list-affiliates`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Affiliates>>;
      })
    );
  }
  /**
   * API endpoint to list user affiliates.
   * @param page A page number within the paginated result set.
   */
  affiliatesList(page?: number): __Observable<Array<Affiliates>> {
    return this.affiliatesListResponse(page).pipe(
      __map(_r => _r.body as Array<Affiliates>)
    );
  }

  /**
   * API endpoint to list user affiliates.
   * @param page A page number within the paginated result set.
   * @return Affiliate Details
   */
  affiliatesMeResponse(page?: number): __Observable<__StrictHttpResponse<AffiliateDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    //if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/me/affiliate-data`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AffiliateDetails>;
      })
    );
  }
  /**
   * API endpoint to list user affiliates.
   * @param page A page number within the paginated result set.
   * @return Affiliate Details
   */
  affiliatesMe(page?: number): __Observable<AffiliateDetails> {
    return this.affiliatesMeResponse(page).pipe(
      __map(_r => _r.body as AffiliateDetails)
    );
  }
}

module AffiliatesService {
}

export { AffiliatesService }
