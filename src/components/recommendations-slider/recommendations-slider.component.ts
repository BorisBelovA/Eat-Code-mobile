import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as models from 'models';

@Component({
  selector: 'app-recommendations-slider',
  templateUrl: './recommendations-slider.component.html',
  styleUrls: ['./recommendations-slider.component.scss'],
})
export class RecommendationsSliderComponent {

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.7
  };

  @Input()
  public items: models.Meal[] | null = null;

  @Input()
  public itemType: 'verticalCard' | 'block' = 'verticalCard';

  @Output()
  public addToCart = new EventEmitter<models.Meal>();

  constructor() { }

  public add(item: models.Meal): void {
    this.addToCart.emit(item);
  }
}
