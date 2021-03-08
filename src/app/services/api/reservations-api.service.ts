import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as models from 'models';
import * as dto from 'dto';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsApiService {

  private baseUrl = 'https://eat-code-web-api.herokuapp.com/api/reservations';

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<models.Reservation[]> {
    return forkJoin([
      this.http.get<dto.HttpResponse<dto.Reservation[]>>(this.baseUrl + '/'),
      this.http.get<dto.HttpResponse<dto.Restaurant[]>>('https://eat-code-web-api.herokuapp.com/api/restaurants/')
    ]).pipe(
      map(([reservations, restaurants]) => {
        return reservations.items.map(res => {
          const restaurant = restaurants.items.find(i => i.id === res.restaurantId);
          return {
            ...res,
            restaurant: {
              id: restaurant.id,
              name: restaurant.name,
              address: restaurant.address
            }
          }
        });
      })
    );
  }

  public addReservation(reservation: {
    restaurantId: number,
    date: Date,
    tableId: number
  }): Observable<any> {
    const url = 'https://eat-code-web-api.herokuapp.com/api/reservations/add';
    return this.http.post<dto.HttpResponse<dto.Reservation[]>>(url, {
      restaurantId: reservation.restaurantId,
      date: reservation.date,
      tableId: reservation.tableId,
      clientId: 1
    }).pipe(
      map(i => i)
    );
  }

  public removeReservation(id: number): Observable<unknown> {
    return this.http.post(this.baseUrl + '/remove', {
      reservationId: id
    });
  }

  private mapToModel(dto: dto.Reservation): models.Reservation {
    return {
      id: dto.id,
      date: dto.date,
      tableId: dto.tableId,
      restaurant: {
        id: dto.restaurantId,
        name: 'Test',
        address: 'awdawd'
      }
    }
  }
}
