import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  ApiResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from '../model/common.model';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // router = inject(Router);

  isLoggedIn = signal<boolean>(false);

  constructor(private _http: HttpClient, private router: Router) {}

  register(payload: RegisterPayload) {
    payload.role.id=1;
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.Register}`,
      payload
    );
  }

  login(payload: LoginPayload) {
    return this._http.post<ApiResponse<LoginResponse>>(`${ApiEndpoint.Auth.Login}`, payload)
      .pipe(
        map((response) => {
          if(response.status && response.data.accessToken) {
            console.log("login res=> ",response);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem(LocalStorage.token, response.data.accessToken);
            localStorage.setItem(LocalStorage.refreshtoken, response.data.refreshToken);
            this.isLoggedIn.update(() => true);
          }
          return response;
        })
      );
  }

  getallusers() {
    return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.Getallusers}`);
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    localStorage.removeItem(LocalStorage.refreshtoken);
    this.isLoggedIn.update(() => false);
    this.router.navigate(['login']);
  }
}
