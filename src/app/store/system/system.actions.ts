import { createAction, props, union } from '@ngrx/store';
import { GlobalLocation } from 'models';

export const testAction = createAction(
    '[system] test action'
);

export const setGlobalLocation = createAction(
    '[System] set global location',
    props<{ location: GlobalLocation }>()
)

export const setUderId = createAction(
    '[System] set userId',
    props<{userId: number}>()
);

export const all = union({
    testAction,
    setGlobalLocation,
    setUderId
});

export type SystemActions = typeof all;