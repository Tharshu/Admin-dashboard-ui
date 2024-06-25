import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ApiListResponse,
  ApiResponse,
  PageResponse,
  Product,
  ProductCollection,
  ProductType,
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
        `${ApiEndpoint.Product.Collection}`,
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
        `${ApiEndpoint.Product.Collection}?page=${page}&size=${size}&sort=${sort}`,
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
      `${ApiEndpoint.Product.Collection}/${id}`
    )
  }

  getAllType() {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ApiListResponse<ProductType>>(
      `${ApiEndpoint.Product.Type}`, {headers: headers}
    ).pipe(catchError(this.handleError));
  }

  createProduct(payload: Product){
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ApiResponse<Product>>(
      `${ApiEndpoint.Product.Prod}/save`,payload ,{headers: headers}
    ).pipe(catchError(this.handleError));
  }

  getAllProductFilter(){
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ApiResponse<PageResponse<Product>>>(
      `${ApiEndpoint.Product.Prod}/filter`, {headers: headers}
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
