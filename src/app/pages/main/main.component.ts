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

  public recommendations: models.Meal[] = [
    {
      id: 1,
      name: 'Test',
      image: '',
      price: 450,
      rating: 3.2,
      description: 'Test description',
      nutrition: []
    },
    {
      id: 1,
      name: 'Test',
      image: '',
      price: 450,
      rating: 5,
      description: 'Test description',
      nutrition: []
    },
    {
      id: 1,
      name: 'Test',
      image: '',
      price: 450,
      rating: 2.8,
      description: 'Test description',
      nutrition: []
    },
    {
      id: 1,
      name: 'Test',
      image: '',
      price: 450,
      rating: 4.4,
      description: 'Test description',
      nutrition: []
    }
  ];

  public source$ = this.locationService.startBeaconsScan();

  public locationDefined = false;

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
    this.source$.subscribe(res => console.log(res))
  }

  public async selectPos(): Promise<void> {
    const modal = await this.modalController.create({
      component: GlobalPositionSelectorComponent,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then(
      (response: { data: models.GlobalLocation }) => this.store$.dispatch(SystemActions.setGlobalLocation({ location: response.data }))
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
