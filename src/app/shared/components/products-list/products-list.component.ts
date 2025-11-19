import { Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { CardData, mapProductToCardData } from '../card/card.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  public products = input.required<Product[]>();
  public readonly router = inject(Router);
  public cards = computed(() => this.products().map(mapProductToCardData));

  public onButtonClick(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }

}
