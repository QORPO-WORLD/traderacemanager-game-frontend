/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ChatMessage } from '../models/chat-message';
import { SendChatMessage } from '../models/send-chat-message';
import { TeamChatMembers } from '../models/team-chat-members';
@Injectable({
  providedIn: 'root',
})
class TeamChatService extends __BaseService {
  static readonly teamChatListPath = '/team-chat/';
  static readonly teamChatCreatePath = '/team-chat/';
  static readonly teamChatMembersListPath = '/team-chat/members';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param limit undefined
   * @return Returns chat messages for a specific race.
   */
  teamChatListResponse(limit: number): __Observable<__StrictHttpResponse<Array<ChatMessage>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (limit != null) __params = __params.set('limit', limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/team-chat/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ChatMessage>>;
      })
    );
  }
  /**
   * @param limit undefined
   * @return Returns chat messages for a specific race.
   */
  teamChatList(limit: number): __Observable<Array<ChatMessage>> {
    return this.teamChatListResponse(limit).pipe(
      __map(_r => _r.body as Array<ChatMessage>)
    );
  }

  /**
   * @param data undefined
   */
  teamChatCreateResponse(data: SendChatMessage): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/team-chat/`,
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
   * @param data undefined
   */
  teamChatCreate(data: SendChatMessage): __Observable<null> {
    return this.teamChatCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }
  teamChatMembersListResponse(): __Observable<__StrictHttpResponse<Array<TeamChatMembers>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/team-chat/members`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TeamChatMembers>>;
      })
    );
  }  teamChatMembersList(): __Observable<Array<TeamChatMembers>> {
    return this.teamChatMembersListResponse().pipe(
      __map(_r => _r.body as Array<TeamChatMembers>)
    );
  }
}

module TeamChatService {
}

export { TeamChatService }
