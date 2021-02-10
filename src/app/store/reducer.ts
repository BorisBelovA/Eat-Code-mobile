import * as CategoriesReducer from './categories/categories.reducer';
import * as SystemReducer from './system/system.reducer';

export type AppState = {
    categories: CategoriesReducer.CategoriesState,
    system: SystemReducer.SystemState 
}

export const reducer = {
    categories: CategoriesReducer.reducer,
    system: SystemReducer.reducer
}