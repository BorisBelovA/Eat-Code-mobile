import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as MenuActions from '../menu/menu.actions';
import * as RestaurantsActions from '../restaurants/restaurants.actions';
import { MealsApiService } from '../../services/api/meals-api.service'
import { AppState } from '../reducer';
import { Store } from '@ngrx/store';
import * as SystemSelectors from '../system/system.selectors';
import { EMPTY, of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class MenuEffects {

  @Effect()
  public getReccomendations$ = this.actions$.pipe(
    ofType(RestaurantsActions.setNearest),
    withLatestFrom(this.store$),
    switchMap(([{ restaurants }, state]) => {
      const client = SystemSelectors.selectClient(state);
      return this.mealsService.getReccomendations(client.id, restaurants).pipe(
        map(meals => MenuActions.setRecommendedMeals({ meals })),
        catchError(err => {
          console.error(err);
          return of(err);
        })
      );
    })
  );

  @Effect()
  public markMealAsFavorite = this.actions$.pipe(
    ofType(MenuActions.addToFavorite),
    withLatestFrom(this.store$),
    switchMap(([{meal, isFavorite}, state]) => {
      const clientId = SystemSelectors.selectClient(state).id;
      return this.mealsService.markAsFavorite(clientId, meal.id, isFavorite).pipe(
        map(({mealId, isFavorite}) => {
          this.notification.showToast(isFavorite ? 'Блюдо добавлено в любимые!' : 'Блюдо удалено из любимых!');
          return MenuActions.markAsFavorite({ mealId, isFavorite });
        }),
        catchError(err => {
          console.log(err)
          this.notification.showToast('Произошла ошибка! Повторите попытку.');
          return of();
        })
      )
    })
  )

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private mealsService: MealsApiService,
    private notification: NotificationService
  ) { }
}