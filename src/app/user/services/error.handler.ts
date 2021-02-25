import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
// https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        errorService.appError('No Internet Connection.');
      } else {

        errorService.apiError(error);
      }
    } else {
      console.log('haha' + error.message);
      //errorService.appError(error);
    }
  }

}
