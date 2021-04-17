import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MealsApiService } from 'src/app/services/api/meals-api.service';
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import * as RestaurantsActions from './restaurants.actions';
import * as MenuActions from '../menu/menu.actions';
import { AppState } from '../reducer';
import { Store } from '@ngrx/store';
import * as RestaurantsSelectors from './restaurants.selectors';

@Injectable()
export class RestaurantsEffects {

  loadRestaurants$ = createEffect(() => this.actions$.pipe(
    ofType(RestaurantsActions.findNearest),
    switchMap(({location}) => this.restaurantsApi.getNearestRestaurants(location).pipe(
      switchMap(restaurants => {
        console.log(restaurants);
        return [
          RestaurantsActions.setNearest({ restaurants  })
        ];
      })
    ))
  ));

  public loadMealsFromNearbyRestaurants = createEffect(() => this.actions$.pipe(
    ofType(RestaurantsActions.loadMealsFromNearbyRestaurants),
    withLatestFrom(this.store$),
    tap(() => this.store$.dispatch(MenuActions.setLoading({ loading: true }))),
    switchMap(([action, state]) => this.mealsService.getMealsByRestaurantIds(
      RestaurantsSelectors.selectNearbyRestaurants(state).map(i => i.id)
    ).pipe(
      map(meals => MenuActions.setMenuItems({ meals }))
    )),
    tap(() => this.store$.dispatch(MenuActions.setLoading({ loading: false }))),
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private restaurantsApi: RestaurantApiService,
    private mealsService: MealsApiService
  ) { }
}