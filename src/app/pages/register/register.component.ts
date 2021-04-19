import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthorizationApiService } from 'src/app/services/api/authorization-api.service';
import { AppState } from 'src/app/store/reducer';
import * as SystemActions from '../../store/system/system.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public login: string | null = null;
  public password: string | null = null;
  public name: string | null = null;
  public phone: string | null = null;
  public email: string | null = null;
  public birthdate: string | null = null;

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private authService: AuthorizationApiService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {}

  public ngAfterViewInit(): void {
    const animation = this.animationCtrl.create()
    .addElement(document.querySelector('[data-id="register-page"]'))
    .duration(1000)
    .fromTo('opacity', 0, 1);

    animation.play();
  }

  public disabled(): boolean {
    return !this.login 
    || !this.password
    || !this.name
    || !this.email
    || !this.phone
    || !this.birthdate
  }
  public tryRegister() {
    if (
      !this.login 
      || !this.password
      || !this.name
      || !this.email
      || !this.phone
      || !this.birthdate
    ) {
      throw new Error('Заполните логин или пароль')
    } else {
      this.authService.register(
        this.login,
        this.password,
        this.name,
        this.phone,
        this.email,
        this.birthdate
      ).subscribe(
        result => {
          if (result.assepted === false) {
            alert('Не смогли авторизоваться');
          } else {
            if (!result.client) {
              throw new Error('При авторизации должен быть клиент')
              alert('Не смогли авторизоваться');
            } else {
              this.store$.dispatch(SystemActions.setUderId({userId: result.client}))
              this.router.navigate(['tabs']);
            }
          }
        }
      )
    }
  }

}
