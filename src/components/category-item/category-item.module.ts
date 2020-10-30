import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';

import { CategoryItemComponent } from './category-item.component';


@NgModule({
  declarations: [CategoryItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [CategoryService],
  exports: [CategoryItemComponent]
})
export class CategoryItemModule { }
