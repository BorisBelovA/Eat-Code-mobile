import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as models from 'models';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input()
  public items: {
    restaurant: models.Restaurant,
    meals: models.Meal[],
    collapsed: boolean
  }[];

  @Output()
  public addToCart: EventEmitter<models.Meal> = new EventEmitter<models.Meal>();

  @Output()
  public removeFromCart: EventEmitter<models.Meal> = new EventEmitter<models.Meal>();

  @Output()
  public markAsFavorite = new EventEmitter<{meal: models.Meal, isFavorite: boolean}>();

  constructor() { }

  ngOnInit() {}

  public listCollapsed = false;

  public toCart(meal: models.Meal): void {
    console.log('Я добавился в корзину :)', meal);
    this.addToCart.emit(meal);
  }

  public remove(item: models.Meal): void {
    console.log('Я удалился из корзины');
    this.removeFromCart.emit(item);
  }

  public like(item: models.Meal, isFavorite: boolean): void {
    this.markAsFavorite.next({ meal: item, isFavorite });
  }
}
