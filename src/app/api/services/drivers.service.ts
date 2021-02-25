/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DailyTasks } from '../models/daily-tasks';
import { FavCoins } from '../models/fav-coins';
import { FavFuel } from '../models/fav-fuel';
import { FavRaces } from '../models/fav-races';
import { Notification } from '../models/notification';
@Injectable({
  providedIn: 'root',
})
class DriversService extends __BaseService {
  static readonly driversDailyTasksListPath = '/races/me/daily-tasks';
  static readonly driversFavCoinsListPath = '/races/me/fav-coins';
  static readonly driversFavCoinsUpdatePath = '/races/me/fav-coins';
  static readonly driversFavFuelListPath = '/races/me/fav-fuel';
  static readonly driversFavFuelUpdatePath = '/races/me/fav-fuel';
  static readonly driversFavRacesListPath = '/races/me/fav-races';
  static readonly driversFavRacesUpdatePath = '/races/me/fav-races';
  static readonly driversFirstLoginPartialUpdatePath = 'races/me/first-login';
  static readonly driversTutorialPartialUpdatePath = '/races/me/tutorial-mode';
  static readonly driversInitialPath = '/races/me/initial-data';
  static readonly driversNotificationsListPath = '/races/me/notifications';
  static readonly driversNotificationsDeletePath = '/races/me/notifications';
  static readonly driversTutorialPartialUpdate_1Path = '/races/me/tutorial-mode';
  static readonly driversBalancesPath = '/nitro-wallet/me/balances';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Returns daily tasks for current date
   */
  driversDailyTasksListResponse(): __Observable<__StrictHttpResponse<DailyTasks>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/daily-tasks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DailyTasks>;
      })
    );
  }
  /**
   * @return Returns daily tasks for current date
   */
  driversDailyTasksList(): __Observable<DailyTasks> {
    return this.driversDailyTasksListResponse().pipe(
      __map(_r => _r.body as DailyTasks)
    );
  }

  /**
   * API endpoints to get and update favorite coins of the user
   * @return Favorite coins retrieved
   */
  driversFavCoinsListResponse(): __Observable<__StrictHttpResponse<FavCoins>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/fav-coins`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FavCoins>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite coins of the user
   * @return Favorite coins retrieved
   */
  driversFavCoinsList(): __Observable<FavCoins> {
    return this.driversFavCoinsListResponse().pipe(
      __map(_r => _r.body as FavCoins)
    );
  }

  /**
   * API endpoints to get and update favorite coins of the user
   * @param data undefined
   * @return Favorite coins updated
   */
  driversFavCoinsUpdateResponse(data: FavCoins): __Observable<__StrictHttpResponse<Array<FavCoins>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/races/me/fav-coins`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FavCoins>>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite coins of the user
   * @param data undefined
   * @return Favorite coins updated
   */
  driversFavCoinsUpdate(data: FavCoins): __Observable<Array<FavCoins>> {
    return this.driversFavCoinsUpdateResponse(data).pipe(
      __map(_r => _r.body as Array<FavCoins>)
    );
  }

  /**
   * API endpoints to get and update favorite fuel of the user
   * @return Favorite fuel retrieved
   */
  driversFavFuelListResponse(): __Observable<__StrictHttpResponse<Array<FavFuel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/fav-fuel`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FavFuel>>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite fuel of the user
   * @return Favorite fuel retrieved
   */
  driversFavFuelList(): __Observable<Array<FavFuel>> {
    return this.driversFavFuelListResponse().pipe(
      __map(_r => _r.body as Array<FavFuel>)
    );
  }

  /**
   * API endpoints to get and update favorite fuel of the user
   * @param data undefined
   * @return Favorite fuel updated
   */
  driversFavFuelUpdateResponse(data: Array<FavFuel>): __Observable<__StrictHttpResponse<Array<FavFuel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/races/me/fav-fuel`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FavFuel>>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite fuel of the user
   * @param data undefined
   * @return Favorite fuel updated
   */
  driversFavFuelUpdate(data: Array<FavFuel>): __Observable<Array<FavFuel>> {
    return this.driversFavFuelUpdateResponse(data).pipe(
      __map(_r => _r.body as Array<FavFuel>)
    );
  }

  /**
   * API endpoints to get and update favorite coins of the user
   * @return Favorite races retrieved
   */
  driversFavRacesListResponse(): __Observable<__StrictHttpResponse<FavRaces>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/fav-races`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FavRaces>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite coins of the user
   * @return Favorite races retrieved
   */
  driversFavRacesList(): __Observable<FavRaces> {
    return this.driversFavRacesListResponse().pipe(
      __map(_r => _r.body as FavRaces)
    );
  }

  /**
   * API endpoints to get and update favorite coins of the user
   * @param data undefined
   * @return Favorite races updated
   */
  driversFavRacesUpdateResponse(data: FavRaces): __Observable<__StrictHttpResponse<FavRaces>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/races/me/fav-races`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FavRaces>;
      })
    );
  }
  /**
   * API endpoints to get and update favorite coins of the user
   * @param data undefined
   * @return Favorite races updated
   */
  driversFavRacesUpdate(data: FavRaces): __Observable<FavRaces> {
    return this.driversFavRacesUpdateResponse(data).pipe(
      __map(_r => _r.body as FavRaces)
    );
  }
  driversFirstLoginPartialUpdateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `races/me/first-login`,
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
  }  driversFirstLoginPartialUpdate(): __Observable<null> {
    return this.driversFirstLoginPartialUpdateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param is_in_tutorial undefined
   */
  driversTutorialPartialUpdateResponse(isInTutorial: boolean): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (isInTutorial != null) __params = __params.set('is_in_tutorial', isInTutorial.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/races/me/tutorial-mode`,
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
   * @param is_in_tutorial undefined
   */
  driversTutorialPartialUpdate(isInTutorial: boolean): __Observable<null> {
    return this.driversTutorialPartialUpdateResponse(isInTutorial).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * API endpoint for profiles to be viewed.
   * @param page A page number within the paginated result set.
   */
  driversInitialResponse(page?: number): __Observable<__StrictHttpResponse<{id: string, email?: string, nickname?: string, country?: string, affiliate_slug?: string, is_using_authenticator?: boolean, my_crypto_address?: string, nitro_wallet_ioie?: number, tournament_tickets?: number, is_first_login?: boolean, is_in_tutorial?: boolean, is_verified?: boolean, is_paid_membership?: boolean, team?: string, affiliate_level?: number, total_bet_amount?: number, total_races?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/initial-data`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id: string, email?: string, nickname?: string, country?: string, affiliate_slug?: string, is_using_authenticator?: boolean, my_crypto_address?: string, nitro_wallet_ioie?: number, tournament_tickets?: number, is_first_login?: boolean, is_in_tutorial?: boolean, is_verified?: boolean, is_paid_membership?: boolean, team?: string, affiliate_level?: number, total_bet_amount?: number, total_races?: number}>;
      })
    );
  }
  /**
   * API endpoint for profiles to be viewed.
   * @param page A page number within the paginated result set.
   */
  driversInitial(page?: number): __Observable<{id: string, email?: string, nickname?: string, country?: string, affiliate_slug?: string, is_using_authenticator?: boolean, my_crypto_address?: string, nitro_wallet_ioie?: number, tournament_tickets?: number, is_first_login?: boolean, is_in_tutorial?: boolean, is_verified?: boolean, is_paid_membership?: boolean, team?: string, affiliate_level?: number, total_bet_amount?: number, total_races?: number}> {
    return this.driversInitialResponse(page).pipe(
      __map(_r => _r.body as {id: string, email?: string, nickname?: string, country?: string, affiliate_slug?: string, is_using_authenticator?: boolean, my_crypto_address?: string, nitro_wallet_ioie?: number, tournament_tickets?: number, is_first_login?: boolean, is_in_tutorial?: boolean, is_verified?: boolean, is_paid_membership?: boolean, team?: string, affiliate_level?: number, total_bet_amount?: number, total_races?: number})
    );
  }

  /**
   * @return Get new notifications for user and delete them
   */
  driversNotificationsListResponse(): __Observable<__StrictHttpResponse<Array<Notification>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/notifications`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Notification>>;
      })
    );
  }
  /**
   * @return Get new notifications for user and delete them
   */
  driversNotificationsList(): __Observable<Array<Notification>> {
    return this.driversNotificationsListResponse().pipe(
      __map(_r => _r.body as Array<Notification>)
    );
  }
  driversNotificationsDeleteResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/races/me/notifications`,
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
  }  driversNotificationsDelete(): __Observable<null> {
    return this.driversNotificationsDeleteResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param is_in_tutorial undefined
   */
  driversTutorialPartialUpdate_1Response(isInTutorial: boolean): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (isInTutorial != null) __params = __params.set('is_in_tutorial', isInTutorial.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/races/me/tutorial-mode`,
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
   * @param is_in_tutorial undefined
   */
  driversTutorialPartialUpdate_1(isInTutorial: boolean): __Observable<null> {
    return this.driversTutorialPartialUpdate_1Response(isInTutorial).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * API endpoint for profiles to be viewed.
   * @param page A page number within the paginated result set.
   */
  driversBalancesResponse(page?: number): __Observable<__StrictHttpResponse<{game_wallet_trx?: number, game_wallet_ioi?: number, nitro_wallet_trx?: number, nitro_wallet_ioi?: number, stake_wallet_ioi?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/nitro-wallet/me/balances`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{game_wallet_trx?: number, game_wallet_ioi?: number, nitro_wallet_trx?: number, nitro_wallet_ioi?: number, stake_wallet_ioi?: number}>;
      })
    );
  }
  /**
   * API endpoint for profiles to be viewed.
   * @param page A page number within the paginated result set.
   */
  driversBalances(page?: number): __Observable<{game_wallet_trx?: number, game_wallet_ioi?: number, nitro_wallet_trx?: number, nitro_wallet_ioi?: number, stake_wallet_ioi?: number}> {
    return this.driversBalancesResponse(page).pipe(
      __map(_r => _r.body as {game_wallet_trx?: number, game_wallet_ioi?: number, nitro_wallet_trx?: number, nitro_wallet_ioi?: number, stake_wallet_ioi?: number})
    );
  }
}

module DriversService {
}

export { DriversService }
