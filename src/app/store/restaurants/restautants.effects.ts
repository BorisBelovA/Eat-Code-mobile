import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import * as RestaurantsActions from './restaurants.actions';

@Injectable()
export class RestaurantsEffects {

  loadRestaurants$ = createEffect(() => this.actions$.pipe(
    ofType(RestaurantsActions.findNearest),
    switchMap(({location}) => this.restaurantsApi.getNearestRestaurants(location).pipe(
      switchMap(restaurants => {
        console.log(restaurants);
        return [];
      })
    ))
  )
  );

  constructor(
    private actions$: Actions,
    private restaurantsApi: RestaurantApiService
  ) { }
}