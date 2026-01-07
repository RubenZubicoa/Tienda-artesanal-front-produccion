import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ORDERS_COLUMNS } from '../../../orders/models/orders.columns';
import { OrdersService } from '../../../orders/services/orders.service';
import { OrderTableData } from '../../../core/models/Order';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);

  public readonly columns = ORDERS_COLUMNS;
  public orders$ = this.ordersService.getOrdersByEmail(this.currentUserService.currentUser()?.email ?? '').pipe(
    map((data) => {
      return data.map((order) => ({
        ...order,
        total: order.products.reduce((acc, product) => acc + product.price * product.quantity, 0),
      }) as OrderTableData);
    })
  )
  public readonly orders = toSignal(this.orders$, { initialValue: [] as OrderTableData[] });

  public goToOrderDetails(order: OrderTableData) {
    this.router.navigate(['/orders', order.uuid]);
  }
}
