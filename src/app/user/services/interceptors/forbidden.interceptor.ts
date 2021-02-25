import { NotifiqService } from './../../../common/services/notifiq.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService, private notify: NotifiqService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {

            return throwError(err);
    }));
}
}
