import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {}

  public ngAfterViewInit(): void {
    // const animation = this.animationCtrl.create()
    // .addElement(document.querySelector('[data-id="main-page"]'))
    // .duration(100)
    // .fromTo('transform', 'translateX(100%)', 'translateX(0)');

    // animation.play();
  }

}
