import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private client = {
    name: 'Иванов Иван Иванович'
  }

  public clientName$ = of(this.client.name)

  public sliderOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4,
  }

  public ordersSlider = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  }


  public orders = [
    {
      date: '12 ферваля 2021',
      id: 12315235,
      totalAmount: 5345,
      meals: [
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
      ]
    },
    {
      date: '12 ферваля 2021',
      id: 12315235,
      totalAmount: 5345,
      meals: [
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
      ]
    },
    {
      date: '12 ферваля 2021',
      id: 12315235,
      totalAmount: 5345,
      meals: [
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
        {id: 1, name: '12321'},
      ]
    },
  ]

  public reservations = [];


  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  public async reserve(): Promise<void> {
    const modal = await this.modalController.create({
      component: ReservationWizardComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
