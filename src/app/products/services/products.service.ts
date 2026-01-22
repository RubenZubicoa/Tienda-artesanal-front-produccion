import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { AddProduct, Product, ProductDB, ProductFilters, UpdateProduct, mapProductToProduct } from '../../core/models/Product';
import { map, Observable } from 'rxjs';
import { mapperOnlyPropertiesWithValue } from '../../shared/utils/resquet-body-map';
import { InsertOneResult, UpdateOneResult } from '../../core/models/InsertOneResult';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.PRODUCTS_URL;

  
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDB[]>(this.url).pipe(map(products => products.map(mapProductToProduct)));
  }

  getProductsByFilters(filters: ProductFilters): Observable<Product[]> {
    const filteredFilters = mapperOnlyPropertiesWithValue(filters);
    if (filters.price && !filters.price.start && !filters.price.end) {
      delete filteredFilters.price;
    }
    return this.http.post<ProductDB[]>(this.url + '/criteria', filteredFilters).pipe(map(products => products.map(mapProductToProduct)));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const url = `${this.url}/${id}`;
    return this.http.get<ProductDB>(url).pipe(map(product => mapProductToProduct(product)));
  }

  getProductsByManufacturer(manufacturerId: string): Observable<Product[]> {
    const url = `${this.url}/manufacturer/${manufacturerId}`;
    return this.http.get<ProductDB[]>(url).pipe(map(products => products.map(mapProductToProduct)));
  }

  createProduct(product: AddProduct): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, product);
  }

  updateProduct(uuid: Product['uuid'], product: UpdateProduct): Observable<UpdateOneResult> {
    const url = `${this.url}/${uuid}`;
    return this.http.put<UpdateOneResult>(url, product);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + productId);
  }
  
}
