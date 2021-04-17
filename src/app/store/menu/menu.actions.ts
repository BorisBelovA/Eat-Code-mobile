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

export const all = union({
  setMenuItems,
  setLoading
});

export type MenuActions = typeof all;
