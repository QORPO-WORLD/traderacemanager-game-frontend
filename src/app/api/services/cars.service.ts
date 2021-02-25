/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Car } from '../models/car';
import { CarShowroom } from '../models/car-showroom';
@Injectable({
  providedIn: 'root',
})
class CarsService extends __BaseService {
  static readonly carsMineListPath = '/races/me/assets';
  static readonly carsShowroomListPath = '/races/assets/list';
  static readonly carsBuyListPath = '/races/assets/buy/{car_model}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint to list users cars.
   */
  carsMineListResponse(): __Observable<__StrictHttpResponse<Array<Car>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/me/assets`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Car>>;
      })
    );
  }
  /**
   * API endpoint to list users cars.
   */
  carsMineList(): __Observable<Array<Car>> {
    return this.carsMineListResponse().pipe(
      __map(_r => _r.body as Array<Car>)
    );
  }

  /**
   * API endpoint for cars showroom to be seen.
   */
  carsShowroomListResponse(): __Observable<__StrictHttpResponse<Array<CarShowroom>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/assets/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CarShowroom>>;
      })
    );
  }
  /**
   * API endpoint for cars showroom to be seen.
   */
  carsShowroomList(): __Observable<Array<CarShowroom>> {
    return this.carsShowroomListResponse().pipe(
      __map(_r => _r.body as Array<CarShowroom>)
    );
  }

  /**
   * API endpoint to buy cars.
   * @param car_model undefined
   */
  carsBuyListResponse(carModel: string): __Observable<__StrictHttpResponse<{car_pk?: number, delivered_new?: any}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/assets/buy/${carModel}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{car_pk?: number, delivered_new?: any}>;
      })
    );
  }
  /**
   * API endpoint to buy cars.
   * @param car_model undefined
   */
  carsBuyList(carModel: string): __Observable<{car_pk?: number, delivered_new?: any}> {
    return this.carsBuyListResponse(carModel).pipe(
      __map(_r => _r.body as {car_pk?: number, delivered_new?: any})
    );
  }
}

module CarsService {
}

export { CarsService }
