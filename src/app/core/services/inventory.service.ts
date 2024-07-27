import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { catchError, Observable, throwError } from 'rxjs';
import { Inventory } from '../model/inventory.model';
import { ApiListResponse, ApiResponse } from '../model/common.model';
import { Currencies } from '../model/currencies.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

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


  createInventory(payload: Inventory) {
    return this.http
      .post<ApiResponse<Inventory>>(
        `${ApiEndpoint.Inventory.Url}`,
        payload,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  getInventoryByProductId(productId: string) {

    return this.http
      .get<ApiResponse<Inventory>>(
        `${ApiEndpoint.Inventory.Url}/${productId}`,
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
