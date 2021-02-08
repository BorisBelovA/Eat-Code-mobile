import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'models';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input()
  public items: Meal[];

  constructor() { }

  ngOnInit() {}

  public listCollapsed = false;

  public swiped(): void {
    console.log('Я добавился в корзину :)')
  }

  public removeFromCart(): void {
    console.log('Я удалился из корзины')
  }

}
