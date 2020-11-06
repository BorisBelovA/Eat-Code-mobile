import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoadingIndicatorComponent } from './loading-indicator.component';


@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [],
  exports: [LoadingIndicatorComponent]
})
export class LoadingIndicatorModule { }
