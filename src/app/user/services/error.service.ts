import { NotifiqService } from './../../common/services/notifiq.service';

import { Injectable, Injector } from '@angular/core';

import { AuthService } from '../../user/services/auth.service';
import bugsnagClient from 'src/app/common/services/bugsnag.client';


@Injectable()
export class ErrorService {

    constructor(private notifyService: NotifiqService, private authService: AuthService) {
    }

    throwError(errorString) {
        throw new Error(errorString);
    }

    appError(error) {
        if (error) {
            // Log the error to the console

        }
    }

    apiError(error) {
        console.log(error);
        if (error.status !== 401) {
            this.notifyService.error('api-error', error.detail);
        }

        //this.notifyBugsnag(error, error);
       // this.authService.logout();
    }


    private notifyBugsnag(error, apiErrorModel?): void {

        let metaData = {};
        if (apiErrorModel) {
            metaData = apiErrorModel;
        }

        const identity = this.authService.getIdentity();

        bugsnagClient.notify(error, {
            metaData: metaData,
            user: identity
        });

    }

}
