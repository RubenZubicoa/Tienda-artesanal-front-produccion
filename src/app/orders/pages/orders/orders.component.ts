import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ORDERS_LIST } from '../../../core/data/orders';
import { ORDERS_COLUMNS } from '../../models/orders.columns';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  public readonly columns = ORDERS_COLUMNS;
  public readonly data = ORDERS_LIST;

}
