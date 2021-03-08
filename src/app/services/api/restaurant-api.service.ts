import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dto from 'dto';
import * as models from 'models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getNearestRestaurants(): any {

  }

  public getRestaurants(): Observable<models.Restaurant[]> {
    const url = 'https://eat-code-web-api.herokuapp.com/api/restaurants';
    return this.http.get<dto.HttpResponse<dto.Restaurant[]>>(url).pipe(
      map(i => i.items.map(r => this.mapToModel(r)))
    );
  }

  private mapToModel(dto: dto.Restaurant): models.Restaurant {
    return {
      ...dto,
      coordinates: {
        longitude: dto.coordinates.y,
        latitude: dto.coordinates.x
      }
    };
  }

}
