import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Postman-Token': '80f9f453-1a43-4c29-add1-f708d161b44c',
    'cache-control': 'no-cache'
  })
};

@Injectable()
export class RecaptchaService {

  url = 'https://www.google.com/recaptcha/api/siteverify';

  readonly SECRET_KEY = '6LdAWe0UAAAAAIrOyzwC5Uig18ilNr1A59zSbp1a';

  constructor(private http: HttpClient) { }


  public getResult(token: string): Observable<any> {
    const objeto = { secret: this.SECRET_KEY, response: token };
    console.warn(`%c token ${token}`, 'color: red;');

    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
      params: [{ secret: this.SECRET_KEY }, { response: token }]
    };
    let ur = `https://www.google.com/recaptcha/api/siteverify?secret=` +
      `${this.SECRET_KEY}&response=${token}`;

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('secret', this.SECRET_KEY);
    urlSearchParams.append('response', token);

    return this.http.post<any>(ur, null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}