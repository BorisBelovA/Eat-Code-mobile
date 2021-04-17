import { createSelector } from "@ngrx/store";

import { AppState } from '../reducer';
import { RestaurantsState } from './restaurants.reducer';

export const selectRestaurantsState = (state: AppState) => state.restaurants;

export const selectNearbyRestaurants = createSelector(
    selectRestaurantsState,
    (state: RestaurantsState) => state.nearbyRestaurants
);
