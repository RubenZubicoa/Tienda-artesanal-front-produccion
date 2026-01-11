import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { ProductsService } from '../../services/products.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { Product, ProductFilters } from '../../../core/models/Product';

@Component({
  selector: 'app-products',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent, ProductsFiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  public products = toSignal(this.productsService.getProducts());
  public filteredProducts = signal<Product[] | undefined>(undefined);
  public productsData = computed(() => this.filteredProducts() ?? this.products());
  public filters = signal<ProductFilters>({});
  public cards = computed(() => this.productsData()?.map(mapProductToCardData) ?? []);
  public readonly router = inject(Router);

  public applyFilters(filters: ProductFilters) {
    this.filters.set(filters);
    this.productsService.getProductsByFilters(filters).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(products => {
      this.filteredProducts.set(products);
    });
  }

  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }
}
