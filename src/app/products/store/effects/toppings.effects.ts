import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services';
import { loadToppingsFail, loadToppingsSuccess, ToppingsActions } from '../actions/toppings.actions';

@Injectable({
  providedIn: 'root'
})
export class ToppingsEffects {

  loadToppings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToppingsActions.LoadToppings),
      switchMap(() =>
        this.toppingsService.getToppings().pipe(
          map((payload: Topping[]) => loadToppingsSuccess({ payload })),
          catchError(error => of(loadToppingsFail({ error })))
        ))
    ));

  constructor(
    private actions$: Actions,
    private toppingsService: ToppingsService
  ) {}
}
