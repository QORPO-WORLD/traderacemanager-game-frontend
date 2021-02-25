import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {ContactResource} from '../resources/contact-resource';
/**
 * @Author: MIT
 * @Date: 03.06.2016 21:27
 */
@Injectable()
export class ContactService extends AbstractService {



    constructor(protected resource: ContactResource) {
        super();

    }


  public sendMessageFromMoldal(body) {
    return this.resource.postMessageFromMoldal(body);
  }


}
