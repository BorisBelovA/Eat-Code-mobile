import * as CategoriesReducer from './categories/categories.reducer';
import * as SystemReducer from './system/system.reducer';
import * as OrderReducer from './order/order.reducer';

export type AppState = {
    categories: CategoriesReducer.CategoriesState,
    system: SystemReducer.SystemState,
    order: OrderReducer.OrderState 
}

export const reducer = {
    categories: CategoriesReducer.reducer,
    system: SystemReducer.reducer,
    order: OrderReducer.reducer
}