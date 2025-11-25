import { Routes } from '@angular/router';
import { ManufacturersComponent } from './manufacturers/pages/manufacturers/manufacturers.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    data: {
      breadcrumb: 'Inicio',
    },
  },
  {
    path: 'manufacturers',
    loadChildren: () => import('./manufacturers/manufacturers.routes').then(m => m.manufacturersRoutes),
    data: {
      breadcrumb: 'Vendedores',
    },
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then((m) => m.productsRoutes),
    data: {
      breadcrumb: 'Productos',
    },
  },

  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.routes').then(m => m.carritoRoutes),
    data: {
      breadcrumb: 'Carrito de compras',
    },
  }
];
