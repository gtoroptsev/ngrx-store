import { RouterStateUrl } from '../../../core/store';
import { PizzaState } from '../reducers/pizzas.reducer';
import { ToppingState } from '../reducers/toppings.reducer';
import * as fromShared from '../shared';
import * as fromPizzas from './pizzas.selectors';

const pizzaState: PizzaState = { ...fromShared.pizzaState };
const toppingState: ToppingState = { ...fromShared.toppingState };

describe('PizzasSelectors', () => {

  let state: PizzaState;

  beforeEach(() => {
    state = pizzaState;
  });

  it('should getAllPizzas', () => {
    const result = fromPizzas.getAllPizzas.projector(pizzaState);
    expect(result.length).toEqual(Object.keys(pizzaState.entities).length);
    expect(result).toEqual(Object.values(pizzaState.entities));
  });

  it('should getPizzaEntities', () => {
    const result = fromPizzas.getPizzaEntities.projector(pizzaState);
    expect(result).toEqual(pizzaState.entities);
  });

  it('should getPizzasLoaded', () => {
    const result = fromPizzas.getPizzasLoaded.projector(pizzaState);
    expect(result).toBeTrue();
  });

  it('should getPizzasLoading', () => {
    const result = fromPizzas.getPizzasLoading.projector(pizzaState);
    expect(result).toBeFalse();
  });

  it('should getSelectedPizza', () => {
    const routerState: RouterStateUrl = {
      url: '/products',
      queryParams: {},
      params: { pizzaId: '2' }
    };
    const result = fromPizzas.getSelectedPizza.projector(
      pizzaState.entities,
      { state: routerState }
    );
    expect(result).toEqual(pizzaState.entities[2]);
  });

  it('should getPizzaVisualized', () => {
    const selectedPizza = { ...pizzaState.entities[2] };
    const result = fromPizzas.getPizzaVisualized.projector(
      selectedPizza,
      toppingState.entities,
      [2]
    );
    const expectedPizza = { ...selectedPizza, toppings: [toppingState.entities[2]] };
    expect(result).toEqual(expectedPizza);
  });

});
