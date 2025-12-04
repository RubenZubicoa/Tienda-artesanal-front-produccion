import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CarritoService } from '../../../carrito/services/carrito.service';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarruselComponent } from '../../../shared/components/carrusel/carrusel.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, BreadcrumbsComponent, MatInputModule, CarruselComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public product = input.required<Product>();

  private readonly carritoService = inject(CarritoService);
  private readonly toastService = inject(ToastService);

  public addProductToCart(quantity: string) {
    this.carritoService.addProduct(this.product(), Number(quantity));
    this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto agregado al carrito', 'El producto ha sido agregado al carrito correctamente');
  }
}
