import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as dto from 'dto';
import * as models from 'models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(
    private http: HttpClient
  ) { }

  public createOrder(clientId: number, mealIds: number[], totalPrice: number): Observable<models.OrderShort> {
    return this.http.post<dto.HttpResponse<dto.OrderShort>>('https://eat-code-web-api.herokuapp.com/api/orders/create', {
      clientId,
      mealIds: mealIds.join(';#'),
      totalPrice
    }).pipe(
      map(i => i.items)
    )
  }
}
