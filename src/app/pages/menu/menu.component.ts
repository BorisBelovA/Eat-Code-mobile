import { Component, OnInit } from '@angular/core';
import { Meal } from 'models';
import { MealsApiService } from '../../services/api/meals-api.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public meals$ = this.mealsApiService.getMealsByRestaurant();

  constructor(
    private mealsApiService: MealsApiService
  ) { }

  ngOnInit() {
    this.meals$.subscribe();
  }
}
