import * as OrderActions from './order.actions';
import { Action, createReducer, on } from '@ngrx/store';
import * as models from 'models';

export interface OrderState {
  meals: models.Meal[];
}

export const initialState: OrderState = {
  meals: []
}

const categoriesReducer = createReducer(
  initialState,
  on(OrderActions.testAction, state => ({ ...state })),
  on(
    OrderActions.addToCart,
    (state, { meal }) => ({
      ...state,
      meals: [...state.meals, meal]
    })
  ),
  on(
    OrderActions.removeFromCart,
    (state, { meal }) => ({
      ...state,
      meals: state.meals.filter(i => i.id !== meal.id)
    })
  ),
  on(
    OrderActions.decrementMeal,
    (state, { meal }) => ({
      ...state,
      meals: [
        ...state.meals.slice(0, state.meals.findIndex(m => m.id === meal.id)),
        ...state.meals.slice(state.meals.findIndex(m => m.id === meal.id) + 1)
      ]
    })
  )
)

export function reducer(state: OrderState | undefined, action: Action) {
  return categoriesReducer(state, action);
}