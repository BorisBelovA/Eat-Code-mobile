import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducer';
import * as OrderSelectors from '../../store/order/order.selectors';
import * as OrderActions from '../../store/order/order.actions';
import * as models from 'models';

type MealWithAmount = models.Meal & {
  amount: number
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  public orderedMeals$ = this.store$.select(OrderSelectors.selectOrderedMeals).pipe(
    map(meals => this.transfromToMealsWithAmount(meals))
  );

  public anyItemsInOrder$ = this.orderedMeals$.pipe(
    map(meals => meals.length > 0)
  );

  public amountOfItems$ = this.orderedMeals$.pipe(
    map(meals => meals.length)
  );

  public totalCost$ = this.orderedMeals$.pipe(
    map(meals => meals.reduce((summ: number, meal) => summ + meal.price * meal.amount, 0).toFixed(2))
  );

  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {}

  public addMealToCart(m: MealWithAmount): void {
    const {amount, ...meal} = m;
    this.store$.dispatch(OrderActions.addToCart({ meal }));
  }

  public removeOneMealFromCart(m: MealWithAmount): void {
    const {amount, ...meal} = m;
    this.store$.dispatch(OrderActions.decrementMeal({ meal }));
  }


  private transfromToMealsWithAmount(meals: models.Meal[]): MealWithAmount[] {
    const uniqueMealsIds = Array.from(new Set(meals.map(m => m.id)));
    return uniqueMealsIds.map(id => ({
      ...meals.filter(i => i.id === id)[0],
      amount: meals.filter(i => i.id === id).length
    }));
  }

}
