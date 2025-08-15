import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home - Treinamento Conceitos',
    loadComponent: () => import('./home-portal/home-portal').then(m => m.HomePortal)
  },
  {
    path: 'exemplos',
    loadChildren: () => import('./exemplos/exemplos.routes')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
