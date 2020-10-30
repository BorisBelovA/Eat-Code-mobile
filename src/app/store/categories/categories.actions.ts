import { createAction, union } from '@ngrx/store';

export const testAction = createAction(
    'test action'
)

export const all = union({
    testAction
});

export type CategoriesActions = typeof all;