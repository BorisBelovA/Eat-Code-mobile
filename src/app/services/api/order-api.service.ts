import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(
    private http: HttpClient
  ) { }

  public createOrder(
    clientId: number,
    mealIds: number[],
    totalPrice: number
  ): Observable<any> {
    return this.http.post('http://localhost:9098/bmstuapi/client/createOrder', {
      id: clientId,
      meals: mealIds,
      cost: totalPrice
    })
  }
}
