import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { ApiListResponse, ApiResponse, Currencies, ProductCollection } from '../model/common.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  getUserToken() {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
  }

  createCurrency(payload: Currencies) {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<ApiResponse<Currencies>>(
        `${ApiEndpoint.Currency.Url}`,
        payload,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  getAllCurrencies(page: number, size: number) {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<ApiListResponse<Currencies>>(
        `${ApiEndpoint.Currency.Url}?page=${page}&size=${size}`,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
