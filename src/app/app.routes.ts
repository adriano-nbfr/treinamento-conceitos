import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portal',
    loadComponent: () => import('./home-portal/home-portal.component')
      .then(m => m.HomePortalComponent)
  },
  {
    path: 'exemplos',
    children: [
      {
        path: 'usuarios',
        loadComponent: () => import('./exemplos/usuarios/usuarios-listagem/usuarios-listagem.component')
          .then(m => m.UsuariosListagemComponent)
      },
      {
        path: 'two-way',
        loadComponent: () => import('./exemplos/two-way/two-way-pai/two-way-pai.component')
          .then(m => m.TwoWayPaiComponent)
      },
    ]
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
