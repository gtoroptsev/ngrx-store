import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../core/store';
import { getProductsState } from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';

export const getPizzaState = createSelector(
  getProductsState,
  fromPizzas.getPizzasState
);

export const getAllPizzas = createSelector(
  getPizzaState,
  fromPizzas.selectAll
);

export const getPizzaEntities = createSelector(
  getPizzaState,
  fromPizzas.selectEntities
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  fromRoot.getRouterState,
  (pizzas, router) =>
    router.state && pizzas[router.state.params.pizzaId]
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppings, selectedToppings) =>
    ({ ...pizza, toppings: selectedToppings.map(id => toppings[id]) })
);
