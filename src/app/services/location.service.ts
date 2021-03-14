import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { from, interval, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as models from 'models';
import * as dto from 'dto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private ble: BLE
  ) { }

  public getGlobalPosition(): Observable<models.GlobalLocation> {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        position => {
          obs.next({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
          obs.complete();
        },
        error => {
          obs.error(error);
        }
      );
    });
  }


  public startBeaconsScan(): Observable<models.BleDevice> {
    return interval(500).pipe(
      switchMap(() => this.ble.scan([], 0.5).pipe(
        map(i => this.mapToModelBleDevice(i))
      ))
    )
  }

  public uint8ArrayToString(uint8Array: Uint8Array) {
    function format(x) {
      var hex = x.toString(16);
      return hex.length < 2 ? '0' + hex : hex;
    }
    var result = '';
    for (var i = 0; i < uint8Array.length; ++i) {
      result += format(uint8Array[i]);
    }
    return result.substring(26, 46);
  }

  private mapToModelBleDevice(device: dto.BleDevice): models.BleDevice {
    return {
      ...device,
      uuid: this.uint8ArrayToString(new Uint8Array(device.advertising))
    }
  }

}
