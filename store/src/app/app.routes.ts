import { Routes } from '@angular/router';

import { ListComponent } from './domains/products/pages/list/list.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component').then(m => m.ListComponent),
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component').then(m => m.default),
        data: { renderMode: 'no-preference' } // 👈 this tells Angular not to assume pre-render
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
