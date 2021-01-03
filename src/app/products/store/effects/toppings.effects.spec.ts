import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ToppingsService } from '../../services/toppings.service';
import * as fromActions from '../actions/toppings.actions';
import { ToppingState } from '../reducers/toppings.reducer';
import * as fromShared from '../shared';
import * as fromEffects from './toppings.effects';

describe('ToppingsEffects', () => {
  let actions$: Observable<Action>;
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppingState: ToppingState = { ...fromShared.toppingState };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        fromEffects.ToppingsEffects,
        provideMockActions(() => actions$),
      ],
    });

    service = TestBed.inject(ToppingsService);
    effects = TestBed.inject(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(Object.values(toppingState.entities)));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = fromActions.loadToppings();
      const completion = fromActions.loadToppingsSuccess({ payload: Object.values(toppingState.entities) });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
