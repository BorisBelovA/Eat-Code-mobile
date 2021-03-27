import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as models from 'models';
import { AppState } from 'src/app/store/reducer';
import { MealsApiService } from '../../services/api/meals-api.service';
import * as OrderActions from '../../store/order/order.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public meals$ = this.mealsApiService.getMealsByRestaurant();

  constructor(
    private mealsApiService: MealsApiService,
    private store$: Store<AppState>,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.meals$.subscribe();
  }

  public addToCart(meal: models.Meal): void {
    this.store$.dispatch(OrderActions.addToCart({ meal }));
    this.showToast('Блюдо добавлено в заказ.');
  }

  public removeFromCart(meal: models.Meal): void {
    this.store$.dispatch(OrderActions.removeFromCart({ meal }))
    this.showToast('Блюдо удалено из заказа.');
  }

  private showToast = (message: string) => this.toastController.create({ message, duration: 1000 }).then(toast => toast.present());
}
