/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MFASecret } from '../models/mfasecret';
import { GenerateMFASecret } from '../models/generate-mfasecret';
@Injectable({
  providedIn: 'root',
})
class MfaService extends __BaseService {
  static readonly mfaCancelCreatePath = '/mfa/cancel';
  static readonly mfaQrSecretCreatePath = '/mfa/qr-secret';
  static readonly mfaSecretCreatePath = '/me/generate-mfa-secret';
  static readonly mfaTestCreatePath = '/me/validate-mfa-code';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   */
  mfaCancelCreateResponse(data: MFASecret): __Observable<__StrictHttpResponse<{result?: boolean}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/me/disable-mfa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{result?: boolean}>;
      })
    );
  }
  /**
   * @param data undefined
   */
  mfaCancelCreate(data: MFASecret): __Observable<{result?: boolean}> {
    return this.mfaCancelCreateResponse(data).pipe(
      __map(_r => _r.body as {result?: boolean})
    );
  }
  mfaQrSecretCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/mfa/qr-secret`,
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
  }  mfaQrSecretCreate(): __Observable<null> {
    return this.mfaQrSecretCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  mfaSecretCreateResponse(): __Observable<__StrictHttpResponse<GenerateMFASecret>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/me/generate-mfa-secret`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GenerateMFASecret>;
      })
    );
  }  mfaSecretCreate(): __Observable<GenerateMFASecret> {
    return this.mfaSecretCreateResponse().pipe(
      __map(_r => _r.body as GenerateMFASecret)
    );
  }

  /**
   * @param data undefined
   */
  mfaTestCreateResponse(data: MFASecret): __Observable<__StrictHttpResponse<{result?: boolean}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/me/validate-mfa-code`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{result?: boolean}>;
      })
    );
  }
  /**
   * @param data undefined
   */
  mfaTestCreate(data: MFASecret): __Observable<{result?: boolean}> {
    return this.mfaTestCreateResponse(data).pipe(
      __map(_r => _r.body as {result?: boolean})
    );
  }
}

module MfaService {
}

export { MfaService }
