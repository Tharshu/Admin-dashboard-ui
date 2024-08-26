import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
// import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch(),

    // withInterceptors([authInterceptor])
  ),
  ],
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule),
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//     provideHttpClient(withFetch()),
//   ],
// };


// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule),
//     { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
//   ],
// };