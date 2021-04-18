import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthorizationApiService } from 'src/app/services/api/authorization-api.service';

import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  providers: [AuthorizationApiService],
  exports: [LoginComponent]
})
export class LoginModule { }
