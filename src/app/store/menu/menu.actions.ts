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

export const setOrdered = createAction(
  '[Menu] set ordered',
  props<{ meals: models.Meal[]}>()
);

export const all = union({
  setMenuItems,
  setLoading,
  setOrdered
});

export type MenuActions = typeof all;
