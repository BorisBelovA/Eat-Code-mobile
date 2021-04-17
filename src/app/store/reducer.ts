import * as CategoriesReducer from './categories/categories.reducer';
import * as SystemReducer from './system/system.reducer';
import * as OrderReducer from './order/order.reducer';
import * as RestaurantReducer from './restaurants/restaurants.reducer';
import * as MenuReducer from './menu/menu.reducer';

export type AppState = {
  categories: CategoriesReducer.CategoriesState,
  system: SystemReducer.SystemState,
  order: OrderReducer.OrderState,
  restaurants: RestaurantReducer.RestaurantsState,
  menu: MenuReducer.MenuState
}

export const reducer = {
  categories: CategoriesReducer.reducer,
  system: SystemReducer.reducer,
  order: OrderReducer.reducer,
  restaurants: RestaurantReducer.reducer,
  menu: MenuReducer.reducer
}