import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'models';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('150ms', style({ transform: 'translateY(0%)'})),
      ]),
      transition(':leave', [
        animate('150ms', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
  ]
})
export class MenuListComponent implements OnInit {
  
  @Input()
  public header = '';

  @Input()
  public listItems: {collapsed: boolean, items: Item[]} = {
    collapsed: false,
    items: []
  };

  @Input()
  public titleField = 'title';

  @Output()
  public addToCart = new EventEmitter<Item>();

  @Output()
  public addToFavorite = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {}


  public removeFromCart(): void {
    console.log('Я удалился из корзины')
  }

}
