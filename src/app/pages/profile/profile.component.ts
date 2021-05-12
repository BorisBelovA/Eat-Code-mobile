import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as models from 'models';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducer';
import * as ProfileSelectors from './profile.selectors';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import { tap } from 'rxjs/operators';
import { ReservationsApiService } from 'src/app/services/api/reservations-api.service';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';

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


  // public orders = [
  //   {
  //     date: '12 ферваля 2021',
  //     id: 12315235,
  //     totalAmount: 5345,
  //     meals: [
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //     ]
  //   },
  //   {
  //     date: '12 ферваля 2021',
  //     id: 12315235,
  //     totalAmount: 5345,
  //     meals: [
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //     ]
  //   },
  //   {
  //     date: '12 ферваля 2021',
  //     id: 12315235,
  //     totalAmount: 5345,
  //     meals: [
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //       {id: 1, name: '12321'},
  //     ]
  //   },
  // ];

  public orders: models.OrderShort[] = [];

  public reservations: models.Reservation[] = [];

  public globalPosition: models.GlobalLocation | null = null;

  public reservationWizardSubscriptions = new Subscription();

  public loading = false;

  constructor(
    public modalController: ModalController,
    private restaurantApi: RestaurantApiService,
    private ordersApi: OrdersApiService,
    private reservationsApi: ReservationsApiService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.getReservations();
    this.getClientOrders();
  }

  public getReservations(): void {
    this.loading = true;
    this.reservationsApi.getAll().pipe(
      tap(reservatios => this.reservations = reservatios)
    ).subscribe({
      next: () => this.loading = false
    });
  }

  public getClientOrders(): void {
    this.loading = true;
    this.ordersApi.getClientOrders(1).pipe(
      tap(orders => this.orders = orders)
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
