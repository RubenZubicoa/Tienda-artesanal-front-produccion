import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteOrderFormService } from '../../services/complete-order-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarritoService } from '../../services/carrito.service';
import { AddOrder, Order } from '../../../core/models/Order';
import { OrdersService } from '../../../orders/services/orders.service';
import { ProductCart } from '../../../core/models/Product';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-order-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './complete-order-form.component.html',
  styleUrl: './complete-order-form.component.scss'
})
export class CompleteOrderFormComponent implements OnInit {

  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly toasterService = inject(ToastService);
  private readonly carritoService = inject(CarritoService);
  private readonly ordersService = inject(OrdersService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);

  public form = this.completeOrderFormService.crearFormulario();

  ngOnInit(): void {
    const currentUser = this.currentUserService.currentUser();
    if (currentUser) {
      this.form.patchValue({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
      this.form.disable();
    }
  }

  public completeOrder(): void {
    const productsByManufacturer = this.carritoService.getProductsCartByManufacturer();
    const formData = this.completeOrderFormService.obtenerDatos(this.form);
    for (const manufacturer in productsByManufacturer) {
      const products = productsByManufacturer[manufacturer];
      const order: AddOrder = {
        manufacturerId: manufacturer,
        products: this.getProducts(products),
        username: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      };
      this.createOrder(order);      
    }
  }

  private getProducts(products: ProductCart[]){
    return products.map(product => ({ productId: product.uuid, name: product.name, quantity: product.quantity, price: product.price }))
  }

  private createOrder(order: AddOrder): void {
    this.ordersService.createOrder(order).subscribe({
      next: () => {
        this.toasterService.showMessage(ToastTypes.SUCCESS, 'Pedido completado', 'El pedido ha sido completado correctamente');
        this.carritoService.clearCart();
        this.router.navigate(['/my-orders']);
      },
      error: () => {
        this.toasterService.showMessage(ToastTypes.ERROR, 'Error al completar pedido', 'El pedido no ha sido completado correctamente');
      }
    });
  }
}
