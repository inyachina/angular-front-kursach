import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpProgressEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpResponse, QueryParams } from './http.type';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
};

@Injectable({
  providedIn: 'root',
})
export class HttpService implements HttpService {
  private SERVER_URL = '\localhost:8080';

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _router: Router,
  ) {}

  private _createDefaultHeaders(noAuth?: boolean): HttpHeaders {
    const headers = new HttpHeaders(DEFAULT_HEADERS);

    return headers;
  }

  private _removeNullParams(params: QueryParams | undefined): {} | null {
    if (!params) { return null; }

    return Object.entries(params).reduce(
      (a: QueryParams, [k, v]) => (v === null ? a : ((a[k] = v), a)),
      {},
    );
  }

  public getData<R>(
    url: string,
    params?: QueryParams,
  ): Observable<HttpResponse<R>> {
    return this._http
      .get<HttpResponse<R>>(this.SERVER_URL + url, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public putData<R>(
    url: string,
    body?: {},
    params?: QueryParams,
  ): Observable<HttpResponse<R>> {
    return this._http
      .put<HttpResponse<R>>(this.SERVER_URL + url, body, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postData<R>(
    url: string,
    body?: {},
    params?: QueryParams,
    noAuth?: boolean,
  ): Observable<HttpResponse<R>> {
    return this._http
      .post<HttpResponse<R>>(this.SERVER_URL + url, body, {
        headers: this._createDefaultHeaders(noAuth),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postSuggest<R>(url: string, body?: {}): Observable<R> {
    const token = '1f3274c345cf877609ac1fbb203bf35eacabc941';
    let headers = new HttpHeaders(DEFAULT_HEADERS);

    headers = headers.append('Authorization', `Token ${token}`);

    return this._http
      .post<R>(url, body, {
        headers,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postBlob<R>(url: string, file: File): Observable<HttpResponse<R>> {
    const data = new FormData();

    data.append('file', file, file.name);

    const headers = this._createDefaultHeaders().delete('Content-Type');

    return this._http
      .post<HttpResponse<R>>(this.SERVER_URL + url, data, {
        headers,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postBlobWithProgress<R>(
    url: string,
    file: File,
  ): Observable<HttpEvent<HttpProgressEvent | HttpResponse<R>>> {
    const data = new FormData();

    data.append('file', file, file.name);

    const headers = this._createDefaultHeaders().delete('Content-Type');

    return this._http
      .post(this.SERVER_URL + url, data, {
        headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public deleteData<R>(
    url: string,
    params?: QueryParams,
  ): Observable<HttpResponse<R>> {
    return this._http
      .delete<HttpResponse<R>>(this.SERVER_URL + url, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  private _handleError(e: HttpErrorResponse): Observable<Error> {
    const code = e.status;

    switch (code) {
      case 500:
        this._snackBar.open('Непредвиденная ошибка', 'Закрыть', {
          duration: 3000,
        });
        break;

      case 502:
        this._snackBar.open('Сервис временно недоступен', 'Закрыть', {
          duration: 3000,
        });
        break;

      case 403:

        if (this._router.url.indexOf('/login/') === -1) {
          this._router.navigateByUrl('login');
        }

        break;

      default:
        break;
    }

    return throwError(e);
  }
}
