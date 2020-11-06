import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public listCollapsed = false;

  public firstList = {
    collapsed: false,
    items: [
      'Первое вкусное блюдо',
      'Второе вкусное блюдо',
      'Третье вкусное блюдо',
      'Четвертое вкусное блюдо'
    ]
  }

  public swiped(): void {
    console.log('Я добавился в корзину :)')
  }

  public removeFromCart(): void {
    console.log('Я удалился из корзины')
  }

}
