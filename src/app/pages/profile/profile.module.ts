import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }])
  ],
  declarations: [ProfileComponent, ReservationWizardComponent],
  exports: [ProfileComponent]
})
export class ProfileComponentModule {}
