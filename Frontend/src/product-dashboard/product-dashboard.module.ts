import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductDashboardRoutingModule} from "./product-dashboard-routing.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductDashboardRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class ProductDashboardModule { }
