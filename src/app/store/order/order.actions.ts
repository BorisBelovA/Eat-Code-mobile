import { createAction, props, union } from '@ngrx/store';
import * as models from 'models';

export const testAction = createAction(
  'test action'
)

export const addToCart = createAction(
  '[Order] add meal to cart',
  props<{ meal: models.Meal }>()
);

export const clearCart = createAction(
  '[Order] clear cart'
);

export const removeFromCart = createAction(
  '[Order] remove from cart',
  props<{ meal: models.Meal }>()
);

export const decrementMeal = createAction(
  '[Order] decrement one meal',
  props<{ meal: models.Meal}>()
);

export const createOrder = createAction(
  '[Order] create order',
  // props<{ meals: models.Meal[] }>()
);

export const all = union({
  testAction,
  addToCart,
  removeFromCart,
  decrementMeal
});

export type OrderActions = typeof all;