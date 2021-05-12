import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as models from 'models';
import esri = __esri;
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import { MapService } from 'src/app/services/map.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ReservationsApiService } from 'src/app/services/api/reservations-api.service';

interface WizardStep {
  step: 'Map' | 'DateTime' | 'Table';
  title: string;
}

@Component({
  selector: 'app-reservation-wizard',
  templateUrl: './reservation-wizard.component.html',
  styleUrls: ['./reservation-wizard.component.scss'],
})
export class ReservationWizardComponent implements OnInit {

  @Input()
  public globalPosition: models.GlobalLocation | null = null;

  public selectedRestaurantId: number | null = null;

  public selectedDate: Date | null = null;

  public selectedTableId: number | null = null;

  public wizardSteps: WizardStep[] = [
    {
      step: 'Map',
      title: 'Выберите ресторан на карте'
    },
    {
      step: 'DateTime',
      title: 'Выберите дату и время посещения'
    },
    {
      step: 'Table',
      title: 'Выберите столик'
    }
  ];

  public currentStep: WizardStep = this.wizardSteps[0];

  public get stepNumber(): number {
    return this.wizardSteps.indexOf(this.currentStep) + 1;
  }

  constructor(
    private restaurantApi: RestaurantApiService,
    private reservationsApi: ReservationsApiService,
    private mapService: MapService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  @ViewChild('mapViewEl')
  public mapViewEl!: ElementRef;

  ngOnInit() {
    this.restaurantApi.getRestaurants().subscribe({
      next: (restaurants) => {
        this.mapService.createMap('topo', {
          center: {
            longitude: this.globalPosition.longitude,
            latitude: this.globalPosition.latitude,
          },
          zoom: 14,
        },
        restaurants,
        this.clickCallback
        );
      }
    });
  }

  public next(): void {
    this.currentStep = this.wizardSteps[this.wizardSteps.indexOf(this.currentStep) + 1];
  }

  public back(): void {
    this.currentStep = this.wizardSteps[this.wizardSteps.indexOf(this.currentStep) - 1];
  }

  public submit(): void {
    this.reservationsApi.addReservation({
      restaurantId: this.selectedRestaurantId,
      date: this.selectedDate,
      tableId: this.selectedTableId
    }).subscribe({
      next: () => {
        this.dismissModal();
      },
      error: () => {
        this.showToast('Не удалось зарезервировать столик. Попробуйте выбрать другие даты / время / столик.')
      }
    });
  }

  public clickCallback = (event: esri.MapViewClickEvent, view: esri.MapView) => {
    view.hitTest(event).then((response) => {
      if (response.results.length) {
        const graphic = response.results[0].graphic;
        this.selectedRestaurantId = graphic.attributes.id;
        console.log(graphic, this.selectedRestaurantId);
      }
    });
  }

  public dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  private showToast = (message: string) => this.toastController.create({ message, duration: 1000 }).then(toast => toast.present());


}
