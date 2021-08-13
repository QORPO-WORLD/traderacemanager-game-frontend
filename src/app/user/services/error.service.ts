import { NotifiqService } from './../../common/services/notifiq.service';

import { Injectable, Injector } from '@angular/core';

import { AuthService } from '../../user/services/auth.service';
import bugsnagClient from 'src/app/common/services/bugsnag.client';
import { NotifyService } from 'src/app/common/services/notify.service';


@Injectable()
export class ErrorService {

    constructor(private notifyService: NotifyService, private authService: AuthService) {
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
    
        //const errorModel: ApiError = new ApiError(error);
            // Log the error to the console
            // this.notifyService.error('API: (' + errorModel.status + ') ' + errorModel.getUserMessage());
            

            
            if (error.error.message && error.status === 400) {
                this.notifyService.error(error.error.message);
                return;
            }
            
            if (error.error.message === null) {
 
                this.notifyService.error('Unexpected error');
                return;
            }
            if (error.status === 401) {
                //this.authService.logout();
            }

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
