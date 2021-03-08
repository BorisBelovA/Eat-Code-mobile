import { Component, OnInit } from '@angular/core';
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
    private restaurantsApi: RestaurantApiService
  ) { }

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
    })
  }

  public clickCallback = (event: esri.MapViewClickEvent, view: esri.MapView) => {
    view.hitTest(event).then((response) => {
      if (response.results.length) {
        console.log('awdawd')
        // const graphic = response.results[0].graphic;
        // this.selectedRestaurantId = graphic.attributes.id;
        // console.log(graphic, this.selectedRestaurantId);
      }
    });
  }

}
