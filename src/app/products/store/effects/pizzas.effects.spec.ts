import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PizzasService } from '../../services/pizzas.service';
import * as fromActions from '../actions/pizzas.actions';
import { PizzaState } from '../reducers/pizzas.reducer';
import * as fromShared from '../shared';
import * as fromEffects from './pizzas.effects';

describe('PizzasEffects', () => {
  let actions$: Observable<Action>;
  let service: PizzasService;
  let effects: fromEffects.PizzasEffects;

  const pizzaState: PizzaState = { ...fromShared.pizzaState };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PizzasService,
        fromEffects.PizzasEffects,
        provideMockActions(() => actions$),
      ],
    });

    service = TestBed.inject(PizzasService);
    effects = TestBed.inject(fromEffects.PizzasEffects);

    spyOn(service, 'getPizzas').and.returnValue(of(Object.values(pizzaState.entities)));
    spyOn(service, 'createPizza').and.returnValue(of(pizzaState.entities[1]));
    spyOn(service, 'updatePizza').and.returnValue(of(pizzaState.entities[1]));
    spyOn(service, 'removePizza').and.returnValue(of(pizzaState.entities[1]));
  });

  describe('loadPizzas$', () => {
    it('should return a collection from LoadPizzasSuccess', () => {
      const action = fromActions.loadPizzas();
      const completion = fromActions.loadPizzasSuccess({ payload: Object.values(pizzaState.entities) });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });

  describe('createPizza$', () => {
    it('should return createPizzaSuccess', () => {
      const action = fromActions.createPizza({ payload: pizzaState.entities[1] });
      const completion = fromActions.createPizzaSuccess({ payload: pizzaState.entities[1] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.createPizza$).toBeObservable(expected);
    });
  });

  describe('updatePizza$', () => {
    it('should return updatePizzaSuccess', () => {
      const action = fromActions.updatePizza({ payload: pizzaState.entities[1] });
      const completion = fromActions.updatePizzaSuccess({ payload: pizzaState.entities[1] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updatePizza$).toBeObservable(expected);
    });
  });

  describe('removePizza$', () => {
    it('should return removePizzaSuccess', () => {
      const action = fromActions.removePizza({ payload: pizzaState.entities[1] });
      const completion = fromActions.removePizzaSuccess({ payload: pizzaState.entities[1] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.removePizza$).toBeObservable(expected);
    });
  });

});
