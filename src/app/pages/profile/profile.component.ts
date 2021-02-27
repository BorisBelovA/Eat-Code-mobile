import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

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


  constructor() { }

  ngOnInit() {}

}
