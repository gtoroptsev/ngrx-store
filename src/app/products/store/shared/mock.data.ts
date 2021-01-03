import { RouterStateUrl } from '../../../core/store';
import { ProductsState } from '../reducers';
import { PizzaState } from '../reducers/pizzas.reducer';
import { ToppingState } from '../reducers/toppings.reducer';

export const error: any = 'Error';

export const pizzaState: PizzaState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: 1, name: 'Test Pizza #1', toppings: [] },
    2: { id: 2, name: 'Test Pizza #2', toppings: [] },
    3: { id: 3, name: 'Test Pizza #3', toppings: [] },
  },
  loading: false,
  loaded: true
};

export const toppingState: ToppingState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: 1, name: 'Test Topping #1' },
    2: { id: 2, name: 'Test Topping #2' },
    3: { id: 3, name: 'Test Topping #3' },
  },
  loading: false,
  loaded: true,
  selectedToppings: [2]
};

export const initialState: ProductsState = {
  pizzas: { ...pizzaState },
  toppings: { ...toppingState }
};

export const routerState: RouterStateUrl = {
  url: '/products',
  queryParams: {},
  params: { pizzaId: '2' }
};
