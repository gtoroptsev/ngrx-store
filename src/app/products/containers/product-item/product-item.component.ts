import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  toppings$: Observable<Topping[]> = this.store.select(fromStore.getAllToppings);
  visualise$: Observable<Pizza> = this.store.select(fromStore.getPizzaVisualized);
  pizza$: Observable<Pizza> = this.store.select(fromStore.getSelectedPizza).pipe(
    tap((pizza: Pizza = null) => {
      const pizzaExists = pizza && pizza.toppings && pizza.toppings.length;
      const toppings = pizzaExists ? pizza.toppings.map(x => x.id) : [];
      this.store.dispatch(fromStore.visualizeToppings({ payload: toppings }));
    })
  );

  constructor(private store: Store<fromStore.ProductsState>) {}

  onSelect(event: number[]) {
    this.store.dispatch(fromStore.visualizeToppings({ payload: event }));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(fromStore.createPizza({ payload: event }));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(fromStore.updatePizza({ payload: event }));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(fromStore.removePizza({ payload: event }));
    }
  }
}
