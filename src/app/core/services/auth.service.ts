import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  ApiListResponse,
  ApiResponse
} from '../model/common.model';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Console } from 'console';
import { LoginPayload } from '../model/login-payload.model';
import { LoginResponse } from '../model/login-response.model';
import { RegisterPayload } from '../model/register-payload.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // router = inject(Router);

  isLoggedIn = signal<boolean>(false);

  constructor(private _http: HttpClient, private router: Router) {
    if (this.getUserToken()) {
      this.isLoggedIn.update(() => true);
    }
  }

  register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.Register}`,
      payload
    );
  }

  login(payload: LoginPayload): Observable<ApiResponse<LoginResponse>> {
    return this._http.post<ApiResponse<LoginResponse>>(`${ApiEndpoint.Auth.Login}`, payload)
      .pipe(
        map(response => this.handleLoginResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  private handleLoginResponse(response: ApiResponse<LoginResponse>): ApiResponse<LoginResponse> {
    if (response.status) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(LocalStorage.token, accessToken);
      localStorage.setItem(LocalStorage.refreshtoken, refreshToken);
      this.isLoggedIn.update(() => true);
    }
    return response;
  }

  private handleError(error: any): Observable<never> {
    console.error('Login error:', error);
    return throwError(() => new Error('Failed to login, please try again.'));
  }

  getUserToken(){
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
    // return localStorage.getItem(LocalStorage.token);
  }

  getrefreshtoken(payload: String){
    return this._http.post<ApiResponse<LoginResponse>>(`${ApiEndpoint.Auth.Refreshtoken}`, payload);
  }

  getallusers() {
    // const token = localStorage.getItem(LocalStorage.token);
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get<ApiListResponse<User>>(`${ApiEndpoint.Auth.Getallusers}`, { headers: headers });
    // return this._http.get<ApiListResponse<User>>(`${ApiEndpoint.Auth.Getallusers}`); 
  }
  getUserByEmail(email: string){
        // const token = localStorage.getItem(LocalStorage.token);
        const token = this.getUserToken();

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.user}/${email}`, {headers: headers});
  }

  updateUserBlockStatus(id: number, block: boolean){
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.patch<ApiResponse<string>>(`${ApiEndpoint.Auth.Blockuser}/${id}/${block}`, { headers: headers });
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    localStorage.removeItem(LocalStorage.refreshtoken);
    this.isLoggedIn.update(() => false);
    this.router.navigate(['login']);
  }
}
