import {CollectionViewer, DataSource} from "@angular/cdk/collections";
// import {ProductListComponent} from "./product-list/product-list.component";
import {Product} from "./product.model";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
// import {ProductService} from "./product.service";
//
export class ProductDataSource implements DataSource<Product> {
//
  productSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
//
//   public loading$ = this.loadingSubject.asObservable();
//
//   constructor( private  productService: ProductService) {}
//
  connect(collectionViewer: CollectionViewer): Observable<Product[]>{
    return this.productSubject.asObservable();
  }
//
  disconnect(collectionViewer: CollectionViewer): void {
    this.productSubject.complete();
    this.loadingSubject.complete();
  }
//
//   loadProducts(filter = '', orderBy = 'Name', pageIndex = 0, pageSize = 2) {
//     this.loadingSubject.next(true);
//
//     this.productService.getProducts(filter, orderBy, pageIndex, pageSize).pipe(
//       catchError(() => of([])),
//       finalize(() => this.loadingSubject.next(false))
//     )
//       .subscribe(product => this.productSubject.next(product));
//     console.log(this.productSubject)
//   }
//
}
