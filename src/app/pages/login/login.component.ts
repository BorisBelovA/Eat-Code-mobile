import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AuthorizationApiService } from 'src/app/services/api/authorization-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @Output()
  public signIn = new EventEmitter();

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private http: HttpClient,
    private authService: AuthorizationApiService
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
    // this.signIn.emit();
    // this.http.get('http://localhost:9098/bmstuapi/client/login', {
    //   params: {
    //     login: 'anna',
    //     password: '111'
    //   }
    // }).pipe(
    //   tap(res => console.log(res))
    // ).subscribe()

    // this.http.post('http://localhost:9098/bmstuapi/client/register', {
    //   Login: 'anna',
    //   Password: '111',
    //   Name: 'Anna Seleznyova',
    //   Phone: '89009998866',
    //   Email: 'anna@mail.ru',
    //   DOB: '21.03.1996'
    // }).pipe(
    //   tap(res => console.log(res))
    // ).subscribe()

    this.authService.login('anna', '111').subscribe(
      result => {
        if (result.assepted === false) {
          alert('Не смогли авторизоваться');
        } else {
          this.router.navigate(['tabs']);
        }
      }
    )
  }
}
