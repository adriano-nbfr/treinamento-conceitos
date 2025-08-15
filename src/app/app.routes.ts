import { Routes } from '@angular/router';
import { HomePortal } from './home-portal/home-portal';
import { TwoWayPai } from './exemplos/two-way/two-way-pai/two-way-pai';
import { UsuariosListagem } from './exemplos/usuarios/usuarios-listagem/usuarios-listagem';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home - Treinamento Conceitos',
    component: HomePortal
  },
  {
    path: 'exemplos',
    children: [
      {
        path: 'two-way',
        title: 'Two-Way Binding',
        component: TwoWayPai
      },
      {
        path: 'usuarios',
        title: 'Usuários',
        component: UsuariosListagem
      }
    ]
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
