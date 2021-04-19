import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthorizationApiService } from 'src/app/services/api/authorization-api.service';
import { AppState } from 'src/app/store/reducer';
import * as SystemActions from '../../store/system/system.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  public login: string | null = null;
  public password: string | null = null;

  @Output()
  public signIn = new EventEmitter();

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private authService: AuthorizationApiService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {}

  public ngAfterViewInit(): void {
    const animation = this.animationCtrl.create()
    .addElement(document.querySelector('[data-id="login-page"]'))
    .duration(1000)
    .fromTo('opacity', 0, 1);

    animation.play();
  }

  public trySignIn() {
    if (!this.login || !this.password) {
      throw new Error('Заполните логин или пароль')
    } else {
      this.authService.login(this.login, this.password).subscribe(
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
