import { createAction, union } from '@ngrx/store';

export const testAction = createAction(
    '[system] test action'
);

export const all = union({
    testAction
});

export type SystemActions = typeof all;