import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portal',
    loadComponent: () => import('./home-portal/home-portal.component')
      .then(m => m.HomePortalComponent)
  },
  {
    path: 'exemplos',
    loadChildren: () => import('./exemplos/exemplos.routes')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'portal'
  },
  {
    path: '**',
    loadComponent: () => import('./erro-navegacao/erro-navegacao.component')
      .then(m => m.ErroNavegacaoComponent)
  }
];
