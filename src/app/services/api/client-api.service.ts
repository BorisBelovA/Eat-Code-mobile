import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import * as dto from 'dto';
import * as models from 'models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private http: HttpClient) { }

  public login(login: string, password: string): Observable<models.Client | null> {
    return this.http.post<dto.HttpResponse<dto.Client>>('https://eat-code-web-api.herokuapp.com/api/client/login', {
      login,
      password
    }).pipe(
      map(i => i.status === 'OK' ? this.toModelsClient(i.items) : null)
    )
  }

  public toModelsClient(client: dto.Client): models.Client {
    return {
      id: client.id,
      login: client.login,
      email: client.email
    };
  }
}
