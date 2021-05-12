import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as models from 'models';
import * as MenuActions from './menu.actions';

export interface MenuState {
  meals: models.Meal[];
  recommended: models.Meal[];
  loading: boolean;
}

export const initialState: MenuState = {
  meals: [],
  recommended: [],
  loading: false
}

const menuReducer = createReducer(
  initialState,
  on(
    MenuActions.setMenuItems,
    (state, { meals }) => ({
      ...state,
      meals
    })
  ),
  on(
    MenuActions.setLoading,
    (state, { loading }) => ({
      ...state,
      loading
    })
  ),
  on(
    MenuActions.setRecommendedMeals,
    (state, { meals }) => ({
      ...state,
      recommended: meals
    })
  ),
  on(
    MenuActions.updateMealItem,
    (state, { meal }) => ({
      ...state,
      meals: state.meals.reduce((acc, curr) => (curr.id === meal.id ? [...acc, meal] : [...acc, curr]), [])
    })
  ),
  on(
    MenuActions.markAsFavorite,
    (state, {mealId, isFavorite}) => ({
      ...state,
      meals: state.meals.map((m: models.Meal) => m.id === mealId ? ({...m, isFavorite}) : m)
    })
  )
);

export function reducer(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}


