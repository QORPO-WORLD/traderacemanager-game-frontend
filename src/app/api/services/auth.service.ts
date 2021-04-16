/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { JwtData } from '../models/jwt-data';
import { MyTokenObtainPairInApp } from '../models/my-token-obtain-pair-in-app';
import { MyTokenObtainPair } from '../models/my-token-obtain-pair';
import { TokenRefresh } from '../models/token-refresh';
import { TokenVerify } from '../models/token-verify';
import { Login } from '../models/login';
import { User } from '../models/user';
import { CustomAuthCreate } from '../models/custom-auth-create';
import { UserRegistration } from '../models/user-registration';
import { Activation } from '../models/activation';
import { FacebookLogin } from '../models/facebook-login';
import { GoogleLogin } from '../models/google-login';
import { SendEmailReset } from '../models/send-email-reset';
import { UsernameResetConfirm } from '../models/username-reset-confirm';
import { PasswordResetConfirm } from '../models/password-reset-confirm';
import { SetUsername } from '../models/set-username';
import { SetPassword } from '../models/set-password';
const httpOptionsx = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly authJwtCreateInDesktopCreatePath = '/auth/jwt/create-in-desktop/';
  static readonly authJwtCreateCreatePath = '/auth/jwt/create/';
  static readonly authJwtRefreshCreatePath = '/auth/jwt/refresh/';
  static readonly authJwtVerifyCreatePath = '/auth/jwt/verify/';
  static readonly authRefreshSessionUpdatePath = '/auth/refresh-session/';
  static readonly authSignInCreatePath = '/auth/sign-in/';
  static readonly authSignOutUpdatePath = '/auth/sign-out/';
  static readonly authUsersListPath = '/auth/users/';
  static readonly authUsersCreatePath = '/auth/users/';
  static readonly authUsersActivationPath = '/auth/users/activation/';
  static readonly authUsersCreateDesktopPath = '/auth/users/create-desktop/';
  static readonly authUsersCreateFacebookPath = '/auth/users/create-facebook/';
  static readonly authUsersCreateGooglePath = '/auth/users/create-google/';
  static readonly authUsersMeReadPath = '/auth/users/me/';
  static readonly authUsersMeUpdatePath = '/auth/users/me/';
  static readonly authUsersMePartialUpdatePath = '/auth/users/me/';
  static readonly authUsersMeDeletePath = '/auth/users/me/';
  static readonly authUsersResendActivationPath = '/auth/users/resend_activation/';
  static readonly authUsersResetUsernamePath = '/auth/users/reset_email';
  static readonly authUsersResetUsernameConfirmPath = '/auth/users/reset_email';
  static readonly authUsersResetPasswordPath = '/account/send-reset-password-confirmation-code';
  static readonly authUsersResetPasswordConfirmPath = '/account/reset-password';
  static readonly authUsersSetUsernamePath = '/auth/users/set_email/';
  static readonly authUsersSetPasswordPath = '/auth/users/set_password/';
  static readonly authUsersReadPath = '/auth/users/{id}/';
  static readonly authUsersUpdatePath = '/auth/users/{id}/';
  static readonly authUsersPartialUpdatePath = '/auth/users/{id}/';
  static readonly authUsersDeletePath = '/auth/users/{id}/';
  static readonly authVerificationCreatePath = '/auth/verification/';
  static readonly authVerificationConfirmCreatePath = '/auth/verification/confirm/{uid}/{verification_hash}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   */
  authJwtCreateInDesktopCreateResponse(data: MyTokenObtainPairInApp): __Observable<__StrictHttpResponse<JwtData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/jwt/create-in-desktop/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JwtData>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authJwtCreateInDesktopCreate(data: MyTokenObtainPairInApp): __Observable<JwtData> {
    return this.authJwtCreateInDesktopCreateResponse(data).pipe(
      __map(_r => _r.body as JwtData)
    );
  }

  /**
   * @param data undefined
   */
  authJwtCreateCreateResponse(data: MyTokenObtainPair): __Observable<__StrictHttpResponse<JwtData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/jwt/create/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JwtData>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authJwtCreateCreate(data: MyTokenObtainPair): __Observable<JwtData> {
    return this.authJwtCreateCreateResponse(data).pipe(
      __map(_r => _r.body as JwtData)
    );
  }
  /**
   * @param data undefined
   */
  accountSigninResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/account/sign-in`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }
  /**
   * @param data undefined
   */
  accountSignin(data: any): __Observable<any> {
    return this.accountSigninResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param data undefined
   */
  authJwtRefreshCreateResponse(data: TokenRefresh): __Observable<__StrictHttpResponse<{access: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/jwt/refresh/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{access: string}>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authJwtRefreshCreate(data: TokenRefresh): __Observable<{access: string}> {
    return this.authJwtRefreshCreateResponse(data).pipe(
      __map(_r => _r.body as {access: string})
    );
  }

  /**
   * @param data undefined
   */
  authJwtVerifyCreateResponse(data: TokenVerify): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/jwt/verify/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authJwtVerifyCreate(data: TokenVerify): __Observable<{}> {
    return this.authJwtVerifyCreateResponse(data).pipe(
      __map(_r => _r.body as {})
    );
  }
  authRefreshSessionUpdateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/refresh-session/`,
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
  }  authRefreshSessionUpdate(): __Observable<null> {
    return this.authRefreshSessionUpdateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  authSignInCreateResponse(data: Login): __Observable<__StrictHttpResponse<{result?: boolean}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/sign-in/`,
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
  authSignInCreate(data: Login): __Observable<{result?: boolean}> {
    return this.authSignInCreateResponse(data).pipe(
      __map(_r => _r.body as {result?: boolean})
    );
  }
  
  
  meActivateResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/me/activate-account`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }
  /**
   * @param data undefined
   */
  meActivate(data: any): __Observable<any> {
    return this.meActivateResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }
  
  meResendActivateResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/me/resend-account-activation-code`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }
  /**
   * @param data undefined
   */
  meResendActivate(data: any): __Observable<any> {
    return this.meResendActivateResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }



  authSignOutUpdateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/sign-out/`,
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
  }  authSignOutUpdate(): __Observable<null> {
    return this.authSignOutUpdateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   */
  authUsersListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<User>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/users/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<User>}>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   */
  authUsersList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<User>}> {
    return this.authUsersListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<User>})
    );
  }

  /**
   * @param data undefined
   */
  authUsersCreateResponse(data: UserRegistration): __Observable<__StrictHttpResponse<CustomAuthCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomAuthCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersCreate(data: UserRegistration): __Observable<CustomAuthCreate> {
    return this.authUsersCreateResponse(data).pipe(
      __map(_r => _r.body as CustomAuthCreate)
    );
  }

  /**
   * @param data undefined
   */
  authUsersActivationResponse(data: Activation): __Observable<__StrictHttpResponse<Activation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/activation/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Activation>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersActivation(data: Activation): __Observable<Activation> {
    return this.authUsersActivationResponse(data).pipe(
      __map(_r => _r.body as Activation)
    );
  }

  /**
   * @param data undefined
   */
  authUsersCreateDesktopResponse(data: UserRegistration): __Observable<__StrictHttpResponse<CustomAuthCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/account/sign-up`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomAuthCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersCreateDesktop(data: UserRegistration): __Observable<CustomAuthCreate> {
    return this.authUsersCreateDesktopResponse(data).pipe(
      __map(_r => _r.body as CustomAuthCreate)
    );
  }

  /**
   * @param data undefined
   */
  authUsersCreateFacebookResponse(data: FacebookLogin): __Observable<__StrictHttpResponse<JwtData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/create-facebook/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JwtData>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersCreateFacebook(data: FacebookLogin): __Observable<JwtData> {
    return this.authUsersCreateFacebookResponse(data).pipe(
      __map(_r => _r.body as JwtData)
    );
  }

  /**
   * @param data undefined
   */
  authUsersCreateGoogleResponse(data: GoogleLogin): __Observable<__StrictHttpResponse<JwtData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/create-google/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JwtData>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersCreateGoogle(data: GoogleLogin): __Observable<JwtData> {
    return this.authUsersCreateGoogleResponse(data).pipe(
      __map(_r => _r.body as JwtData)
    );
  }

  /**
   * @param page A page number within the paginated result set.
   */
  authUsersMeReadResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<User>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/users/me/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<User>}>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   */
  authUsersMeRead(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<User>}> {
    return this.authUsersMeReadResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<User>})
    );
  }

  /**
   * @param data undefined
   */
  authUsersMeUpdateResponse(data: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/users/me/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersMeUpdate(data: User): __Observable<User> {
    return this.authUsersMeUpdateResponse(data).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param data undefined
   */
  authUsersMePartialUpdateResponse(data: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/auth/users/me/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersMePartialUpdate(data: User): __Observable<User> {
    return this.authUsersMePartialUpdateResponse(data).pipe(
      __map(_r => _r.body as User)
    );
  }
  authUsersMeDeleteResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/auth/users/me/`,
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
  }  authUsersMeDelete(): __Observable<null> {
    return this.authUsersMeDeleteResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  initSessionResponse(): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/session-init`,
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
  }  initSession(): __Observable<any> {
    return this.initSessionResponse().pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param data undefined
   */
  authUsersResendActivationResponse(data: SendEmailReset): __Observable<__StrictHttpResponse<SendEmailReset>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/resend_activation/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SendEmailReset>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersResendActivation(data: SendEmailReset): __Observable<SendEmailReset> {
    return this.authUsersResendActivationResponse(data).pipe(
      __map(_r => _r.body as SendEmailReset)
    );
  }

  /**
   * @param data undefined
   */
  authUsersResetUsernameResponse(data: SendEmailReset): __Observable<__StrictHttpResponse<SendEmailReset>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/reset_email/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SendEmailReset>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersResetUsername(data: SendEmailReset): __Observable<SendEmailReset> {
    return this.authUsersResetUsernameResponse(data).pipe(
      __map(_r => _r.body as SendEmailReset)
    );
  }

  /**
   * @param data undefined
   */
  authUsersResetUsernameConfirmResponse(data: UsernameResetConfirm): __Observable<__StrictHttpResponse<UsernameResetConfirm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/reset_email_confirm/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsernameResetConfirm>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersResetUsernameConfirm(data: UsernameResetConfirm): __Observable<UsernameResetConfirm> {
    return this.authUsersResetUsernameConfirmResponse(data).pipe(
      __map(_r => _r.body as UsernameResetConfirm)
    );
  }

  /**
   * @param data undefined
   */
  
  authUsersResetPasswordResponse(data: SendEmailReset): __Observable<__StrictHttpResponse<SendEmailReset>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/account/send-reset-password-confirmation-code`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
        withCredentials: true
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SendEmailReset>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersResetPassword(data: SendEmailReset): __Observable<SendEmailReset> {
    return this.authUsersResetPasswordResponse(data).pipe(
      __map(_r => _r.body as SendEmailReset)
    );
  }

  /**
   * @param data undefined
   */
  authUsersResetPasswordConfirmResponse(data: PasswordResetConfirm): __Observable<__StrictHttpResponse<PasswordResetConfirm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/reset-password`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PasswordResetConfirm>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersResetPasswordConfirm(data: PasswordResetConfirm): __Observable<PasswordResetConfirm> {
    return this.authUsersResetPasswordConfirmResponse(data).pipe(
      __map(_r => _r.body as PasswordResetConfirm)
    );
  }

  /**
   * @param data undefined
   */
  authUsersSetUsernameResponse(data: SetUsername): __Observable<__StrictHttpResponse<SetUsername>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/set_email/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SetUsername>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersSetUsername(data: SetUsername): __Observable<SetUsername> {
    return this.authUsersSetUsernameResponse(data).pipe(
      __map(_r => _r.body as SetUsername)
    );
  }

  /**
   * @param data undefined
   */
  authUsersSetPasswordResponse(data: SetPassword): __Observable<__StrictHttpResponse<SetPassword>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/set_password/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SetPassword>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUsersSetPassword(data: SetPassword): __Observable<SetPassword> {
    return this.authUsersSetPasswordResponse(data).pipe(
      __map(_r => _r.body as SetPassword)
    );
  }

  /**
   * @param id A UUID string identifying this IOI user.
   */
  authUsersReadResponse(id: string): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/users/${id}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param id A UUID string identifying this IOI user.
   */
  authUsersRead(id: string): __Observable<User> {
    return this.authUsersReadResponse(id).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param params The `AuthService.AuthUsersUpdateParams` containing the following parameters:
   *
   * - `id`: A UUID string identifying this IOI user.
   *
   * - `data`:
   */
  authUsersUpdateResponse(params: AuthService.AuthUsersUpdateParams): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/users/${params.id}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthUsersUpdateParams` containing the following parameters:
   *
   * - `id`: A UUID string identifying this IOI user.
   *
   * - `data`:
   */
  authUsersUpdate(params: AuthService.AuthUsersUpdateParams): __Observable<User> {
    return this.authUsersUpdateResponse(params).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param params The `AuthService.AuthUsersPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A UUID string identifying this IOI user.
   *
   * - `data`:
   */
  authUsersPartialUpdateResponse(params: AuthService.AuthUsersPartialUpdateParams): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/auth/users/${params.id}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthUsersPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A UUID string identifying this IOI user.
   *
   * - `data`:
   */
  authUsersPartialUpdate(params: AuthService.AuthUsersPartialUpdateParams): __Observable<User> {
    return this.authUsersPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param id A UUID string identifying this IOI user.
   */
  authUsersDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/auth/users/${id}/`,
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
   * @param id A UUID string identifying this IOI user.
   */
  authUsersDelete(id: string): __Observable<null> {
    return this.authUsersDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  authVerificationCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/verification/`,
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
  }  authVerificationCreate(): __Observable<null> {
    return this.authVerificationCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `AuthService.AuthVerificationConfirmCreateParams` containing the following parameters:
   *
   * - `verification_hash`:
   *
   * - `uid`:
   */
  authVerificationConfirmCreateResponse(params: AuthService.AuthVerificationConfirmCreateParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/verification/confirm/${params.uid}/${params.verificationHash}`,
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
   * @param params The `AuthService.AuthVerificationConfirmCreateParams` containing the following parameters:
   *
   * - `verification_hash`:
   *
   * - `uid`:
   */
  authVerificationConfirmCreate(params: AuthService.AuthVerificationConfirmCreateParams): __Observable<null> {
    return this.authVerificationConfirmCreateResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AuthService {

  /**
   * Parameters for authUsersUpdate
   */
  export interface AuthUsersUpdateParams {

    /**
     * A UUID string identifying this IOI user.
     */
    id: string;
    data: User;
  }

  /**
   * Parameters for authUsersPartialUpdate
   */
  export interface AuthUsersPartialUpdateParams {

    /**
     * A UUID string identifying this IOI user.
     */
    id: string;
    data: User;
  }

  /**
   * Parameters for authVerificationConfirmCreate
   */
  export interface AuthVerificationConfirmCreateParams {
    verificationHash: string;
    uid: string;
  }
}

export { AuthService }
