import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Meal } from 'models';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input()
  public items: Meal[];

  @Output()
  public addToCart: EventEmitter<Meal> = new EventEmitter<Meal>()

  @Output()
  public removeFromCart: EventEmitter<Meal> = new EventEmitter<Meal>();  

  constructor() { }

  ngOnInit() {}

  public listCollapsed = false;

  public toCart(meal: Meal): void {
    console.log('Я добавился в корзину :)', meal)
    this.addToCart.emit(meal)
  }

  public remove(item: Meal): void {
    console.log('Я удалился из корзины')
    this.removeFromCart.emit(item);
  }

}
