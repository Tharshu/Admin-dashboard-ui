import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cache = new Map<string, any>();

  get<T>(key: string): Observable<T | undefined> {
    const cachedData = this.cache.get(key);
    if (cachedData) {
      return of(cachedData);
    }
    return of(undefined);
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, data);
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  clearAll(): void {
    this.cache.clear();
  }
}
