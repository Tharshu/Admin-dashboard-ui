import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { LocalStorage } from '../constants/constants';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService =inject(AuthService);
  const router = inject(Router);

  const token = authService.getUserToken();
  
  if (token) {
    console.log("auth interceptor");
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    retry(2),
    catchError((e: HttpErrorResponse)=>{
      if(e.status ===  401){
        authService.logout();
        localStorage.removeItem(LocalStorage.token);
        router.navigate(['']);
      }

      const error = e.error.message || e.statusText;
      return throwError(() => error);
    })
  );
};


// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { LocalStorage } from '../constants/constants';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem(LocalStorage.token);
//     if (token) {
//       req = this.addToken(req, token);
//     }

//     return next.handle(req).pipe(
//       catchError(error => {
//         if (error instanceof HttpErrorResponse && error.status === 401) {
//           return this.handle401Error(req, next);
//         } else {
//           return throwError(error);
//         }
//       })
//     );
//   }

//   private addToken(req: HttpRequest<any>, token: string) {
//     return req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//       const refreshToken = localStorage.getItem(LocalStorage.refreshtoken);

//       if (refreshToken) {
//         return this.authService.getrefreshtoken(refreshToken).pipe(
//           switchMap((response: any) => {
//             this.isRefreshing = false;
//             localStorage.setItem(LocalStorage.token, response.accessToken);
//             this.refreshTokenSubject.next(response.accessToken);
//             return next.handle(this.addToken(req, response.accessToken));
//           }),
//           catchError((error) => {
//             this.isRefreshing = false;
//             this.authService.logout();
//             return throwError(error);
//           })
//         );
//       } else {
//         this.authService.logout();
//         return throwError('Refresh token not available.');
//       }
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token != null),
//         take(1),
//         switchMap(token => {
//           return next.handle(this.addToken(req, token));
//         })
//       );
//     }
//   }
// }
