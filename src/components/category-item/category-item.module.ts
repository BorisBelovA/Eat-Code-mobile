import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoryItemComponent } from './category-item.component';


@NgModule({
  declarations: [CategoryItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [],
  exports: [CategoryItemComponent]
})
export class CategoryItemModule { }
