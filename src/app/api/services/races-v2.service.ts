/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RaceDetailV2 } from '../models/race-detail-v2';
@Injectable({
  providedIn: 'root',
})
class RacesV2Service extends __BaseService {
  static readonly racesV2DetailListPath = '/races/game/next/{race_identifier}/info';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint /races-v2/{race_identifier}/detail
   * @param race_identifier undefined
   * @return Provides race detail.
   */
  racesV2DetailListResponse(raceIdentifier: string): __Observable<__StrictHttpResponse<RaceDetailV2>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/game/next/${raceIdentifier}/info`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RaceDetailV2>;
      })
    );
  }
  /**
   * API endpoint /races-v2/{race_identifier}/detail
   * @param race_identifier undefined
   * @return Provides race detail.
   */
  racesV2DetailList(raceIdentifier: string): __Observable<RaceDetailV2> {
    return this.racesV2DetailListResponse(raceIdentifier).pipe(
      __map(_r => _r.body as RaceDetailV2)
    );
  }
}

module RacesV2Service {
}

export { RacesV2Service }
