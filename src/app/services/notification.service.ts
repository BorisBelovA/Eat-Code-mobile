import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastController: ToastController
  ) { }

  public showToast = (message: string) => this.toastController.create({ message, duration: 1000 }).then(toast => toast.present());
}
