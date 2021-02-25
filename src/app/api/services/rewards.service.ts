/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Rewards } from '../models/rewards';
import { CumulativeRewards } from '../models/cumulative-rewards';
import { RewardsMe } from '../models/rewards-me';
import { RewardsStats } from '../models/rewards-stats';
@Injectable({
  providedIn: 'root',
})
class RewardsService extends __BaseService {
  static readonly rewardsListPath = '/races/rewards';
  static readonly rewardsHistoricalListPath = '/races/rewards/historical';
  static readonly rewardsMeListPath = '/races/me/rewards';
  static readonly rewardsStatsListPath = '/races/rewards/stats';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Rewards
   */
  rewardsListResponse(): __Observable<__StrictHttpResponse<Rewards>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/rewards`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rewards>;
      })
    );
  }
  /**
   * @return Rewards
   */
  rewardsList(): __Observable<Rewards> {
    return this.rewardsListResponse().pipe(
      __map(_r => _r.body as Rewards)
    );
  }

  /**
   * @return Cumulative Rewards
   */
  rewardsHistoricalListResponse(): __Observable<__StrictHttpResponse<CumulativeRewards>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/rewards/historical`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CumulativeRewards>;
      })
    );
  }
  /**
   * @return Cumulative Rewards
   */
  rewardsHistoricalList(): __Observable<CumulativeRewards> {
    return this.rewardsHistoricalListResponse().pipe(
      __map(_r => _r.body as CumulativeRewards)
    );
  }

  /**
   * @return Rewards Detail
   */
  rewardsMeListResponse(): __Observable<__StrictHttpResponse<RewardsMe>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/rewards`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RewardsMe>;
      })
    );
  }
  /**
   * @return Rewards Detail
   */
  rewardsMeList(): __Observable<RewardsMe> {
    return this.rewardsMeListResponse().pipe(
      __map(_r => _r.body as RewardsMe)
    );
  }

  /**
   * @return Rewards Detail
   */
  rewardsStatsListResponse(): __Observable<__StrictHttpResponse<RewardsStats>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/rewards/stats`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RewardsStats>;
      })
    );
  }
  /**
   * @return Rewards Detail
   */
  rewardsStatsList(): __Observable<RewardsStats> {
    return this.rewardsStatsListResponse().pipe(
      __map(_r => _r.body as RewardsStats)
    );
  }
}

module RewardsService {
}

export { RewardsService }
