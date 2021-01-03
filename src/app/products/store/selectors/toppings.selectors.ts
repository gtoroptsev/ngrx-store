import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingState = createSelector(
  fromFeature.getProductsState,
  fromToppings.getToppingsState
);

export const getAllToppings = createSelector(
  getToppingState,
  fromToppings.selectAll
);

export const getToppingEntities = createSelector(
  getToppingState,
  fromToppings.selectEntities
);

export const getToppingsLoaded = createSelector(
  getToppingState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingState,
  fromToppings.getToppingsLoading
);

export const getSelectedToppings = createSelector(
  getToppingState,
  fromToppings.getSelectedToppings
);
