import { createAction, props, union } from '@ngrx/store';
import * as models from 'models';

export const setMenuItems = createAction(
  '[Menu] set menu items',
  props<{ meals: models.Meal[] }>()
);

export const setLoading = createAction(
  '[Menu] set loading',
  props<{ loading: boolean }>()
);

export const setRecommendedMeals = createAction(
  '[Menu] set recommended meals',
  props<{ meals: models.Meal[] }>()
);

export const addToFavorite = createAction(
  '[Menu] add meal to favorite',
  props<{ meal: models.Meal, isFavorite: boolean }>()
);

export const markAsFavorite = createAction(
  '[Menu] mark meal as favorite',
  props<{ mealId: number; isFavorite: boolean}>()
);

export const updateMealItem = createAction(
  '[Menu] update meal item',
  props<{ meal: models.Meal }>()
);

export const all = union({
  setMenuItems,
  setLoading,
  setRecommendedMeals,
  updateMealItem,
  markAsFavorite
});

export type MenuActions = typeof all;
