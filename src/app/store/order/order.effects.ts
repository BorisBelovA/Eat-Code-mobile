import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../reducer';
import { Store } from '@ngrx/store';
import * as OrderActions from './order.actions';
import * as OrderSelectors from './order.selectors'
@Injectable()
export class OrderEffects {

  @Effect({dispatch: false})
  public createOrder = this.actions$.pipe(
    ofType(OrderActions.createOrder),
    withLatestFrom(this.store$),
    switchMap(([action, state]) => {
      const orderedMeals = OrderSelectors.selectOrderedMeals(state)
      console.log(orderedMeals)
      return [];
    })
  )

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) { }
}