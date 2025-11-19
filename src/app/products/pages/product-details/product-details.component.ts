import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public product = input.required<Product>();
}
