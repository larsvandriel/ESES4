import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs";
import {ProductDataSource} from "../product_data_source";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // dataSource: ProductDataSource;
  displayedColumns = ["Name", "EAN", "Price", "Buttons"]

  @ViewChild(MatPaginator) paginator: MatPaginator| undefined

  amountOfProducts = 3

  private products: Array<Product> = []
  private contentLoaded = false;
  private routerLinkDisabled = false;

  constructor(private productService: ProductService, private router: Router) {
    // this.dataSource = new ProductDataSource(this.productService)
  }

  ngOnInit(): void {
    /*this.dataSource = new ProductDataSource(this.productService)
    this.dataSource.loadProducts()
    console.log(this.dataSource.productSubject)*/

    this.productService.getProducts().subscribe(resp => {
      this.amountOfProducts = JSON.parse(resp.headers.get('x-pagination')).TotalCount;
      // @ts-ignore
      resp.body.forEach(product => {
        this.products.push(
          new Product(product.Id, product.Name, product.Description, product.EanNumber, product.Price, product.ImageLocation, product.TimeCreated, product.Deleted, product.TimeDeleted));
      });
      this.contentLoaded = true;
    });
  }

  // ngAfterViewInit() {
  //   // @ts-ignore
  //   this.paginator.page
  //     .pipe(
  //       tap(() => this.loadProductsPage())
  //     )
  //     .subscribe()
  //   console.log(this.dataSource)
  // }

  loadProductsPage(): void {
    // @ts-ignore
    this.productService.getProducts('', 'Name', this.paginator.pageIndex, this.paginator.pageSize);
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
