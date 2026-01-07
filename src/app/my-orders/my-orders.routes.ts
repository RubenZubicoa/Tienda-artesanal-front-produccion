import { Routes } from '@angular/router';

export const myOrdersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent),
  }
]