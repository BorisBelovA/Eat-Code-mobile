import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Meal } from '../../models/models';
import * as dto from 'dto';
import * as models from 'models';

@Injectable({
  providedIn: 'root'
})
export class MealsApiService {

  private baseAddress = 'https://eat-code-web-api.herokuapp.com/api/meals';

  constructor(
    private http: HttpClient
  ) { }

  public getMealsByRestaurantIds(ids: number[], userId: number): Observable<Meal[]> {
    return this.http.post<dto.HttpResponse<dto.Meal[]>>(this.baseAddress + '/get-by-restaurant-id',
      {
        ids: ids.join(';#'),
        userId
      }).pipe(
        map(i => i.items.map(j => this.mapToModel(j)))
      );
  }

  public getReccomendations(userId: number, nearbyRestaurants: models.Restaurant[]): Observable<models.Meal[]> {
    return this.http.post<dto.HttpResponse<dto.Meal[]>>(this.baseAddress + '/recommended', {
      userId,
      nearbyRestaurants: nearbyRestaurants.map(i => i.id)
    }).pipe(
      map(response => response.items.map(i => this.mapToModel(i)))
    );
  }

  public markAsFavorite(userId: number, mealId: number, isFavorite: boolean): Observable<{ mealId: number; isFavorite: boolean; }> {
    return this.http.post<dto.HttpResponse<{
      created_at: string;
      id: number;
      isFavorite: boolean;
      mealId: number;
      updated_at: string;
      userId: number;
    }>>(this.baseAddress + '/markasfavorite', {
      userId,
      mealId,
      isFavorite
    }).pipe(
      map(response => ({
        mealId: response.items.mealId,
        isFavorite: response.items.isFavorite
      }))
    );
  }

  public mapToModel(meal: dto.Meal): models.Meal {
    return {
      id: meal.id,
      name: meal.name,
      image: meal.photo,
      price: Number(meal.price),
      rating: meal.rating,
      description: meal.description,
      restaurantId: meal.restaurantId,
      categoryId: meal.categoryId,
      nutrition: [
        meal.nutrition.calories,
        meal.nutrition.totalFat,
        meal.nutrition.sugar,
        meal.nutrition.sodium,
        meal.nutrition.protein,
        meal.nutrition.saturatedFat
      ],
      isFavorite: meal.isFavorite
    }
  }
}
