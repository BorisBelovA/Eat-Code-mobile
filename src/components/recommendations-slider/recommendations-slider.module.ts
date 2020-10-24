import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerticalCardModule } from '../vertical-card/vertical-card.module';

import { RecommendationsSliderComponent } from './recommendations-slider.component';


@NgModule({
  declarations: [RecommendationsSliderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerticalCardModule
  ],
  providers: [],
  exports: [RecommendationsSliderComponent]
})
export class RecommendationsSliderModule { }
