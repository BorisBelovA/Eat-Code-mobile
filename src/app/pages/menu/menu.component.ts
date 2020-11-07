import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from 'models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('listContent')
  public listContent: ElementRef;


  public firstList: { collapsed: boolean, items: Item[] } = {
    collapsed: false,
    items: [
      { id: 1, title: 'Первое вкусное блюдо', price: 280.00, img: '', rating: 0 },
      { id: 2, title: 'Второе вкусное блюдо', price: 280.00, img: '', rating: 0 },
      { id: 3, title: 'Третье вкусное блюдо', price: 280.00, img: '', rating: 0 },
      { id: 4, title: 'Четвертое вкусное блюдо фывфцв фц фв фцв фц вфц вф цв', price: 280.00, img: '', rating: 0},
    ]
  }
  constructor() { }

  ngOnInit() { }

  public listCollapsed = false;

  public onAddToCart($event): void {
    console.log($event);
  }

  public onAddToFavorite($event): void {
    console.log($event);
  }

}
