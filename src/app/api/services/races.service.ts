/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CurrentRace } from '../models/current-race';
import { MyCurrentRace } from '../models/my-current-race';
import { MultiCanJoinV2 } from '../models/multi-can-join-v2';
import { MultiSignup } from '../models/multi-signup';
import { RaceSignupV2 } from '../models/race-signup-v2';
import { NextRaceV2 } from '../models/next-race-v2';
import { MyNextRace } from '../models/my-next-race';
import { TournamentLeaderboard } from '../models/tournament-leaderboard';
import { NextTournamentRaceHash } from '../models/next-tournament-race-hash';
import { RaceDetail } from '../models/race-detail';
import { RaceStat } from '../models/race-stat';
import { RaceWinners } from '../models/race-winners';
@Injectable({
  providedIn: 'root',
})
class RacesService extends __BaseService {
  static readonly racesCurrentV2ListPath = '/races/game/current';
  static readonly racesCurrentMineListPath = '/races/game/current/mine';
  static readonly racesMultiCanJoinV2ListPath = '/races/game/available-assets';
  static readonly racesMultiSignupCreatePath = '/races/game/signup';
  static readonly racesNextV2ListPath = '/races/game/next';
  static readonly racesNextV2MineListPath = '/races/game/next/mine';
  static readonly racesTournamentLeaderboardListPath = '/races/game/tournament/{tournament_id}/scoreboard';
  static readonly racesTournamentNextRaceListPath = '/races/game/tournament/{tournament_id}/next-race';
  static readonly racesDetailListPath = '/races/game/{race_hash}/detail';
  static readonly racesStatsListPath = '/races/game/{race_hash}/status';
  static readonly racesWinnerListPath = '/races/game/{race_hash}/winner';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Provide current races data.
   */
  racesCurrentV2ListResponse(): __Observable<__StrictHttpResponse<Array<CurrentRace>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/current`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CurrentRace>>;
      })
    );
  }
  /**
   * Provide current races data.
   */
  racesCurrentV2List(): __Observable<Array<CurrentRace>> {
    return this.racesCurrentV2ListResponse().pipe(
      __map(_r => _r.body as Array<CurrentRace>)
    );
  }
  racesCurrentMineListResponse(): __Observable<__StrictHttpResponse<Array<MyCurrentRace>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/current/mine`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MyCurrentRace>>;
      })
    );
  }  racesCurrentMineList(): __Observable<Array<MyCurrentRace>> {
    return this.racesCurrentMineListResponse().pipe(
      __map(_r => _r.body as Array<MyCurrentRace>)
    );
  }

  /**
   * Provide lists of cars of current user, which can join to a race.
   */
  racesMultiCanJoinV2ListResponse(): __Observable<__StrictHttpResponse<Array<MultiCanJoinV2>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/available-assets`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MultiCanJoinV2>>;
      })
    );
  }
  /**
   * Provide lists of cars of current user, which can join to a race.
   */
  racesMultiCanJoinV2List(): __Observable<Array<MultiCanJoinV2>> {
    return this.racesMultiCanJoinV2ListResponse().pipe(
      __map(_r => _r.body as Array<MultiCanJoinV2>)
    );
  }

  /**
   * API endpoint to sign up to a race.
   * @param data undefined
   */
  racesMultiSignupCreateResponse(data: Array<RaceSignupV2>): __Observable<__StrictHttpResponse<Array<MultiSignup>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/races/game/signup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MultiSignup>>;
      })
    );
  }
  /**
   * API endpoint to sign up to a race.
   * @param data undefined
   */
  racesMultiSignupCreate(data: Array<RaceSignupV2>): __Observable<Array<MultiSignup>> {
    return this.racesMultiSignupCreateResponse(data).pipe(
      __map(_r => _r.body as Array<MultiSignup>)
    );
  }

  /**
   * Provides next races data.
   */
  racesNextV2ListResponse(): __Observable<__StrictHttpResponse<Array<NextRaceV2>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/next`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<NextRaceV2>>;
      })
    );
  }
  /**
   * Provides next races data.
   */
  racesNextV2List(): __Observable<Array<NextRaceV2>> {
    return this.racesNextV2ListResponse().pipe(
      __map(_r => _r.body as Array<NextRaceV2>)
    );
  }
  racesNextV2MineListResponse(): __Observable<__StrictHttpResponse<Array<MyNextRace>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/next/mine`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MyNextRace>>;
      })
    );
  }  racesNextV2MineList(): __Observable<Array<MyNextRace>> {
    return this.racesNextV2MineListResponse().pipe(
      __map(_r => _r.body as Array<MyNextRace>)
    );
  }

  /**
   * Provides tournament leaderboard data.
   * @param tournament_id undefined
   */
  racesTournamentLeaderboardListResponse(tournamentId: string): __Observable<__StrictHttpResponse<Array<TournamentLeaderboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/tournament/${tournamentId}/scoreboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TournamentLeaderboard>>;
      })
    );
  }
  /**
   * Provides tournament leaderboard data.
   * @param tournament_id undefined
   */
  racesTournamentLeaderboardList(tournamentId: string): __Observable<Array<TournamentLeaderboard>> {
    return this.racesTournamentLeaderboardListResponse(tournamentId).pipe(
      __map(_r => _r.body as Array<TournamentLeaderboard>)
    );
  }

  /**
   * @param tournament_id undefined
   */
  racesTournamentNextRaceListResponse(tournamentId: string): __Observable<__StrictHttpResponse<NextTournamentRaceHash>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/tournament/${tournamentId}/next-race/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTournamentRaceHash>;
      })
    );
  }
  /**
   * @param tournament_id undefined
   */
  racesTournamentNextRaceList(tournamentId: string): __Observable<NextTournamentRaceHash> {
    return this.racesTournamentNextRaceListResponse(tournamentId).pipe(
      __map(_r => _r.body as NextTournamentRaceHash)
    );
  }

  /**
   * API endpoint /race/{hash}/detail
   * @param params The `RacesService.RacesDetailListParams` containing the following parameters:
   *
   * - `race_hash`:
   *
   * - `page_number`:
   *
   * @return Provides race detail.
   */
  racesDetailListResponse(params: RacesService.RacesDetailListParams): __Observable<__StrictHttpResponse<RaceDetail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.pageNumber != null) __params = __params.set('page_number', params.pageNumber.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/${params.raceHash}/detail`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RaceDetail>;
      })
    );
  }
  /**
   * API endpoint /race/{hash}/detail
   * @param params The `RacesService.RacesDetailListParams` containing the following parameters:
   *
   * - `race_hash`:
   *
   * - `page_number`:
   *
   * @return Provides race detail.
   */
  racesDetailList(params: RacesService.RacesDetailListParams): __Observable<RaceDetail> {
    return this.racesDetailListResponse(params).pipe(
      __map(_r => _r.body as RaceDetail)
    );
  }

  /**
   * API endpoint /race/{hash}/stats
   * @param params The `RacesService.RacesStatsListParams` containing the following parameters:
   *
   * - `race_hash`:
   *
   * - `page_number`:
   *
   * @return Provides race statistics
   */
  racesStatsListResponse(params: RacesService.RacesStatsListParams): __Observable<__StrictHttpResponse<RaceStat>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.pageNumber != null) __params = __params.set('page_number', params.pageNumber.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/${params.raceHash}/status`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RaceStat>;
      })
    );
  }
  /**
   * API endpoint /race/{hash}/stats
   * @param params The `RacesService.RacesStatsListParams` containing the following parameters:
   *
   * - `race_hash`:
   *
   * - `page_number`:
   *
   * @return Provides race statistics
   */
  racesStatsList(params: RacesService.RacesStatsListParams): __Observable<RaceStat> {
    return this.racesStatsListResponse(params).pipe(
      __map(_r => _r.body as RaceStat)
    );
  }

  /**
   * @param race_hash undefined
   * @return Provides race winners.
   */
  racesWinnerListResponse(raceHash: string): __Observable<__StrictHttpResponse<RaceWinners>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/${raceHash}/winner`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RaceWinners>;
      })
    );
  }
  /**
   * @param race_hash undefined
   * @return Provides race winners.
   */
  racesWinnerList(raceHash: string): __Observable<RaceWinners> {
    return this.racesWinnerListResponse(raceHash).pipe(
      __map(_r => _r.body as RaceWinners)
    );
  }
}

module RacesService {

  /**
   * Parameters for racesDetailList
   */
  export interface RacesDetailListParams {
    raceHash: string;
    pageNumber?: number;
  }

  /**
   * Parameters for racesStatsList
   */
  export interface RacesStatsListParams {
    raceHash: string;
    pageNumber?: number;
  }
}

export { RacesService }
