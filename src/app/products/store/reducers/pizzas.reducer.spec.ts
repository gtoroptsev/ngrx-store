import * as pizzaActions from '../actions/pizzas.actions';
import * as fromShared from '../shared';
import { initialState, PizzaState, reducer } from './pizzas.reducer';

const pizzaState: PizzaState = { ...fromShared.pizzaState };

describe('PizzasReducer', () => {

  let state: PizzaState;

  beforeEach(() => {
    state = initialState;
  });

  describe('Validate Pizza Actions', () => {

    it('loadPizzas() should set loading true', () => {
      const action = pizzaActions.loadPizzas();
      const result = reducer(state, action);

      expect(result.loading).toBeTrue();
    });

    it('loadPizzasFail() should set loading & loaded false', () => {
      const action = pizzaActions.loadPizzasFail({ error: fromShared.error });
      const result = reducer(state, action);

      expect(result.loading).toBeFalse();
      expect(result.loaded).toBeFalse();
    });

    it('loadPizzasSuccess() should set pizzas entities', () => {
      const action = pizzaActions.loadPizzasSuccess({ payload: Object.values(pizzaState.entities) });
      const result = reducer(state, action);

      expect(result.loading).toBeFalse();
      expect(result.loaded).toBeTrue();
      expect(result.ids.length).toEqual(Object.keys(pizzaState.entities).length);
      expect(Object.keys(result.entities).length).toEqual(Object.keys(pizzaState.entities).length);
      expect(result.entities[pizzaState.entities[2].id]).toEqual(pizzaState.entities[2]);
    });

    it('createPizzaSuccess() should add pizza to entities', () => {
      const action = pizzaActions.createPizzaSuccess({ payload: pizzaState.entities[2] });
      const result = reducer(state, action);

      expect(Object.keys(result.entities).length).toEqual(1);
      expect(result.entities[pizzaState.entities[2].id]).toEqual(pizzaState.entities[2]);
    });

    it('updatePizzaSuccess() should update pizzas entities', () => {
      const createAction = pizzaActions.createPizzaSuccess({ payload: pizzaState.entities[2] });
      let result = reducer(state, createAction);

      const updatePizza = {
        ...pizzaState.entities[2],
        ...{
          name: 'Test Pizza #2 Updated',
          toppings: [{ id: 1, name: 'Test Topping' }]
        }
      };
      const action = pizzaActions.updatePizzaSuccess({ payload: updatePizza });
      result = reducer(result, action);

      expect(Object.keys(result.entities).length).toEqual(1);
      expect(result.entities[pizzaState.entities[2].id]).toEqual(updatePizza);
      expect(Object.keys(result.entities[pizzaState.entities[2].id].toppings).length).toEqual(1);
      expect(result.entities[pizzaState.entities[2].id].toppings).toEqual(updatePizza.toppings);
    });

    it('removePizzaSuccess() should remove pizza from entities', () => {
      const createAction = pizzaActions.createPizzaSuccess({ payload: pizzaState.entities[2] });
      let result = reducer(state, createAction);

      expect(Object.keys(result.entities).length).toEqual(1);
      expect(result.entities[pizzaState.entities[2].id]).toEqual(pizzaState.entities[2]);

      const action = pizzaActions.removePizzaSuccess({ payload: pizzaState.entities[2] });
      result = reducer(result, action);

      expect(Object.keys(result.entities).length).toEqual(0);
      expect(result.entities).toEqual({});
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
