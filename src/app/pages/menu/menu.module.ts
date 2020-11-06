import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingIndicatorModule } from 'src/components/loading-indicator/loading-indicator.module';

import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MenuComponent }]),
    LoadingIndicatorModule
  ],
  providers: [],
  exports: [MenuComponent]
})
export class MenuModule { }
