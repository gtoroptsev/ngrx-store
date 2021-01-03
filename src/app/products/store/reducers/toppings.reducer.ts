import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Topping } from '../../models/topping.model';
import * as toppingActions from '../actions/toppings.actions';
import * as fromFeature from './index';

export interface ToppingState extends EntityState<Topping> {
  loading: boolean;
  loaded: boolean;
  selectedToppings: number[];
}

const adapter: EntityAdapter<Topping> = createEntityAdapter<Topping>();

const initialState: ToppingState = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedToppings: []
});

export const toppingsReducer = createReducer(
  initialState,
  on(toppingActions.loadToppings, (state) => ({ ...state, loading: true })),
  on(toppingActions.loadToppingsFail, (state) => ({ ...state, ...{ loading: false, loaded: false } })),
  on(toppingActions.loadToppingsSuccess, (state, { payload }) => adapter.setAll(payload, { ...state, loaded: true, loading: false })),
  on(toppingActions.visualizeToppings, (state, { payload }) => ({ ...state, selectedToppings: payload })),
);

export const getToppingsState = (state: fromFeature.ProductsState) => state.toppings;
export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getSelectedToppings = (state: ToppingState) => state.selectedToppings;

export const { selectEntities, selectAll } = adapter.getSelectors();
