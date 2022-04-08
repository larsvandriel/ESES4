import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  // @ts-ignore
  product: Product;

  submitted = false;
  contentLoaded = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.productService.getProduct(id).subscribe(data => {
      this.product = new Product(data.Id, data.Name, data.Description, data.EanNumber, data.Price, data.ImageLocation, data.TimeCreated, data.Deleted, data.TimeDeleted);
      this.contentLoaded = true;
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }

  editProduct(): void {
    this.productService.editProduct(this.product).subscribe(data => {
      this.router.navigate(['admin', 'product', this.product.id]);
    });
  }
}
