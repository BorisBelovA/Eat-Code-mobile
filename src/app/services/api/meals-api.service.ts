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
        price: j.price,
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

  public getMeals(): Observable<Meal[]> {
    return this.http.get<{
      id: number;
      value: string;
      description: string;
      price: number;
      rating: number
    }[]>('http://localhost:9098/bmstuapi/meal/getAll').pipe(
      map(i => [{
        id: 1,
        value: 'Каппа ролл',
        description: 'Ролл с огурцом',
        price: 112,
        rating: 0.9,
      },
      {
        id: 1,
        value: 'Авокадо ролл',
        description: 'Ролл с авокадо',
        price: 120,
        rating: 0.6,
      }
    ].map(j => ({
        id: j.id,
        name: j.value,
        image: '../../../assets/images/meal-placeholder/image.webp',
        price: j.price,
        rating: j.rating,
        description: j.description,
        nutrition: [],
        restaurantId: 0,
        categoryId: 0
      })))
    )
  }
}
