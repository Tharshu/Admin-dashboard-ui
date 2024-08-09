import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { CachingService } from './caching.service';
import { OrderRes } from '../model/orderRes.model';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiListResponse, ApiResponse, PageResponse } from '../model/common.model';
import { ProductCollection } from '../model/product-collection.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private cacheService = inject(CachingService);

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

  getAllOrders(
    page: number,
    size: number,
  ): Observable<ApiResponse<PageResponse<OrderRes>>> {
    // const cacheKey = `orders-${page}-${size}`;
    return this.http
      .get<ApiResponse<PageResponse<OrderRes>>>(
        `${ApiEndpoint.Orders.Url}?page=${page}&size=${size}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError(this.handleError)
      );
  }





  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
  
}
