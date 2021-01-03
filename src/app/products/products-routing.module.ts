import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';
import * as fromGuards from './guards';

export const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent,
    canActivate: [fromGuards.PizzasGuard]
  },
  {
    path: 'new',
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard]
  },
  {
    path: ':pizzaId',
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard, fromGuards.PizzaExistsGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
