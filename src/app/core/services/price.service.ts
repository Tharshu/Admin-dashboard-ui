import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorage, ApiEndpoint } from '../constants/constants';
import { Currencies, ApiResponse, ApiListResponse, Price } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) {}

  getUserToken() {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
  }

  createPrice(payload: Price) {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<ApiResponse<Price>>(
        `${ApiEndpoint.Price.Url}`,
        payload,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  getAllPrice(page: number, size: number) {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<ApiListResponse<Price>>(
        `${ApiEndpoint.Price.Url}?page=${page}&size=${size}`,
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
