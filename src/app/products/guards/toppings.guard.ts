import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class ToppingsGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.ProductsState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded)
      .pipe(
        tap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(fromStore.loadToppings());
          }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
      );
  }
}
