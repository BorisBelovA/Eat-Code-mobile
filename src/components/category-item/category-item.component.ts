import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {

  public basePathToTimages = '../../assets/icon/restaurant-icons/';

  public categories = [
    {
      title: 'Алкоголь',
      img: '001-wine.svg'
    },
    {
      title: 'Горячие блюда',
      img: '042-pot.svg'
    },
    {
      title: 'Супы',
      img: '016-soup.svg' 
    },
    {
      title: 'Суши',
      img: '034-sushi.svg'
    },
    {
      title: 'Стейки',
      img: '035-steak.svg'
    }
  ]

  public sliderOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
  }

  image = '../../assets/icon/restaurant-icons/001-wine.svg'

  constructor() { }

  ngOnInit() {}

}
