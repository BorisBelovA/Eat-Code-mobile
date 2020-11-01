import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SmallElementsSliderComponent } from './small-elements-slider.component';


@NgModule({
  declarations: [SmallElementsSliderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [],
  exports: [SmallElementsSliderComponent]
})
export class SmallElementsSliderModule { }
