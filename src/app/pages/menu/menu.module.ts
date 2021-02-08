import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MealsApiService } from 'src/app/services/api/meals-api.service';
import { LoadingIndicatorModule } from 'src/components/loading-indicator/loading-indicator.module';
import { MenuListComponent } from './menu-list/menu-list.component';

import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent, MenuListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MenuComponent }]),
    LoadingIndicatorModule
  ],
  providers: [ MealsApiService ],
  exports: [MenuComponent]
})
export class MenuModule { }
