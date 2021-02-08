import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Meal } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class MealsApiService {

  constructor() { }

  public getMealsByRestaurant(): Observable<Meal[]> {
    const meals: Meal[] = [
      {
        id: 1,
        name: 'Первое вкусное блюдо',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==',
        price: 235.58,
        rating: 4.5,
        description: 'Описание первого блюда',
        nutrition: [255, 135.25, 548.5]
      },
      {
        id: 2,
        name: 'Второе вкусное блюдо',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==',
        price: 287.58,
        rating: 4.0,
        description: 'Описание второго блюда',
        nutrition: [255, 135.25, 548.5]
      },
      {
        id: 3,
        name: 'Третье вкусное блюдо',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==',
        price: 302.69,
        rating: 4.4,
        description: 'Описание третьего блюда',
        nutrition: [255, 135.25, 548.5]
      }
    ]
    return of(meals);
  }
}
