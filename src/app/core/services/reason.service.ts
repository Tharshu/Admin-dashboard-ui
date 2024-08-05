import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { Reason } from '../model/reason.model';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiListResponse, ApiResponse } from '../model/common.model';
import { Inventory } from '../model/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private http: HttpClient) {}

  getUserToken() {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getUserToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }



  createReason(payload: Reason) {
    return this.http
      .post<ApiResponse<Reason>>(
        `${ApiEndpoint.Reason.Url}`,
        payload,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  getAllReasons() {
    return this.http
      .get<ApiListResponse<Reason>>(
        `${ApiEndpoint.Reason.Url}`,
        { headers: this.getHeaders() }
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
