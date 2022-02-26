import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductDashboardModule} from "../product-dashboard/product-dashboard.module";

const routes: Routes = [
  { path: 'admin/product', loadChildren: () => ProductDashboardModule},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
