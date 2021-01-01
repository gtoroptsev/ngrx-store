import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsRoutingModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
})
export class ProductsModule {}
