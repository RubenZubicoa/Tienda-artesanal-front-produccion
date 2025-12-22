import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Order } from '../../../core/models/Order';

@Component({
  selector: 'app-order-data',
  imports: [CommonModule],
  templateUrl: './order-data.component.html',
  styleUrl: './order-data.component.scss'
})
export class OrderDataComponent {

  public order = input.required<Order>();

  getStatusLabel(status: 'pending' | 'completed' | 'cancelled'): string {
    const statusLabels: Record<string, string> = {
      'pending': 'Pendiente',
      'completed': 'Completado',
      'cancelled': 'Cancelado'
    };
    return statusLabels[status] || status;
  }

}
