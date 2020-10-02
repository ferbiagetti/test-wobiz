import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User, UserResponse } from '../interface/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrlBase;
  private readonly ENDPOINT_LOGIN = 'login';

  public login(user: User): Observable<UserResponse>{
    const url = `${this.baseUrl}/${this.ENDPOINT_LOGIN}?username=${user.email}&password=${user.password}`;
    return this.http.get<UserResponse>(url);
  }
}
