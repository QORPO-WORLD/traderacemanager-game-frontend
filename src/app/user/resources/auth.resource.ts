
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AbstractResource} from '../../common/resources/abstract.resource';
import {Token} from '../models/token';


@Injectable()
export class AuthResource extends AbstractResource {

  login(username: string, pass: string, tokenz: string): Observable<any> {


      return this.api.authJwtCreateCreate({email: username, password: pass, recaptcha_token: tokenz}).map(res => {
        const data: any = res;
        const token = new Token({
          access: data.access,
          refresh_token: data.refresh
        });
        return token;
      });
  }

  me(): Observable<any> {
    return this.userApi.authUsersMeRead().map(res => {
      return res;
    });
  }


}
