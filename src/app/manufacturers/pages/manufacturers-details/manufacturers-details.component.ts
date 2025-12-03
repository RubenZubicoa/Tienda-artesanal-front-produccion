import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';

@Component({
  selector: 'app-manufacturers-details',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './manufacturers-details.component.html',
  styleUrl: './manufacturers-details.component.scss'
})
export class ManufacturersDetailsComponent {
 
  public manufacturer = input<Manufacturer>();
  public route = inject(ActivatedRoute);
  public readonly router = inject(Router);


  public products: Product[] = [];
  public cards = signal<CardData[]>([]);

  constructor(){
    effect(() => {
      this.products = PRODUCTS_LIST.filter(product => product.manufacturerId === this.manufacturer()?.uuid);
      this.cards.set(this.products.map(mapProductToCardData));
    });
  }

  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }
}
