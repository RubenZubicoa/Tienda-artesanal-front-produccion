import { computed, Injectable, signal } from '@angular/core';
import { Product, ProductCart } from '../../core/models/Product';
import { Manufacturer } from '../../core/models/Manufacturer';

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

  public getProductsCartByManufacturer(): Record<Manufacturer['uuid'], ProductCart[]> {
    return this._carrito().reduce((acc, product) => {
      const manufacturer = product.manufacturerId;
      if (!manufacturer) return acc;
      if (!acc[manufacturer]) {
        acc[manufacturer] = [];
      }
      acc[manufacturer].push(product);
      return acc;
    }, {} as Record<Manufacturer['uuid'], ProductCart[]>);
  }

  public clearCart() {
    this._carrito.set([]);
  }
}
