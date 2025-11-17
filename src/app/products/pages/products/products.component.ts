import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PRODUCTS_LIST } from '../../../core/data/products';

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public products = PRODUCTS_LIST;
}
