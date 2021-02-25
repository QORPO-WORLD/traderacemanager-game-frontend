import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {LoaderService} from './loader-service';

@Injectable()
export class HttpService extends HttpClient {

    private httpRetryCount = 0;

    constructor(handler: HttpHandler, private loaderService: LoaderService) {
        super(handler);
    }

    public getFullUrl(str): string {
        return environment.api_url + '/' + str;
    }

    get(url: string, options?: any): Observable<any> {
        this.requestInterceptor();
        const fullUrl = this.getFullUrl(url);
        return super.get(fullUrl, options)
            .retry(this.httpRetryCount)
            .map(result => {
                // return result['data'];
                return result;
            })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    post(url: string, body: any | null, options?: any): Observable<any> {
        this.requestInterceptor();
        const fullUrl = this.getFullUrl(url);
        return super.post(fullUrl, body, options)
            .retry(this.httpRetryCount)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    put(url: string, body: any | null, options?: any): Observable<any> {
        this.requestInterceptor();
        const fullUrl = this.getFullUrl(url);
        return super.put(fullUrl, body, options)
            .retry(this.httpRetryCount)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    patch(url: string, body: any | null, options?: any): Observable<any> {
        this.requestInterceptor();
        const fullUrl = this.getFullUrl(url);
        return super.patch(fullUrl, body, options)
            .retry(this.httpRetryCount)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    delete(url: string, options?: any): Observable<any> {
        this.requestInterceptor();
        const fullUrl = this.getFullUrl(url);
        return super.delete(fullUrl, options)
            .retry(this.httpRetryCount)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    /**
     * Request interceptor.
     */
    private requestInterceptor(): void {
        this.loaderService.show();
    }

    /**
     * Response interceptor.
     */
    private responseInterceptor(): void {
        this.loaderService.hide();
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>) {
        return Observable.throw(error);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: any): void {

    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {

    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.responseInterceptor();
    }

}

