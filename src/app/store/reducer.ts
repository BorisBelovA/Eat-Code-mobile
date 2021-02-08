import * as CategoriesReducer from './categories/categories.reducer';
import * as SystemReducer from './system/system.reducer';

export const AppState = {
    categories: CategoriesReducer.initialState,
    system: SystemReducer.initialState 
}

export const reducer = {
    categories: CategoriesReducer.reducer,
    system: SystemReducer.reducer
}