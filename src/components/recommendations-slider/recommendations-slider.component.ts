import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import * as models from 'models';

@Component({
  selector: 'app-recommendations-slider',
  templateUrl: './recommendations-slider.component.html',
  styleUrls: ['./recommendations-slider.component.scss'],
})
export class RecommendationsSliderComponent implements OnChanges{

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.7,
  };

  @Input()
  public items: models.Meal[] | null = null;

  @Input()
  public itemType: 'verticalCard' | 'block' = 'verticalCard';

  @Output()
  public addToCart = new EventEmitter<models.Meal>();

  constructor() { }

  public ngOnChanges(changes: SimpleChanges){
     console.log(changes)
  }

  public add(item: models.Meal): void {
    this.addToCart.emit(item);
  }
}
