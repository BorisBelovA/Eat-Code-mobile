import * as CategoriesActions from './categories.actions';
import { Action, createReducer, on } from '@ngrx/store';
import * as Models from 'models';

type Brand<T, U> = T & { __brand: U };

export type CategoryId = Brand<number, 'CategoryId'>;

export interface CategoriesState {
    selectedCategory: CategoryId | null;
    categories: Models.Category[] | null;
}

export const initialState: CategoriesState = {
    selectedCategory: null,
    categories: null
}

const categoriesReducer = createReducer(
    initialState,
    on(CategoriesActions.testAction, state => ({...state}))
)

export function reducer(state: CategoriesState | undefined, action: Action) {
    return categoriesReducer(state, action);
}