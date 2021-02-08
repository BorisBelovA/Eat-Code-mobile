import { createAction, props, union } from '@ngrx/store';
import { GlobalLocation } from 'models';

export const testAction = createAction(
    '[system] test action'
);

export const setGlobalLocation = createAction(
    '[System] set global location',
    props<{ location: GlobalLocation }>()
)

export const all = union({
    testAction,
    setGlobalLocation
});

export type SystemActions = typeof all;