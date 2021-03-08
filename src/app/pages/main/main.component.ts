import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { AppState } from '../../store/reducer';
import * as SystemActions from '../../store/system/system.actions';
import { GlobalPositionSelectorComponent } from './components/global-position-selector/global-position-selector.component';
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
  ) { }


  public source$ = this.locationService.startBeaconsScan();

  public globalPosition$ = this.locationService.getGlobalPosition();

  ngOnInit() {
    this.globalPosition$.subscribe(location => {
      this.store$.dispatch(SystemActions.setGlobalLocation({ location }))
    });
    this.source$.subscribe(res => console.log(res))
  }

  public async selectPos(): Promise<void> {
    const modal = await this.modalController.create({
      component: GlobalPositionSelectorComponent,
      cssClass: 'my-custom-class',
    });

    return await modal.present();

  }

  public ngAfterViewInit(): void {}

  public onCategorySelect(categoryId: number): void {
    // переходим на страницу блюд для данной категории.
  }

}
