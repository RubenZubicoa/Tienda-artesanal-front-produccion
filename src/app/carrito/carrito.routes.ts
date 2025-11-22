import { Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CarritoService } from './services/carrito.service';
import { completeOrderGuard } from './complete-order.guard';


export const carritoRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/carrito/carrito.component').then(m => m.CarritoComponent)
    },
    {
        path: 'complete-order',
        loadComponent: () => import('./pages/complete-order/complete-order.component').then(m => m.CompleteOrderComponent),
        canActivate: [completeOrderGuard],
        data: {
            breadcrumb: 'Completar pedido',
        },
    }
]