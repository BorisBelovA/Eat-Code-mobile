import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as models from 'models';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducer';
import * as ProfileSelectors from './profile.selectors';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import { tap } from 'rxjs/operators';
import { ReservationsApiService } from 'src/app/services/api/reservations-api.service';
import * as MenuSelectors from '../../store/menu/menu.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private client = {
    name: 'Иванов Иван Иванович'
  }

  public clientName$ = of(this.client.name);

  public sliderOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4,
  };

  public ordersSlider = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };


  public orderedMeals$ = this.store$.select(MenuSelectors.selectOrdered).pipe(
    map(meals => meals)
  );

  public totalCost$ = this.orderedMeals$.pipe(
    map(meals => meals.reduce((summ: number, meal) => summ + meal.price, 0).toFixed(2))
  );

  public reservations: models.Reservation[] = [];

  public globalPosition: models.GlobalLocation | null = null;

  public reservationWizardSubscriptions = new Subscription();

  public loading = false;

  constructor(
    public modalController: ModalController,
    private restaurantApi: RestaurantApiService,
    private reservationsApi: ReservationsApiService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.getReservations();
  }

  public getReservations(): void {
    this.loading = true;
    this.reservationsApi.getAll().pipe(
      tap(reservatios => this.reservations = reservatios)
    ).subscribe({
      next: () => this.loading = false
    });
  }

  public async reserve(): Promise<void> {
    this.reservationWizardSubscriptions.add(
      this.store$.select(ProfileSelectors.selectGlobalPosition).subscribe(
        globalPosition => this.globalPosition = globalPosition
      )
    );
    const modal = await this.modalController.create({
      component: ReservationWizardComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        globalPosition: this.globalPosition
      },
    });

    modal.onDidDismiss().then(() => this.getReservations());

    return await modal.present();
  }

  public removeReservation(id: number): void {
    this.loading = true;
    this.reservationsApi.removeReservation(id).subscribe(() => this.getReservations());
  }
}
