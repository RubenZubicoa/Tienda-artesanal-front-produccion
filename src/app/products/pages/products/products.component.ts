import { Component, computed, inject, signal } from '@angular/core';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Product } from '../../../core/models/Product';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';

@Component({
  selector: 'app-products',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public products = signal<Product[]>(PRODUCTS_LIST);
  public cards = computed(() => this.products().map(mapProductToCardData));
  public readonly router = inject(Router);


  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }
}
