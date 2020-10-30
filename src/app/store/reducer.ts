import * as CategoriesReducer from './categories/categories.reducer';

export const AppState = {
    categories: CategoriesReducer.initialState
}

export const reducer = {
    categories: CategoriesReducer.reducer
}