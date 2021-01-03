import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class PizzaExistsGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.ProductsState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => this.hasPizza(+route.params.pizzaId)),
        catchError(() => of(false))
      );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzaEntities).pipe(
      map(entities => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded)
      .pipe(
        tap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(fromStore.loadPizzas());
          }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
      );
  }
}
