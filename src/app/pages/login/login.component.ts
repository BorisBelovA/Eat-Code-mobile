import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ClientApiService } from 'src/app/services/api/client-api.service';
import { AppState } from 'src/app/store/reducer';
import * as SystemActions from '../../store/system/system.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @Output()
  public signIn = new EventEmitter();

  public login: string = '';

  public password: string = '';

  public loading = false;

  constructor(
    private animationCtrl: AnimationController,
    private clientApi: ClientApiService,
    private router: Router,
    private store$: Store<AppState>,
    private toastController: ToastController
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
    this.loading = true;
    this.clientApi.login(this.login, this.password).subscribe({
      next: (client) => {
        if (client) {
          this.loading = false;
          this.signIn.emit();
          this.store$.dispatch(SystemActions.setClient({ client }));
          this.router.navigate(['tabs']);
        } else {
          this.loading = false;
          this.showToast('Не удалось авторизоваться. Проверьте логин и пароль!');
        }
      }
    });
  }

  private showToast = (message: string) => this.toastController.create({ message, duration: 2000 }).then(toast => toast.present());
}
