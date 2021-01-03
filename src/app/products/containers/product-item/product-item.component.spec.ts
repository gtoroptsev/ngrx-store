import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromRoot from '../../../core/store';
import { PizzaDisplayComponent, PizzaFormComponent, PizzaToppingsComponent } from '../../components';
import * as fromStore from '../../store';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let store: MockStore;
  const initialState: fromStore.ProductsState = { ...fromStore.initialState };
  const routerState: fromRoot.RouterStateUrl = { ...fromStore.routerState };
  const selectors = [
    { selector: fromStore.getToppingState, value: initialState.toppings },
    { selector: fromStore.getAllToppings, value: [] },
    { selector: fromStore.getToppingEntities, value: initialState.toppings.entities },
    { selector: fromStore.getSelectedToppings, value: initialState.toppings.selectedToppings },
    { selector: fromStore.getPizzaEntities, value: initialState.pizzas.entities },
    { selector: fromRoot.getRouterState, value: routerState },
    { selector: fromStore.getSelectedPizza, value: initialState.pizzas.entities[2] },
    { selector: fromStore.getPizzaVisualized, value: initialState.pizzas.entities[2] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ProductItemComponent,
        PizzaFormComponent,
        PizzaDisplayComponent,
        PizzaToppingsComponent
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors
        })
      ],
    });

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
