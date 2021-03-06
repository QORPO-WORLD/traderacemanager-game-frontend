/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PlayerLeaderboard } from '../models/player-leaderboard';
import { PlayerLeaderboardMe } from '../models/player-leaderboard-me';
import { InternalTeamLeaderboard } from '../models/internal-team-leaderboard';
@Injectable({
  providedIn: 'root',
})
class LeaderboardService extends __BaseService {
  static readonly leaderboardListPath = '/races/leaderboard/list';
  static readonly leaderboardMePath = '/races/me/leaderboard';
  static readonly leaderboardPlayerListPath = '/races/leaderboard/players';
  static readonly leaderboardTeamListPath = '/races/team/leaderboard';
  static readonly leaderboardOwnerListPath = '/races/leaderboard/owners/';
  static readonly leaderboardTeamInternalListPath = '/races/team/leaderboard/internal';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param page A page number within the paginated result set.
   */
  leaderboardListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PlayerLeaderboard>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/leaderboard/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PlayerLeaderboard>}>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   */
  leaderboardList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PlayerLeaderboard>}> {
    return this.leaderboardListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PlayerLeaderboard>})
    );
  }

  /**
   * @param params The `LeaderboardService.LeaderboardMeParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `page`: A page number within the paginated result set.
   *
   * @return Returns players stats from leaderboard
   */
  leaderboardMeResponse(params: LeaderboardService.LeaderboardMeParams): __Observable<__StrictHttpResponse<PlayerLeaderboardMe>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.lastMonth != null) __params = __params.set('last_month', params.lastMonth.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/leaderboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PlayerLeaderboardMe>;
      })
    );
  }
  /**
   * @param params The `LeaderboardService.LeaderboardMeParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `page`: A page number within the paginated result set.
   *
   * @return Returns players stats from leaderboard
   */
  leaderboardMe(params: LeaderboardService.LeaderboardMeParams): __Observable<PlayerLeaderboardMe> {
    return this.leaderboardMeResponse(params).pipe(
      __map(_r => _r.body as PlayerLeaderboardMe)
    );
  }

  /**
   * @param params The `LeaderboardService.LeaderboardPlayerListParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `is_race24`:
   *
   * - `page`:
   *
   * @return Returns player leaderboard
   */
  leaderboardPlayerListResponse(params: LeaderboardService.LeaderboardPlayerListParams): __Observable<__StrictHttpResponse<Array<PlayerLeaderboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
     // if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/leaderboard/players`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PlayerLeaderboard>>;
      })
    );
  }
  /**
   * @param params The `LeaderboardService.LeaderboardPlayerListParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `is_race24`:
   *
   * - `page`:
   *
   * @return Returns player leaderboard
   */
  leaderboardPlayerList(params: LeaderboardService.LeaderboardPlayerListParams): __Observable<Array<PlayerLeaderboard>> {
    return this.leaderboardPlayerListResponse(params).pipe(
      __map(_r => _r.body as Array<PlayerLeaderboard>)
    );
  }

  /**
   * @param params The `LeaderboardService.LeaderboardTeamListParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `page`: A page number within the paginated result set.
   *
   * @return Returns player leaderboard
   */
  leaderboardTeamListResponse(params: LeaderboardService.LeaderboardTeamListParams): __Observable<__StrictHttpResponse<Array<PlayerLeaderboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.lastMonth != null) __params = __params.set('last_month', params.lastMonth.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/team/leaderboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PlayerLeaderboard>>;
      })
    );
  }

  leaderboardOwnersListResponse(params: any): __Observable<__StrictHttpResponse<Array<any>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.lastMonth != null) __params = __params.set('last_month', params.lastMonth.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/leaderboard/owners/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<any>>;
      })
    );
  }
  /**
   * @param params The `LeaderboardService.LeaderboardTeamListParams` containing the following parameters:
   *
   * - `last_month`:
   *
   * - `page`: A page number within the paginated result set.
   *
   * @return Returns player leaderboard
   */
  leaderboardTeamList(params: LeaderboardService.LeaderboardTeamListParams): __Observable<Array<PlayerLeaderboard>> {
    return this.leaderboardTeamListResponse(params).pipe(
      __map(_r => _r.body as Array<PlayerLeaderboard>)
    );
  }
  leaderboardOwnersList(params: any): __Observable<Array<any>> {
    return this.leaderboardOwnersListResponse(params).pipe(
      __map(_r => _r.body as Array<any>)
    );
  }
  leaderboardTeamInternalListResponse(): __Observable<__StrictHttpResponse<InternalTeamLeaderboard>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/team/leaderboard/internal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InternalTeamLeaderboard>;
      })
    );
  }  leaderboardTeamInternalList(): __Observable<InternalTeamLeaderboard> {
    return this.leaderboardTeamInternalListResponse().pipe(
      __map(_r => _r.body as InternalTeamLeaderboard)
    );
  }
}

module LeaderboardService {

  /**
   * Parameters for leaderboardMe
   */
  export interface LeaderboardMeParams {
    lastMonth: boolean;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }

  /**
   * Parameters for leaderboardPlayerList
   */
  export interface LeaderboardPlayerListParams {
    lastMonth?: boolean;
    isRace24?: boolean;
    page?: number;
  }

  /**
   * Parameters for leaderboardTeamList
   */
  export interface LeaderboardTeamListParams {
    lastMonth: boolean;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }
}

export { LeaderboardService }
