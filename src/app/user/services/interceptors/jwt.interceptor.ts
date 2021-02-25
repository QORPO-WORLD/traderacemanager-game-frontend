import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/index';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);


    constructor(private identityService: AuthService, private route: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {


        const token = JSON.parse(localStorage.getItem('first-time'));


        if (token) {
            //this.identityService.tokenExpires(token.access);

            //request = this.addTokenToRequest(request, token.access);


            return next.handle(request)
                .pipe(
                    catchError(err => {
                        if (err.status === 401) {
                            console.log(401);
                            this.identityService.logout();
                            //return this.handle401Error(request, next);
                        } else if (err.status === 406) {
                            this.identityService.logout();
                        } else if (err.status === 403) {
                            this.route.navigate(['/user/verify-code']);
                          
                        } else {
                            return throwError(err);
                        }
                    }));

        } else {
           // this.route.navigate(['/user/sign-in'])
            return next.handle(request);
        }
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            this.tokenSubject.next(null);

            if (this.identityService.refreshToken()) {
                return this.identityService.refreshToken()
                    .pipe(
                        switchMap((token) => {
                            if (token) {
                                this.tokenSubject.next(token.access);
                                this.identityService.setToken(token);
                                next.handle(this.addTokenToRequest(request, token.access));
                            } else {
                                this.identityService.logout();
                            }
                            return <any>this.identityService.logout();
                        }),
                        catchError(error => {
                            this.identityService.logout();
                            return <any>this.identityService.logout();
                        }),
                        finalize(() => {
                            this.isRefreshingToken = false;
                        })
                    );
            } else {

                this.isRefreshingToken = false;
                return this.tokenSubject
                    .pipe(
                        take(1),
                        switchMap(token => {
                            return next.handle(this.addTokenToRequest(request, token));
                        }));
            }
        }
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ` + token
            }
        });
    }
}
