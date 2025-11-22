import { computed, Injectable, signal } from '@angular/core';
import { Product, ProductCart } from '../../core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private _carrito = signal<ProductCart[]>([]);
  public readonly isEmpty = computed(() => this._carrito().length === 0);


  public get carrito() {
    return this._carrito.asReadonly();
  }

  public getTotal() {
    return this._carrito().reduce((acc, product) => acc + product.price, 0);
  }

  public addProduct(product: Product, quantity: number) {
    this._carrito.update(prev => [...prev, { ...product, quantity: quantity }]);
  }

  public removeProduct(uuid: string) {
    this._carrito.update(prev => prev.filter(p => p.uuid !== uuid));
  }
}
