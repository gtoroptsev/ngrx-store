import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';
import * as pizzaActions from '../actions/pizzas.actions';
import * as fromFeature from './index';

export interface PizzaState extends EntityState<Pizza> {
  loading: boolean;
  loaded: boolean;
}

const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();

const initialState: PizzaState = adapter.getInitialState({
  loading: false,
  loaded: false
});

export const pizzasReducer = createReducer(
  initialState,
  on(pizzaActions.loadPizzas, (state) => ({ ...state, loading: true })),
  on(pizzaActions.loadPizzasFail, (state) => ({ ...state, ...{ loading: false, loaded: false } })),
  on(pizzaActions.loadPizzasSuccess, (state, { payload }) => adapter.setAll(payload, { ...state, loaded: true, loading: false })),
  on(pizzaActions.createPizzaSuccess, (state, { payload }) => adapter.addOne(payload, state)),
  on(pizzaActions.updatePizzaSuccess, (state, { payload }) => adapter.updateOne({ id: payload.id, changes: payload }, state)),
  on(pizzaActions.removePizzaSuccess, (state, { payload }) => adapter.removeOne(payload.id, state)),
);

export const getPizzasState = (state: fromFeature.ProductsState) => state.pizzas;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;

export const { selectEntities, selectAll } = adapter.getSelectors();
