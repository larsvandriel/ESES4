import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns = ["Name", "EAN", "Price", "Buttons"]

  private products: Array<Product> = []
  private contentLoaded = false;
  private routerLinkDisabled = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      // @ts-ignore
      products.forEach(product => {
        this.products.push(
          new Product(product.Id, product.Name, product.Description, product.EanNumber, product.Price, product.ImageLocation, product.TimeCreated, product.Deleted, product.TimeDeleted));
      });
      this.contentLoaded = true;
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

  getContentLoaded(): boolean {
    return this.contentLoaded;
  }

  deleteProduct(productId?: string): void {
    if(productId == undefined)
    {
      return;
    }
    this.setRouterLinkDisabled(true);
    this.productService.deleteProduct(productId).subscribe(data => {
      window.location.reload();
    });
  }

  getRouterLinkDisabled(): boolean
  {
    return this.routerLinkDisabled;
  }

  setRouterLinkDisabled(disabled: boolean): void {
    this.routerLinkDisabled = disabled;
  }

  navigateToProductDetails(productId?: string): void {
    if(productId == undefined)
    {
      return;
    }
    if (this.getRouterLinkDisabled()) {
      return;
    }
    this.router.navigate(['admin', 'product', productId])
  }
}
