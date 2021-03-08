import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';
import { MapService } from 'src/app/services/map.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { ReservationsApiService } from 'src/app/services/api/reservations-api.service';
import { LoadingIndicatorModule } from 'src/components/loading-indicator/loading-indicator.module';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    ReactiveComponentModule,
    LoadingIndicatorModule
  ],
  providers: [MapService, ReservationsApiService],
  declarations: [ProfileComponent, ReservationWizardComponent, DateTransformPipe],
  exports: [ProfileComponent]
})
export class ProfileComponentModule {}
