import { Routes } from "@angular/router";

export const ordersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent),
    data: {
      breadcrumb: 'Pedidos',
    },
  },
];