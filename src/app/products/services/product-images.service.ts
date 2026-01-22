import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config/api.config';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AddProductImage, ProductImage, ProductImageDB, mapProductImageToProductImage } from '../../core/models/ProductImage';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {
  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.PRODUCT_IMAGES_URL;

  getProductImages(productId: string): Observable<ProductImage[]> {
    return this.http.get<ProductImageDB[]>(this.url + '/' + productId).pipe(map(productImages => productImages.map(mapProductImageToProductImage)));
  }

  addProductImages(addProductImage: AddProductImage): Observable<void> {
    const formData = new FormData();
    formData.append('productId', addProductImage.productId);
    addProductImage.images.forEach((image: File) => formData.append('images', image));
    return this.http.post<void>(this.url, formData);
  }
}
