import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerticalCardComponent } from './vertical-card.component';


@NgModule({
  declarations: [VerticalCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [],
  exports: [VerticalCardComponent]
})
export class VerticalCardModule { }
