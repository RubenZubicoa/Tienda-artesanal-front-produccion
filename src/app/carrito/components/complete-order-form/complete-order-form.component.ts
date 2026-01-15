import { Component, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteOrderFormService, ICompleteOrderForm } from '../../services/complete-order-form.service';
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

  public completeOrder = output<ICompleteOrderForm>();

  public form = this.completeOrderFormService.crearFormulario();

  ngOnInit(): void {
    const currentUser = this.currentUserService.currentUser();
    if (currentUser) {
      this.completeOrderFormService.actualizarFormulario(this.form, {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
      this.form.disable();
    }
  }

  public onCompleteOrder(): void {
    this.completeOrder.emit(this.completeOrderFormService.obtenerDatos(this.form));
  }

}
