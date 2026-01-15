import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CompleteOrderFormComponent } from '../../components/complete-order-form/complete-order-form.component';
import { SelectMeetingPointComponent } from '../../components/select-meeting-point/select-meeting-point.component';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AddOrder } from '../../../core/models/Order';
import { ProductCart } from '../../../core/models/Product';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { OrdersService } from '../../../orders/services/orders.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarritoService } from '../../services/carrito.service';
import { CompleteOrderForm, CompleteOrderFormService, ICompleteOrderForm } from '../../services/complete-order-form.service';
import { Manufacturer } from '../../../core/models/Manufacturer';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-complete-order',
  imports: [CommonModule, BreadcrumbsComponent, CompleteOrderFormComponent, MatDividerModule, SelectMeetingPointComponent, MatStepperModule],
  templateUrl: './complete-order.component.html',
  styleUrl: './complete-order.component.scss'
})
export class CompleteOrderComponent {
  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly toasterService = inject(ToastService);
  private readonly carritoService = inject(CarritoService);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public orders: Record<Manufacturer['uuid'], AddOrder> = {};
  public orderFormData: CompleteOrderForm = this.completeOrderFormService.crearFormulario();

  @ViewChild('stepper') stepper!: MatStepper;

  public completeOrder(formData: ICompleteOrderForm): void {
    const productsByManufacturer = this.carritoService.getProductsCartByManufacturer();
    for (const manufacturer in productsByManufacturer) {
      const products = productsByManufacturer[manufacturer];
      const order: AddOrder = {
        manufacturerId: manufacturer,
        products: this.getProducts(products),
        username: formData.name,
        phone: formData.phone,
        email: formData.email,
      };
      this.orders[manufacturer] = order;
    }
    this.completeOrderFormService.actualizarFormulario(this.orderFormData, formData);
    this.stepper.next();
  }

  public selectedMeetingPoint(event: { manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid'] }): void {
    this.orders[event.manufacturerId].meetingPointId = event.meetingPointId;
  }

  public saveChanges(){
    for (const manufacturer in this.orders) {
      const order = this.orders[manufacturer];
      this.createOrder(order);
    }
    this.carritoService.clearCart();
  }

  private createOrder(order: AddOrder): void {
    this.ordersService.createOrder(order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toasterService.showMessage(ToastTypes.SUCCESS, 'Pedido completado', 'El pedido ha sido completado correctamente');
      },
      error: () => {
        this.toasterService.showMessage(ToastTypes.ERROR, 'Error al completar pedido', 'El pedido no ha sido completado correctamente');
      }
    });
  }

  private getProducts(products: ProductCart[]){
    return products.map(product => ({ productId: product.uuid, name: product.name, quantity: product.quantity, price: product.price }))
  }
}
