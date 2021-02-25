import { AuthService } from '../../api/services';
import {Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {HttpService} from '../services/http.service';
import {HttpHandler} from '@angular/common/http';
import {LoaderService} from '../services/loader-service';


/**
 * @Author: MIT
 * @Date: 13.07.2018 11:48
 */
@Injectable()
export class AbstractResource {

    constructor(protected httpService: HttpService, protected api: AuthService, protected userApi: AuthService) {



    }

}
