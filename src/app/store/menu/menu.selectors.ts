import { createSelector } from "@ngrx/store";

import { AppState } from '../reducer';
import { MenuState } from './menu.reducer';

export const selectMenuState = (state: AppState) => state.menu;

export const selectMeals = createSelector(
    selectMenuState,
    (state: MenuState) => state.meals
);

export const selectIsLoading = createSelector(
    selectMenuState,
    state => state.loading
);

export const selectOrdered = createSelector(
    selectMenuState,
    state => state.ordered
)