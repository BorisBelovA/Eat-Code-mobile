import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as models from 'models';

@Component({
  selector: 'app-vertical-card',
  templateUrl: './vertical-card.component.html',
  styleUrls: ['./vertical-card.component.scss'],
})
export class VerticalCardComponent {

  @Input()
  public item: models.Meal | null = null;

  @Output()
  public addToCart: EventEmitter<models.Meal> = new EventEmitter<models.Meal>();

  get rating(): string[] {
    if (this.item) {
      const filledStars = Math.floor(this.item.rating);
      const halfOutlinedStars = Math.round(this.item.rating - filledStars) >= 1 ? 1 : 0;
      const outlinedStars = 5 - filledStars - halfOutlinedStars;
      return [
        ...new Array(filledStars).fill('star'),
        ...new Array(halfOutlinedStars).fill('star-half-outline'),
        ...new Array(outlinedStars).fill('star-outline'),
      ];
    }
  }

  constructor() { }

  public add(item: models.Meal): void {
    this.addToCart.emit(item);
  }

}
