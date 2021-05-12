import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClientApiService } from 'src/app/services/api/client-api.service';
import { LoadingIndicatorModule } from 'src/components/loading-indicator/loading-indicator.module';

import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    LoadingIndicatorModule
  ],
  providers: [ClientApiService],
  exports: [LoginComponent]
})
export class LoginModule { }
