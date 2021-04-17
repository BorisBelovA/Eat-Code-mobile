import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as models from 'models';
import * as RestaurantActions from './restaurants.actions';

export interface RestaurantsState {
  nearbyRestaurants: models.Restaurant[]
}

export const initialState: RestaurantsState = {
  nearbyRestaurants: []
}

const restaurantReducer = createReducer(
  initialState,
  on(
    RestaurantActions.setNearest,
    (state, { restaurants }) => ({
      ...state,
      nearbyRestaurants: restaurants
    })
  )
);

export function reducer(state: RestaurantsState | undefined, action: Action) {
  return restaurantReducer(state, action);
}


