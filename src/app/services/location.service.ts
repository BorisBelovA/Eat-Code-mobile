import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public getCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
