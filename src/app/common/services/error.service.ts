import { NotifiqService } from './notifiq.service';
import { AbstractService } from './abstract.service';
import { Injectable, Injector } from '@angular/core';
import { NotifyService } from './notify.service';
import { ApiError } from '../models/api-error';
import bugsnagClient from './bugsnag.client';
import { AuthService } from '../../user/services/auth.service';

/**
 * @Author: open-source GPL
 * @Date: 17.08.2018 14:26
 */
@Injectable()
export class ErrorService extends AbstractService {

    constructor(private notifyService: NotifyService, private authService: AuthService, protected notifiq: NotifiqService) {
        super();
    }

    throwError(errorString) {
        throw new Error(errorString);
    }

    appError(error) {
        if (error) {
            // Log the error to the console
            this.notifyService.error('APP: ' + error);
            console.error('APP ERROR\n', error);

            //this.notifyBugsnag(error);
        }
    }

    apiError(error) {
        if (error) {
            //const errorModel: ApiError = new ApiError(error);
            // Log the error to the console
            // this.notifyService.error('API: (' + errorModel.status + ') ' + errorModel.getUserMessage());
            
            if (error.error.description && error.status === 400) {
 
                this.notifyService.error(error.error.description);
                return;
            }
            
           
            if (error.error.message && error.status === 400) {

                this.notifyService.error(error.error.message);
                return;
            }
            
           
            if (error.status === 401) {
                //this.authService.logout();
            }

            //this.authService.logout();
        }
    }

    /**
     * send data to bugsnag
     * @param error
     * @param apiErrorModel
     */
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
