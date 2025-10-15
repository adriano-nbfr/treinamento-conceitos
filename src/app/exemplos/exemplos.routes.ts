import { Routes } from "@angular/router";

export default [
  {
    path: 'two-way',
    title: 'Exemplos - Two-way binding - Treinamento Conceitos',
    loadComponent: () => import('./two-way/two-way-pai/two-way-pai')
      .then(m => m.TwoWayPai)
  },
  {
    path: 'usuarios',
    title: 'Exemplos - Listagem de usuários - Treinamento Conceitos',
    loadComponent: () => import('./usuarios/usuarios-listagem/usuarios-listagem')
      .then(m => m.UsuariosListagem)
  },
  {
    path: '',
    pathMatch: 'full',
    title: 'Exemplos - Treinamento Conceitos',
    loadComponent: () => import('./exemplos-home/exemplos-home')
      .then(m => m.ExemplosHome)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
