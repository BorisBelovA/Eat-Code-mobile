import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { AppState } from '../../store/reducer';
import * as SystemActions from '../../store/system/system.actions';
import { GlobalPositionSelectorComponent } from './components/global-position-selector/global-position-selector.component';
import * as models from 'models';
import * as RestaurantActions from '../../store/restaurants/restaurants.actions';
import * as OrderActions from '../../store/order/order.actions';
import KalmanFilter from 'kalmanjs';
import * as MenuSelectors from '../../store/menu/menu.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private store$: Store<AppState>,
    public modalController: ModalController,
    public toastController: ToastController
  ) { }

  public source$ = this.locationService.startBeaconsScan();

  public recommendations$ = this.store$.select(MenuSelectors.selectRecommendedMeals);

  public locationDefined = false;

  public kalman = new KalmanFilter({R: 0.01, Q: 20, A: 1.1});

  //54d7a75fdff5e725588b
  public firstBeacon = [];
  //e59ff57e5694ca22584d
  public secondBeacon = [];

  ngOnInit() {
    this.locationService.getGlobalPosition().subscribe({
      next: (location) => {
        this.locationDefined = true;
        this.store$.dispatch(SystemActions.setGlobalLocation({ location: { longitude: 37.760513, latitude: 55.6629 } }));
        this.store$.dispatch(RestaurantActions.findNearest({ location: { longitude: 37.760513, latitude: 55.6629 }  }));
      },
      error: (err) => {
        console.error('Не удалось определить местоположение');
        this.selectPos();
      }
    });
    this.source$.subscribe(res => {
      // console.log(`UUID: ${res.uuid} - RSSI: ${res.rssi}, filtered: ${this.kalman.filter(res.rssi)}`)
      console.log()
      if (res.uuid === '54d7a75fdff5e725588b') {
        this.firstBeacon.push(res.rssi)
      }
      if (res.uuid === 'e59ff57e5694ca22584d') {
        this.secondBeacon.push(res.rssi)
      }
      if (this.firstBeacon.length === 20) {
        const kalman1 = new KalmanFilter({R: 3, Q: 40})
        console.log('First', this.firstBeacon, this.firstBeacon.map(i => kalman1.filter(i)))
      }
      if (this.secondBeacon.length === 20) {
        const kalman2 = new KalmanFilter({R: 3, Q: 40})
        console.log('Second', this.secondBeacon, this.secondBeacon.map(i => kalman2.filter(i)))
      }
    });
  }

  public async selectPos(): Promise<void> {
    const modal = await this.modalController.create({
      component: GlobalPositionSelectorComponent,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then(
      (response: { data: models.GlobalLocation }) =>{
         this.store$.dispatch(SystemActions.setGlobalLocation({ location: response.data }))
      }
    );

    return await modal.present();
  }

  public ngAfterViewInit(): void { }

  public onCategorySelect(categoryId: number): void {
    // переходим на страницу блюд для данной категории.
  }

  public addToCart(meal: models.Meal): void {
    this.store$.dispatch(OrderActions.addToCart({ meal }));
    this.showToast('Блюдо добавлено в заказ');
  }

  private showToast = (message: string) => this.toastController.create({ message, duration: 2000 }).then(toast => toast.present());
}
