import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:5001/api/'

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    const url = this.baseUrl + 'Product';
    const headers = new HttpHeaders({'Accept': 'application/json'});
    // const params = new HttpParams().set('filter', filter).set('orderBy', orderBy).set('pageNumber', pageNumber).set('pageSize', pageSize)
    const options = { headers, observe: 'response'}
    // @ts-ignore
    return this.httpClient.get(url, options);
  }

  getProduct(productId: string): Observable<any> {
    const url = this.baseUrl + 'Product/' + productId;
    const httpOptions = {headers: new HttpHeaders({'Accept': 'application/json'})};
    return this.httpClient.get(url, httpOptions);
  }

  deleteProduct(productId: string): Observable<any> {
    const url = this.baseUrl + 'Product/' + productId;
    const httpOptions = {headers: new HttpHeaders({'Accept': 'application/json'})};
    return this.httpClient.delete(url, httpOptions);
  }

  createProduct(product: Product): Observable<any> {
    const url = this.baseUrl + 'Product';
    const body = JSON.stringify(product);
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post(url, body, httpOptions);
  }

  editProduct(product: Product): Observable<any> {
    const url = this.baseUrl + 'Product/' + product.id;
    const body = JSON.stringify(product);
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.put(url, body, httpOptions);
  }
}
