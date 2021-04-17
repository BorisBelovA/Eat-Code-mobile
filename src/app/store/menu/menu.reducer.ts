import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as models from 'models';
import * as MenuActions from './menu.actions';

export interface MenuState {
  meals: models.Meal[];
  loading: boolean;
}

export const initialState: MenuState = {
  meals: [],
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
  )
);

export function reducer(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}


