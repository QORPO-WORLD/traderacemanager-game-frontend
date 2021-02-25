import {Identity} from '../../user/models/identity';
import {AbstractResource} from '../../common/resources/abstract.resource';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

/**
 * @Author: MIT
 * @Date: 13.07.2018 12:19
 */
@Injectable()
export class ContactResource extends AbstractResource {

    public postMessageFromMoldal(body): Observable<any> {
        const uri = 'support/tickets';
        return this.httpService.post(uri, body);
    }

}
