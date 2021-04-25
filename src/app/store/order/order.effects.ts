import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../reducer';
import { Store } from '@ngrx/store';
import * as OrderActions from './order.actions';
import * as OrderSelectors from './order.selectors';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';

@Injectable()
export class OrderEffects {

  @Effect()
  public createOrder = this.actions$.pipe(
    ofType(OrderActions.createOrder),
    withLatestFrom(this.store$),
    switchMap(([_, state]) => {
      const orderedMeals = OrderSelectors.selectOrderedMeals(state);
      const orderedMealsIds = orderedMeals.map(i => i.id);
      const amount = orderedMeals.length;
      const totalCost = orderedMeals.reduce((total, meal) => total + meal.price, 0);
      return this.ordersApi.createOrder(1, orderedMealsIds, totalCost).pipe(
        map(i => {
          this.showToast('Заказ успешно создан!');
          return OrderActions.clearOrder();
        }),
        catchError(err => {
          this.showToast('Произошла ошибка!');
          return of();
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private ordersApi: OrdersApiService,
    private toastController: ToastController
  ) { }

  private showToast = (message: string) => this.toastController.create({ message, duration: 1000 }).then(toast => toast.present());

}