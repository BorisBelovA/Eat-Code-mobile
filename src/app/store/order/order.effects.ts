import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../reducer';
import { Store } from '@ngrx/store';
import * as OrderActions from './order.actions';
import * as OrderSelectors from './order.selectors';
import * as SystemSelectors from '../system/system.selectors';
import { OrderApiService } from 'src/app/services/api/order-api.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class OrderEffects {

  @Effect({dispatch: false})
  public createOrder = this.actions$.pipe(
    ofType(OrderActions.createOrder),
    withLatestFrom(this.store$),
    switchMap(([action, state]) => {
      const orderedMeals = OrderSelectors.selectOrderedMeals(state);
      const ids = orderedMeals.map(i => Number(i.id));
      const totalPrice = orderedMeals.reduce((acc, curr) => acc + curr.price, 0);
      const userId = Number(SystemSelectors.selectUserId(state));
      return this.ordersApi.createOrder(userId, ids, totalPrice).pipe(
        tap(result => {
          console.log(result)
          this.showToast('Заказ успешно создан!')
        })
      );
    })
  )

  private showToast = (message: string) => this.toastController.create({ message, duration: 1000 }).then(toast => toast.present());

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private ordersApi: OrderApiService,
    public toastController: ToastController
  ) { }
}