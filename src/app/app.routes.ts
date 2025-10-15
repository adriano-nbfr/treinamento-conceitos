import { Routes } from '@angular/router';
import exemplosRoutes from './exemplos/exemplos.routes';
import { HomePortal } from './home-portal/home-portal';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home - Treinamento Conceitos',
    component: HomePortal
  },
  {
    path: 'exemplos',
    children: exemplosRoutes
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
