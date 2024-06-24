// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment.dev';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule),
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//   ],
// }).catch(err => console.error(err));

  if (environment.dev) {
    enableProdMode();
  }
  
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));