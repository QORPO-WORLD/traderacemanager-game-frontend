import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {EnumService} from '../../common/services/enum.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Rx';
import {ErrorService} from '../../common/services/error.service';

/**
 * @Author: open-source GPL
 * @Date: 08.08.2018 21:30
 */
@Injectable()
export class InitializeResolver implements Resolve<any> {

    constructor(private enumService: EnumService, private authService: AuthService, private errorService: ErrorService) {
    }

    // can be called only if user is logged in
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        if (!this.authService.hasIdentity()) {
            this.errorService.throwError('To use InitializeResolver enums user has to be signed.');
        } else {
            return this.enumService.initializeEnums();
        }
    }

}
