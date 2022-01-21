import { Injectable } from '@angular/core';
import {HttpService} from './http/http.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _http: HttpService,
  ) {}

  public getUser(): Observable<any> {
    return this._http
      .getData<Tariff[]>(`${TARIFFS_URL}/`)
      .pipe(map((r) => r.data));
  }

}
