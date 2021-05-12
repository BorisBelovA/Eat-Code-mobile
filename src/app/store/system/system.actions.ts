import { createAction, props, union } from '@ngrx/store';
import { GlobalLocation } from 'models';
import * as models from 'models';

export const testAction = createAction(
  '[system] test action'
);

export const setGlobalLocation = createAction(
  '[System] set global location',
  props<{ location: GlobalLocation }>()
)

export const setClient = createAction(
  '[System] set client',
  props<{ client: models.Client }>()
)
export const all = union({
  testAction,
  setGlobalLocation,
  setClient
});

export type SystemActions = typeof all;