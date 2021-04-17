import { createAction, props, union } from '@ngrx/store';
import * as models from 'models';

export const findNearest = createAction(
  '[restaurants] find nearest',
  props<{ location: models.GlobalLocation }>()
);

export const setNearest = createAction(
  '[restaurants] set nearest restaurants',
  props<{ restaurants: models.Restaurant[] }>()
);

export const loadMealsFromNearbyRestaurants = createAction(
  '[restaurants] load meals from nearby reestaurants',
);

export const all = union({
  setNearest
});

export type RestaurantActions = typeof all;

