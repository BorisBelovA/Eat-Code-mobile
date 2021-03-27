import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingIndicatorModule } from 'src/components/loading-indicator/loading-indicator.module';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
    LoadingIndicatorModule
  ],
  exports: [OrderComponent]
})
export class OrderModule { }
