import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export const FEATURE_NAME = 'products';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.pizzasReducer,
  toppings: fromToppings.toppingsReducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(FEATURE_NAME);
