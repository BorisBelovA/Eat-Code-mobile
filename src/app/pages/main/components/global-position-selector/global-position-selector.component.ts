import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestaurantApiService } from 'src/app/services/api/restaurant-api.service';
import { MapService } from 'src/app/services/map.service';
import esri = __esri;

@Component({
  selector: 'app-global-position-selector',
  templateUrl: './global-position-selector.component.html',
  styleUrls: ['./global-position-selector.component.scss'],
})
export class GlobalPositionSelectorComponent implements OnInit {

  constructor(
    private mapService: MapService,
    private restaurantsApi: RestaurantApiService,
    private modalControl: ModalController
  ) { }

  public position: {
    longitude: number;
    latitude: number
  } | null = null;

  ngOnInit() {
    this.restaurantsApi.getRestaurants().subscribe({
      next: (restaurants) => {
        this.mapService.createMap('topo', {
          center: {
            longitude: 37.618278,
            latitude: 55.752750,
          },
          zoom: 14,
        },
        restaurants,
        this.clickCallback
        );
      }
    });
  }

  public clickCallback = (event: esri.MapViewClickEvent, view: esri.MapView) => {
    view.hitTest(event).then((response) => {
      if (response.results.length) {
        this.position = {
          longitude: response.results[0].mapPoint.longitude,
          latitude: response.results[0].mapPoint.latitude
        };
      }
    });
  }

  public accept(): void {
    this.modalControl.dismiss(this.position);
  }

}
