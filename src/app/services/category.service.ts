import { Injectable } from '@angular/core';
import * as Models from 'models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private categories: Models.Category[] = [
    {
      id: 1,
      title: 'Алкоголь',
      img: '001-wine.svg'
    },
    {
      id: 2,
      title: 'Горячие блюда',
      img: '042-pot.svg'
    },
    {
      id: 3,
      title: 'Супы',
      img: '016-soup.svg' 
    },
    {
      id: 4,
      title: 'Суши',
      img: '034-sushi.svg'
    },
    {
      id: 5,
      title: 'Стейки',
      img: '035-steak.svg'
    }
  ]


  public getCategories(): Models.Category[] {
    return this.categories;
  }
}
