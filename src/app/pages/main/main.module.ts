import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoryItemModule } from 'src/components/category-item/category-item.module';
import { RecommendationsSliderModule } from 'src/components/recommendations-slider/recommendations-slider.module';

import { MainComponent } from './main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    RecommendationsSliderModule,
    CategoryItemModule
  ],
  providers: [],
  exports: [MainComponent]
})
export class MainModule { }
