/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { EquityStats } from '../models/equity-stats';
import { InvestorMetrics } from '../models/investor-metrics';
import { PaidInBonuses } from '../models/paid-in-bonuses';
import { PlatformMetrics } from '../models/platform-metrics';
import { UsersTransactionsDelta } from '../models/users-transactions-delta';
@Injectable({
  providedIn: 'root',
})
class MetricsService extends __BaseService {
  static readonly metricsEquityStatsListPath = '/metrics/equity-stats/';
  static readonly metricsInvestorMetricsPath = '/metrics/investor-metrics/';
  static readonly metricsPaidInBonusesListPath = '/metrics/paid-in-bonuses/';
  static readonly metricsPlatformMetricsPath = '/metrics/platform-metrics/';
  static readonly metricsUserTransactionDeltaListPath = '/metrics/user-transaction-delta/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint to get equity stats of user
   * @return Equity stats of user
   */
  metricsEquityStatsListResponse(): __Observable<__StrictHttpResponse<EquityStats>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/metrics/equity-stats/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EquityStats>;
      })
    );
  }
  /**
   * API endpoint to get equity stats of user
   * @return Equity stats of user
   */
  metricsEquityStatsList(): __Observable<EquityStats> {
    return this.metricsEquityStatsListResponse().pipe(
      __map(_r => _r.body as EquityStats)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   * @return Returns investor metrics
   */
  metricsInvestorMetricsResponse(page?: number): __Observable<__StrictHttpResponse<InvestorMetrics>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/metrics/investor-metrics/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InvestorMetrics>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   * @return Returns investor metrics
   */
  metricsInvestorMetrics(page?: number): __Observable<InvestorMetrics> {
    return this.metricsInvestorMetricsResponse(page).pipe(
      __map(_r => _r.body as InvestorMetrics)
    );
  }

  /**
   * API endpoint to get amount paid in bonuses
   * @return Amount paid id bonuses
   */
  metricsPaidInBonusesListResponse(): __Observable<__StrictHttpResponse<PaidInBonuses>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/metrics/paid-in-bonuses/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaidInBonuses>;
      })
    );
  }
  /**
   * API endpoint to get amount paid in bonuses
   * @return Amount paid id bonuses
   */
  metricsPaidInBonusesList(): __Observable<PaidInBonuses> {
    return this.metricsPaidInBonusesListResponse().pipe(
      __map(_r => _r.body as PaidInBonuses)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   * @return Returns platform metrics
   */
  metricsPlatformMetricsResponse(page?: number): __Observable<__StrictHttpResponse<PlatformMetrics>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/metrics/platform-metrics/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PlatformMetrics>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   * @return Returns platform metrics
   */
  metricsPlatformMetrics(page?: number): __Observable<PlatformMetrics> {
    return this.metricsPlatformMetricsResponse(page).pipe(
      __map(_r => _r.body as PlatformMetrics)
    );
  }

  /**
   * API endpoint to get transactions deltas for current month
   */
  metricsUserTransactionDeltaListResponse(): __Observable<__StrictHttpResponse<UsersTransactionsDelta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/metrics/user-transaction-delta/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsersTransactionsDelta>;
      })
    );
  }
  /**
   * API endpoint to get transactions deltas for current month
   */
  metricsUserTransactionDeltaList(): __Observable<UsersTransactionsDelta> {
    return this.metricsUserTransactionDeltaListResponse().pipe(
      __map(_r => _r.body as UsersTransactionsDelta)
    );
  }
}

module MetricsService {
}

export { MetricsService }
