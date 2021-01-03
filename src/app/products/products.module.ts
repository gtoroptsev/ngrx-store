import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { ProductsRoutingModule } from './products-routing.module';
import { effects, FEATURE_NAME, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
})
export class ProductsModule {}
