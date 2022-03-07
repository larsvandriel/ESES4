import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";

const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'create', component: ProductCreateComponent},
  { path: ':id', component: ProductDetailComponent, pathMatch: 'full'},
  { path: ':id/edit', component: ProductEditComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductDashboardRoutingModule { }
