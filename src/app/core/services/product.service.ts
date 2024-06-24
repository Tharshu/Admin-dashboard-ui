import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ApiListResponse,
  ApiResponse,
  ProductCollection,
} from "../model/common.model";
import { ApiEndpoint, LocalStorage } from "../constants/constants";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getUserToken() {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
  }

  createCollection(payload: ProductCollection) {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<ApiResponse<ProductCollection>>(
        `${ApiEndpoint.Collection.Collection}`,
        payload,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  getAllCollection(page: number, size: number, sort: string = 'title,asc') {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<ApiListResponse<ProductCollection>>(
        `${ApiEndpoint.Collection.Collection}?page=${page}&size=${size}&sort=${sort}`,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  deleteCollection(id: string){
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<ApiResponse<string>>(
      `${ApiEndpoint.Collection.Collection}/${id}`
    )
  }

  // createCollection(payload: ProductCollection): Observable<ApiResponse<ProductCollection>> {
  //   return this.http.post<ApiResponse<ProductCollection>>(`${ApiEndpoint.Collection.Collection}`, payload)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
