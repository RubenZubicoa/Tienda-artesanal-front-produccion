import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { getStatusLabel, Order, OrderStatus } from '../../../core/models/Order';

@Component({
  selector: 'app-order-data',
  imports: [CommonModule],
  templateUrl: './order-data.component.html',
  styleUrl: './order-data.component.scss'
})
export class OrderDataComponent {

  public order = input.required<Order>();

  getStatusLabel(status: OrderStatus): string {
    return getStatusLabel(status);
  }

}
