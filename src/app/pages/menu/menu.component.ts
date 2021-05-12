import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as models from 'models';
import { AppState } from 'src/app/store/reducer';
import { MealsApiService } from '../../services/api/meals-api.service';
import * as OrderActions from '../../store/order/order.actions';
import * as MenuActions from '../../store/menu/menu.actions';
import * as RestaurantActions from '../../store/restaurants/restaurants.actions';
import * as MenuSelectors from '../../store/menu/menu.selectors';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public items$ = this.store$.select(MenuSelectors.selectItemsForMenu);
  public loading$ = this.store$.select(MenuSelectors.selectIsLoading);

  constructor(
    private mealsApiService: MealsApiService,
    private store$: Store<AppState>,
    public toastController: ToastController,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.store$.dispatch(RestaurantActions.loadMealsFromNearbyRestaurants());
  }

  public addToCart(meal: models.Meal): void {
    this.store$.dispatch(OrderActions.addToCart({ meal }));
    this.notification.showToast('Блюдо добавлено в заказ.');
  }

  public removeFromCart(meal: models.Meal): void {
    this.store$.dispatch(OrderActions.removeFromCart({ meal }))
    this.notification.showToast('Блюдо удалено из заказа.');
  }

  public markAsFavorite(event: { meal: models.Meal, isFavorite: boolean }): void {
    this.store$.dispatch(MenuActions.addToFavorite({ meal: event.meal, isFavorite: event.isFavorite }));
  }
}
