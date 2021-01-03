import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromStore from '../../store';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore;
  const initialState: fromStore.ProductsState = { ...fromStore.initialState };
  const selectors = [
    { selector: fromStore.getPizzaState, value: initialState.pizzas },
    { selector: fromStore.getAllPizzas, value: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ProductsComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors
        })
      ],
    });

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
