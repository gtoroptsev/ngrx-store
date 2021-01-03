import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromStore from '../../../core/store';
import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services';
import * as fromPizza from '../actions/pizzas.actions';

@Injectable({
  providedIn: 'root'
})
export class PizzasEffects {

  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPizza.PizzasActions.LoadPizzas),
      switchMap(() =>
        this.pizzaService.getPizzas().pipe(
          map((payload: Pizza[]) => fromPizza.loadPizzasSuccess({ payload })),
          catchError(error => of(fromPizza.loadPizzasFail({ error })))
        ))
    ));

  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPizza.PizzasActions.CreatePizza),
      switchMap(({ payload }) =>
        this.pizzaService.createPizza(payload).pipe(
          map((pizza: Pizza) => fromPizza.createPizzaSuccess({ payload: pizza })),
          catchError(error => of(fromPizza.createPizzaFail(error)))
        )
      )
    ));

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPizza.PizzasActions.UpdatePizza),
      switchMap(({ payload }) =>
        this.pizzaService.updatePizza(payload).pipe(
          map((pizza: Pizza) => fromPizza.updatePizzaSuccess({ payload: pizza })),
          catchError(error => of(fromPizza.updatePizzaFail(error)))
        )
      )
    ));

  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPizza.PizzasActions.RemovePizza),
      switchMap(({ payload }) =>
        this.pizzaService.removePizza(payload).pipe(
          map(() => fromPizza.removePizzaSuccess({ payload })),
          catchError(error => of(fromPizza.removePizzaFail(error)))
        )
      )
    ));

  createPizzaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPizza.PizzasActions.CreatePizzaSuccess),
      map(({ payload }) => payload as Pizza),
      switchMap((pizza: Pizza) => of(fromStore.go({ path: ['/products', pizza.id] })))
    )
  );

  handlePizzaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPizza.PizzasActions.UpdatePizzaSuccess,
        fromPizza.PizzasActions.RemovePizzaSuccess
      ),
      switchMap(() => of(fromStore.go({ path: ['/products'] })))
    ));

  constructor(
    private actions$: Actions,
    private pizzaService: PizzasService
  ) {}
}
