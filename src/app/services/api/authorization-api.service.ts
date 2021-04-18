import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationApiService {

  constructor(
    private http: HttpClient
  ) { }

  public login(login: string, password: string): Observable<{assepted: boolean, client?: number}> {
    return this.http.get<{assepted: boolean, client?: number}>('http://localhost:9098/bmstuapi/client/login',
    {
      params: {
        login, 
        password
      }
    })
  }
}
