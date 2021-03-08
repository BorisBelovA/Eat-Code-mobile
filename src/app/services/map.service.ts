import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import * as models from 'models';
import { SimpleRenderer } from 'esri/renderers';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  public restaurantIdSubject$ = new Subject<number>();

  public async createMap(
    basemapType: string,
    options: {
      center?: {
        longitude: number
        latitude: number,
      },
      zoom?: number
    },
    features?: any[],
    clickCallback?: (
      event: esri.MapViewClickEvent,
      view: esri.MapView
    ) => void
  ): Promise<void> {
    const [esriConfig, MapView] = await loadModules(['esri/config', 'esri/views/MapView']);

    esriConfig.apiKey = 'AAPK8d3d2d1cd74d4c97ad7266867fa8c43aKGizeOkoSs9Y6vqjdm9dDI6gwrXcAt8eYo3HvoNq-p8VldXWTyIdtBFrPoAcNHF2';

    const map = await this.generateBaseMap(basemapType);

    const view: esri.MapView = new MapView({
      map,
      container: 'viewDiv',
      center: [options.center.longitude, options.center.latitude],
      zoom: options.zoom
    });

    if (features.length > 0) {
      const featureLayer = await this.createFeatureLayer(
        await this.createGraphicObjects(features)
      );
      console.log(featureLayer)
      view.map.add(featureLayer);

      // view.on('click', (event) => {
      //   const opts = {
      //     include: featureLayer
      //   };
      //   view.hitTest(event, opts).then((response) => {
      //     if (response.results.length) {
      //       const graphic = response.results[0].graphic;
      //     }
      //   });
      // });
    }
    view.on('click', (event) => clickCallback(event, view));


  }

  public async generateBaseMap(basemapType: string): Promise<esri.Map> {
    return loadModules(['esri/Map']).then(([Map]) => {
      return new Map({
        basemap: 'topo'
      });
    });
  }

  public async createPoints(objects: { longitude: number, latitude: number }[]): Promise<esri.Point[]> {
    const [Point] = await loadModules(['esri/geometry/Point']);
    return objects.map(o => new Point({
      longitude: o.longitude,
      latitude: o.latitude
    }));
  }

  public async createGraphicObjects(objects: models.Restaurant[]): Promise<esri.Graphic[]> {
    const [Graphic, Point] = await loadModules(['esri/Graphic', 'esri/geometry/Point']);
    return objects.map(p => new Graphic({
      geometry: new Point({
        longitude: p.coordinates.longitude,
        latitude: p.coordinates.latitude
      }),
      attributes: {
        title: p.name,
        address: p.address,
        id: p.id
      }
    }));
  }

  public getRestaurantFields(): { name: string, type: string }[] {
    return [{
      name: 'id',
      type: 'oid'
    },
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'address',
      type: 'string'
    }];
  }

  public createRestaurentsPopup() {
    return {
      title: 'Информация о ресторане',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'title',
              label: 'Название'
            },
            {
              fieldName: 'address',
              label: 'Адрес'
            },
          ]
        }
      ]
    };
  }

  public createRestaurantRenderer() {
    return {
      type: 'simple',  // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-marker',  // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: 'white',
        outline: {  // autocasts as new SimpleLineSymbol()
          width: 1.5,
          color: 'black'
        }
      }
    };
  }

  public async createFeatureLayer(features?: esri.Graphic[]): Promise<esri.FeatureLayer> {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
    if (features.length > 0) {
      return new FeatureLayer({
        source: features,  // array of graphics objects
        objectIdField: 'id',
        fields: this.getRestaurantFields(),
        popupTemplate: this.createRestaurentsPopup(),
        renderer: this.createRestaurantRenderer()
      });
    }
    return;
  }
}
