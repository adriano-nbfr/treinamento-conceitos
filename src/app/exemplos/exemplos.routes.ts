import { Routes } from "@angular/router";

export default [
  {
    path: 'two-way',
    title: 'Two-Way Binding',
    loadComponent: () => import('./two-way/two-way-pai/two-way-pai').then(m => m.TwoWayPai)
  },
  {
    path: 'usuarios',
    title: 'Usuários',
    loadComponent: () => import('./usuarios/usuarios-listagem/usuarios-listagem').then(m => m.UsuariosListagem)
  }
] as Routes;
