import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'manufacturers',
        loadComponent: () => import('./manufacturers/pages/manufacturers/manufacturers.component').then(m => m.ManufacturersComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./products/pages/products/products.component').then(m => m.ProductsComponent)
    }
];
