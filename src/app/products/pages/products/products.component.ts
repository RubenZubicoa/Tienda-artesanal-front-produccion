import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);

  public products = toSignal(this.productsService.getProducts());
  public cards = computed(() => this.products()?.map(mapProductToCardData) ?? []);
  public readonly router = inject(Router);


  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }
}
