import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { RouterActions } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class RouterEffects {

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.Go),
      tap(({ path, query, extras }) => {
        this.router.navigate(path, { queryParams: query, ...extras as {} });
      })
    ), { dispatch: false });

  back$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.Back),
      tap(() => this.location.back())
    ), { dispatch: false });

  forward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.Forward),
      tap(() => this.location.forward())
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
