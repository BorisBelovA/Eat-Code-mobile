import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import * as Models from 'models';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {

  public basePathToTimages = '../../assets/icon/restaurant-icons/';

  public sliderOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
  }

  public image = '../../assets/icon/restaurant-icons/001-wine.svg'

  public categories: Models.Category[] = this.categoryService.getCategories();
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {}

}
