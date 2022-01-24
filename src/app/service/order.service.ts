import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

    getAllEventOrders() {
        return of(null);
    }
}
