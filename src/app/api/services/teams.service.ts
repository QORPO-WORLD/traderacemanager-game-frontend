/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RacingTeam } from '../models/racing-team';
import { TeamMember } from '../models/team-member';
import { JoinTeam } from '../models/join-team';
@Injectable({
  providedIn: 'root',
})
class TeamsService extends __BaseService {
  static readonly teamsListPath = '/races/team/list';
  static readonly teamsJoinCreatePath = '/races/me/join-to-team';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * API endpoint for teams to be viewed.
   * @param page A page number within the paginated result set.
   */
  teamsListResponse(page?: number): __Observable<__StrictHttpResponse<{ count: number, next?: null | string, previous?: null | string, results: Array<RacingTeam> }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/races/team/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ count: number, next?: null | string, previous?: null | string, results: Array<RacingTeam> }>;
      })
    );
  }
  /**
   * API endpoint for teams to be viewed.
   * @param page A page number within the paginated result set.
   */
  teamsList(page?: number): __Observable<{ count: number, next?: null | string, previous?: null | string, results: Array<RacingTeam> }> {
    return this.teamsListResponse(page).pipe(
      __map(_r => _r.body as { count: number, next?: null | string, previous?: null | string, results: Array<RacingTeam> })
    );
  }

  /**
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  teamsJoinCreateResponse(data: JoinTeam): __Observable<__StrictHttpResponse<TeamMember>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/races/me/join-to-team`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TeamMember>;
      })
    );
  }
  /**
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  teamsJoinCreate(data: JoinTeam): __Observable<TeamMember> {
    return this.teamsJoinCreateResponse(data).pipe(
      __map(_r => _r.body as TeamMember)
    );
  }
  becomeManagerResponse(url: number, data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/races/team/` + url + '/become-a-team-manager',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  becomeManager(url: number, data: any): __Observable<any> {
    return this.becomeManagerResponse(url, data).pipe(
      __map(_r => _r.body as any)
    );
  }
  putTipsResponse(url: number, data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/races/team/` + url + '/manager-tips',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  putTips(url: number, data: any): __Observable<any> {
    return this.putTipsResponse(url, data).pipe(
      __map(_r => _r.body as any)
    );
  }
  getTipsResponse(): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + '/races/team/manager-tips',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  getTips(): __Observable<any> {
    return this.getTipsResponse().pipe(
      __map(_r => _r.body as any)
    );
  }
  suspendManagerResponse(url: number): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/races/team/` + url + '/manager-suspend',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
   suspendManager(url: number): __Observable<any> {
    return this.suspendManagerResponse(url).pipe(
      __map(_r => _r.body as any)
    );
  }
  putManagerRequestsResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + '/races/team/process-team-manager-request',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  putManagerRequests(data: any): __Observable<any> {
    return this.putManagerRequestsResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }
  createTeamResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/races/team/create',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  createTeam(data: any): __Observable<any> {
    return this.createTeamResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }
  notifyTeamResponse(data: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/races/notify-all',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
   notifyTeam(data: any): __Observable<any> {
    return this.notifyTeamResponse(data).pipe(
      __map(_r => _r.body as any)
    );
  }
  getManagerRequestsResponse(id: number): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + '/races/team/' + id + '/list-team-manager-requests',
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
   * API endpoint to join the team.
   * @param data undefined
   * @return Returns the team id you're a member of.
   */
  getManagerRequests(id: number): __Observable<any> {
    return this.getManagerRequestsResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module TeamsService {
}

export { TeamsService }
