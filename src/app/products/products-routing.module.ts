import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';

export const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent,
  },
  {
    path: 'new',
    component: fromContainers.ProductItemComponent,
  },
  {
    path: ':pizzaId',
    component: fromContainers.ProductItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
