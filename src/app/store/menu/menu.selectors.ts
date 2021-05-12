import { createSelector } from "@ngrx/store";

import { AppState } from '../reducer';
import { MenuState } from './menu.reducer';

import * as RestaurantsSelectors from '../restaurants/restaurants.selectors';


export const selectMenuState = (state: AppState) => state.menu;

export const selectMeals = createSelector(
    selectMenuState,
    (state: MenuState) => state.meals
);

export const selectIsLoading = createSelector(
    selectMenuState,
    state => state.loading
);

export const selectRecommendedMeals = createSelector(
    selectMenuState,
    state => state.recommended
);

export const selectItemsForMenu = createSelector(
    selectMeals,
    RestaurantsSelectors.selectNearbyRestaurants,
    (meals, restaurants) => {
        return restaurants.map(r => ({ restaurant: r, meals: meals.filter(m => m.restaurantId === r.id), collapsed: false }))
    }
)

