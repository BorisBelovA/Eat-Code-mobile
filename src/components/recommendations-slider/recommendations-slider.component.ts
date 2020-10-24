import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendations-slider',
  templateUrl: './recommendations-slider.component.html',
  styleUrls: ['./recommendations-slider.component.scss'],
})
export class RecommendationsSliderComponent implements OnInit {

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.7
  };
  
  constructor() { }

  ngOnInit() {}

}
