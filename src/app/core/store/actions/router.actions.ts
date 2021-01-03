import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export enum RouterActions {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward',
}

export const go = createAction(RouterActions.Go, props<{ path: any[]; query?: object; extras?: NavigationExtras; }>());
export const back = createAction(RouterActions.Back);
export const forward = createAction(RouterActions.Forward);
