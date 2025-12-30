import { Routes } from "@angular/router";
import { orderDetailsResolver } from "./order-details.resolver";

export const ordersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent),
  },
  {
    path: ':orderId',
    loadComponent: () => import('./pages/order-details/order-details.component').then(m => m.OrderDetailsComponent),
    resolve: {
      order: orderDetailsResolver,
    },
    data: {
      breadcrumb: 'Detalles del pedido'
    }
  },
];