import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductDashboardRoutingModule} from "./product-dashboard-routing.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    ProductDashboardRoutingModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class ProductDashboardModule { }
