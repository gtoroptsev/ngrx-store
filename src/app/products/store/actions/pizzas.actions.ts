import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

export enum PizzasActions {
  // load
  LoadPizzas = '[Products] Load Pizzas',
  LoadPizzasFail = '[Products] Load Pizzas Fail',
  LoadPizzasSuccess = '[Products] Load Pizzas Success',

  // create
  CreatePizza = '[Products] Create Pizza',
  CreatePizzaFail = '[Products] Create Pizza Fail',
  CreatePizzaSuccess = '[Products] Create Pizza Success',

  // update
  UpdatePizza = '[Products] Update Pizza',
  UpdatePizzaFail = '[Products] Update Pizza Fail',
  UpdatePizzaSuccess = '[Products] Update Pizza Success',

  // remove
  RemovePizza = '[Products] Remove Pizza',
  RemovePizzaFail = '[Products] Remove Pizza Fail',
  RemovePizzaSuccess = '[Products] Remove Pizza Success',
}

// load
export const loadPizzas = createAction(PizzasActions.LoadPizzas);
export const loadPizzasFail = createAction(PizzasActions.LoadPizzasFail, props<{ error }>());
export const loadPizzasSuccess = createAction(PizzasActions.LoadPizzasSuccess, props<{ payload: Pizza[] }>());

// create
export const createPizza = createAction(PizzasActions.CreatePizza, props<{ payload: Pizza }>());
export const createPizzaFail = createAction(PizzasActions.CreatePizzaFail, props<{ error }>());
export const createPizzaSuccess = createAction(PizzasActions.CreatePizzaSuccess, props<{ payload: Pizza }>());

// update
export const updatePizza = createAction(PizzasActions.UpdatePizza, props<{ payload: Pizza }>());
export const updatePizzaFail = createAction(PizzasActions.UpdatePizzaFail, props<{ error }>());
export const updatePizzaSuccess = createAction(PizzasActions.UpdatePizzaSuccess, props<{ payload: Pizza }>());

// remove
export const removePizza = createAction(PizzasActions.RemovePizza, props<{ payload: Pizza }>());
export const removePizzaFail = createAction(PizzasActions.RemovePizzaFail, props<{ error }>());
export const removePizzaSuccess = createAction(PizzasActions.RemovePizzaSuccess, props<{ payload: Pizza }>());
