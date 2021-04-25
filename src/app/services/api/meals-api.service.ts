import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Meal } from '../../models/models';
import * as dto from 'dto';

@Injectable({
  providedIn: 'root'
})
export class MealsApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getMealsByRestaurantIds(ids: number[]): Observable<Meal[]> {
    return this.http.get<dto.HttpResponse<dto.Meal[]>>('https://eat-code-web-api.herokuapp.com/api/meals/get-by-restaurant-id',
    {
      params: {
        ids: ids.join(';#')
      }
    }).pipe(
      map(i => i.items.map(j => ({
        id: j.id,
        name: j.name,
        image: j.photo,
        price: Number(j.price),
        rating: j.rating,
        description: j.description,
        restaurantId: j.restaurantId,
        categoryId: j.categoryId,
        nutrition: [
          j.nutrition.calories,
          j.nutrition.totalFat,
          j.nutrition.sugar,
          j.nutrition.sodium,
          j.nutrition.protein,
          j.nutrition.saturatedFat
        ]
      })))
    );
  }
}
