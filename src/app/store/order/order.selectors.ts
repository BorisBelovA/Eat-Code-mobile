import { createSelector } from "@ngrx/store";

import { AppState } from '../reducer';
import { OrderState } from './order.reducer';

export const selectOrderState = (state: AppState) => state.order;

export const selectOrderedMeals = createSelector(
    selectOrderState,
    (state: OrderState) => state.meals
);
