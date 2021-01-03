import { ToppingState } from '../reducers/toppings.reducer';
import * as fromShared from '../shared';
import * as fromToppings from './toppings.selectors';

const toppingState: ToppingState = { ...fromShared.toppingState };

describe('ToppingsSelectors', () => {

  let state: ToppingState;

  beforeEach(() => {
    state = toppingState;
  });

  it('should getAllToppings', () => {
    const result = fromToppings.getAllToppings.projector(toppingState);
    expect(result.length).toEqual(Object.keys(toppingState.entities).length);
    expect(result).toEqual(Object.values(toppingState.entities));
  });

  it('should getToppingEntities', () => {
    const result = fromToppings.getToppingEntities.projector(toppingState);
    expect(result).toEqual(toppingState.entities);
  });

  it('should getToppingsLoaded', () => {
    const result = fromToppings.getToppingsLoaded.projector(toppingState);
    expect(result).toBeTrue();
  });

  it('should getToppingsLoading', () => {
    const result = fromToppings.getToppingsLoading.projector(toppingState);
    expect(result).toBeFalse();
  });

  it('should getSelectedToppings', () => {
    const result = fromToppings.getSelectedToppings.projector(toppingState);
    expect(result).toEqual([2]);
  });

});
