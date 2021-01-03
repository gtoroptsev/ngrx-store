import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

  pizzas$: Observable<Pizza[]> = this.store.select(fromStore.getAllPizzas);

  constructor(private store: Store<fromStore.ProductsState>) {}
}
