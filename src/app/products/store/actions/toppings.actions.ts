import { createAction, props } from '@ngrx/store';
import { Topping } from '../../models/topping.model';

export enum ToppingsActions {
  LoadToppings = '[Products] Load Toppings',
  LoadToppingsFail = '[Products] Load Toppings Fail',
  LoadToppingsSuccess = '[Products] Load Toppings Success',
  VisualizeToppings = '[Products] Visualize Toppings',
}

export const loadToppings = createAction(ToppingsActions.LoadToppings);
export const loadToppingsFail = createAction(ToppingsActions.LoadToppingsFail, props<{ error }>());
export const loadToppingsSuccess = createAction(ToppingsActions.LoadToppingsSuccess, props<{ payload: Topping[] }>());
export const visualizeToppings = createAction(ToppingsActions.VisualizeToppings, props<{ payload: number[] }>());
