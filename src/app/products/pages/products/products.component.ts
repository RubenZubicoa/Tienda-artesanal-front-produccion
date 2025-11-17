import { Component, computed, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Product } from '../../../core/models/Product';
import { mapProductToCardData } from '../../../shared/components/card/card.models';

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public products = signal<Product[]>(PRODUCTS_LIST);

  public cards = computed(() => this.products().map(mapProductToCardData));
}
