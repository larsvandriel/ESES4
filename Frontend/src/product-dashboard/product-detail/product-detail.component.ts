import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // @ts-ignore
  private product: Product;
  private contentLoaded = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.productService.getProduct(id).subscribe(data => {
      this.product = new Product(data.Id, data.Name, data.Description, data.EanNumber, data.Price, data.ImageLocation, data.TimeCreated, data.Deleted, data.TimeDeleted);
      this.contentLoaded = true;
    });
  }

  getProduct(): Product {
    return this.product;
  }

  getContentLoaded(): boolean {
    return this.contentLoaded;
  }

  deleteCategory(productId?: string): void {
    if(productId == undefined)
    {
      return;
    }
    this.productService.deleteProduct(productId).subscribe(data => {
      this.router.navigate(['admin', 'product']);
    });
  }

}
