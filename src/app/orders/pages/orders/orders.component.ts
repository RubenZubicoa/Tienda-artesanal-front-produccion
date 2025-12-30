import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ORDERS_COLUMNS } from '../../models/orders.columns';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { map } from 'rxjs';
import { Order } from '../../../core/models/Order';
import { Router } from '@angular/router';

type OrderTableData = Order & {total: number}

@Component({
  selector: 'app-orders',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  private readonly ordersService = inject(OrdersService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);

  public readonly columns = ORDERS_COLUMNS;
  public orders$ = this.ordersService.getOrdersByManufacturer(this.currentUserService.currentUser()?.manufacturerId ?? '').pipe(
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
