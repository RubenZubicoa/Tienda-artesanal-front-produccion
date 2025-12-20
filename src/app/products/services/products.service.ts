import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { Product, ProductDB, mapProductToProduct } from '../../core/models/Product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.PRODUCTS_URL;

  
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDB[]>(this.url).pipe(map(products => products.map(mapProductToProduct)));
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.url, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(this.url, product);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + productId);
  }
  
}
