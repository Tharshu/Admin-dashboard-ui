import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  ApiListResponse,
  ApiResponse,
  PageResponse,
} from "../model/common.model";
import { ApiEndpoint, LocalStorage } from "../constants/constants";
import {
  Observable,
  catchError,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { ProductCollection } from "../model/product-collection.model";
import { ProductType } from "../model/product-type.model";
import { Product } from "../model/product.model";
import { CachingService } from "./caching.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
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


  createCollection(payload: ProductCollection): Observable<ApiResponse<ProductCollection>> {
    const headers = this.getHeaders();
    return this.http
      .post<ApiResponse<ProductCollection>>(
        `${ApiEndpoint.Product.Collection}`,
        payload,
        { headers: headers }
      )
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("collections")),
        tap(() => this.refreshCollectionCache())
      );
  }

  private refreshCollectionCache() {
    this.getAllCollection(0, 1000).subscribe(); // Adjust the parameters as needed
  }

  getAllCollection(
    page: number,
    size: number,
    sort: string = "title,asc"
  ): Observable<ApiListResponse<ProductCollection>> {
    const cacheKey = `collections-${page}-${size}-${sort}`;
    return this.http
      .get<ApiListResponse<ProductCollection>>(
        `${ApiEndpoint.Product.Collection}?page=${page}&size=${size}&sort=${sort}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        switchMap((apiResponse) => {
          return this.cacheService.get<ApiListResponse<ProductCollection>>(cacheKey).pipe(
            switchMap((cachedData) => {
              if (cachedData) {
                const newCollections = apiResponse.data.filter(
                  (apiCollection) =>
                    !cachedData.data.some(
                      (cachedCollection) => cachedCollection.id === apiCollection.id
                    )
                );
                if (newCollections.length > 0) {
                  cachedData.data = [...cachedData.data, ...newCollections];
                  this.cacheService.set(cacheKey, cachedData);
                }
                return of(cachedData);
              } else {
                this.cacheService.set(cacheKey, apiResponse);
                return of(apiResponse);
              }
            })
          );
        }),
        catchError(this.handleError)
      );
  }


  // getAllCollection(page: number, size: number, sort: string = 'title,asc') {
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http
  //     .get<ApiListResponse<ProductCollection>>(
  //       `${ApiEndpoint.Product.Collection}?page=${page}&size=${size}&sort=${sort}`,
  //       { headers: headers }
  //     )
  //     .pipe(catchError(this.handleError));
  // }


  // deleteCollection(id: string){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.delete<ApiResponse<string>>(
  //     `${ApiEndpoint.Product.Collection}/${id}`
  //   )
  // }

  deleteCollection(id: string): Observable<ApiResponse<string>> {
    const headers = this.getHeaders();
    return this.http
      .delete<ApiResponse<string>>(`${ApiEndpoint.Product.Collection}/${id}`, {
        headers: headers,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("collections")) // Clear cache on deletion
      );
  }

  // getAllType() {
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<ApiListResponse<ProductType>>(
  //     `${ApiEndpoint.Product.Type}`, {headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  getAllType(): Observable<ApiListResponse<ProductType>> {
    const cacheKey = `types`;
    return this.cacheService.get<ApiListResponse<ProductType>>(cacheKey).pipe(
      switchMap((cachedData) => {
        if (cachedData) {
          return of(cachedData);
        } else {
          const headers = this.getHeaders();
          return this.http
            .get<ApiListResponse<ProductType>>(`${ApiEndpoint.Product.Type}`, {
              headers: headers,
            })
            .pipe(
              shareReplay(1),
              tap((data) => this.cacheService.set(cacheKey, data)),
              catchError(this.handleError)
            );
        }
      })
    );
  }

  // createProduct(payload: Product){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.post<ApiResponse<Product>>(
  //     `${ApiEndpoint.Product.Prod}/save`,payload ,{headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  createProduct(payload: Product): Observable<ApiResponse<Product>> {
    const headers = this.getHeaders();
    return this.http
      .post<ApiResponse<Product>>(`${ApiEndpoint.Product.Prod}/save`, payload, {
        headers: headers,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("products")), // Clear cache on creation
        tap(() => this.refreshProductCache())
      );
  }

  private refreshProductCache() {
    this.getAllcashingProductFilter(0, 1000).subscribe(); // Adjust the parameters as needed
  }

  // getAllProductFilter(page: number, size: number, sort: string = 'id,asc'){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<ApiResponse<PageResponse<Product>>>(
  //     `${ApiEndpoint.Product.Prod}/filter?page=${page}&size=${size}&sort=${sort}`, {headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  getAllProductFilter(
    page: number,
    size: number,
    sort: string = "id,asc"
  ): Observable<ApiResponse<PageResponse<Product>>> {
    const cacheKey = `products-${page}-${size}-${sort}`;
    return this.cacheService
      .get<ApiResponse<PageResponse<Product>>>(cacheKey)
      .pipe(
        switchMap((cachedData) => {
          if (cachedData) {
            return of(cachedData);
          } else {
            const headers = this.getHeaders();
            return this.http
              .get<ApiResponse<PageResponse<Product>>>(
                `${ApiEndpoint.Product.Prod}/filter?page=${page}&size=${size}&sort=${sort}`,
                { headers: headers }
              )
              .pipe(
                shareReplay(1),
                tap((data) => this.cacheService.set(cacheKey, data)),
                catchError(this.handleError)
              );
          }
        })
      );
  }

  getAllcashingProductFilter(
    page: number,
    size: number,
    sort: string = "id,asc"
  ): Observable<ApiResponse<PageResponse<Product>>> {
    const cacheKey = `products-${page}-${size}-${sort}`;
    
    return this.http
      .get<ApiResponse<PageResponse<Product>>>(
        `${ApiEndpoint.Product.Prod}/filter?page=${page}&size=${size}&sort=${sort}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        tap((apiResponse) => {
          // Clear the cache and store the fresh response
          this.cacheService.set(cacheKey, apiResponse);
        }),
        catchError(this.handleError)
      );
  }

  // editProduct(payload: Product, id:String){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.put<ApiResponse<Product>>(
  //     `${ApiEndpoint.Product.Prod}/${id}`,payload, {headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  editProduct(payload: Product, id: String): Observable<ApiResponse<Product>> {
    const headers = this.getHeaders();
    return this.http
      .put<ApiResponse<Product>>(`${ApiEndpoint.Product.Prod}/${id}`, payload, {
        headers: headers,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("products")), // Clear cache on update
        tap(() => this.refreshProductCache())
      );
  }

  // deleteProduct(id: String){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http.delete<ApiResponse<String>>(
  //     `${ApiEndpoint.Product.Prod}/${id}`, {headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  deleteProduct(id: String): Observable<ApiResponse<String>> {
    const headers = this.getHeaders();
    return this.http
      .delete<ApiResponse<String>>(`${ApiEndpoint.Product.Prod}/${id}`, {
        headers: headers,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("products")), // Clear cache on deletion
        tap(() => this.refreshProductCache())
      );
  }

  // changeStatus(id: String, status: String){
  //   const token = this.getUserToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.patch<ApiResponse<String>>(
  //     `${ApiEndpoint.Product.Prod}/${id}/${status}`, {headers: headers}
  //   ).pipe(catchError(this.handleError));
  // }

  changeStatus(id: String, status: String): Observable<ApiResponse<string>> {
    const headers = this.getHeaders();
    return this.http
      .patch<ApiResponse<string>>(
        `${ApiEndpoint.Product.Prod}/${id}/${status}`,
        { headers: headers }
      )
      .pipe(
        catchError(this.handleError),
        tap(() => this.cacheService.clear("products")), // Clear cache on status change
        tap(() => this.refreshProductCache())
      );
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
