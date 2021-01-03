import * as toppingsActions from '../actions/toppings.actions';
import * as fromShared from '../shared';
import { initialState, reducer, ToppingState } from './toppings.reducer';

const toppingState: ToppingState = { ...fromShared.toppingState };

describe('ToppingsReducer', () => {

  let state: ToppingState;

  beforeEach(() => {
    state = initialState;
  });

  describe('Validate Toppings Actions', () => {

    it('loadToppings() should set loading true', () => {
      const action = toppingsActions.loadToppings();
      const result = reducer(state, action);

      expect(result.loading).toBeTrue();
    });

    it('loadToppingsFail() should set loading & loaded false', () => {
      const action = toppingsActions.loadToppingsFail({ error: fromShared.error });
      const result = reducer(state, action);

      expect(result.loading).toBeFalse();
      expect(result.loaded).toBeFalse();
    });

    it('loadToppingsSuccess() should set toppings entities', () => {
      const action = toppingsActions.loadToppingsSuccess({ payload: Object.values(toppingState.entities) });
      const result = reducer(state, action);

      expect(result.loading).toBeFalse();
      expect(result.loaded).toBeTrue();
      expect(result.ids.length).toEqual(Object.keys(toppingState.entities).length);
      expect(Object.keys(result.entities).length).toEqual(Object.keys(toppingState.entities).length);
      expect(result.entities[toppingState.entities[2].id]).toEqual(toppingState.entities[2]);
    });

    it('visualizeToppings() should set selected toppings ids', () => {
      const payload = Object.keys(toppingState.entities).map(id => (+id));
      const action = toppingsActions.visualizeToppings({ payload });
      const result = reducer(state, action);

      expect(result.selectedToppings).toEqual(payload);
    });

  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});
