import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { AppState } from '../../store/reducer';
import * as SystemActions from '../../store/system/system.actions';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private store$: Store<AppState>
  ) { }


  public source$ = this.locationService.startBeaconsScan();

  public globalPosition$ = this.locationService.getGlobalPosition();

  ngOnInit() {
    this.globalPosition$.subscribe(location => {
      this.store$.dispatch(SystemActions.setGlobalLocation({ location }))
    });

    this.source$.subscribe(res => console.log(res))

  }

  public ngAfterViewInit(): void {}

  public onCategorySelect(categoryId: number): void {
    // переходим на страницу блюд для данной категории.
  }

}
