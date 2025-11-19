import { Routes } from '@angular/router';
import { productResolver } from './products.resolver';

export const productsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        resolve: {
            product: productResolver
        },
        data: {
            breadcrumb: 'Detalles del producto',
        },
    }
]