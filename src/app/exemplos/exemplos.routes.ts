import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./exemplos-home/exemplos-home.component')
      .then(m => m.ExemplosHomeComponent)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.routes')
  },
  {
    path: 'two-way',
    loadComponent: () => import('./two-way/two-way-pai/two-way-pai.component')
      .then(m => m.TwoWayPaiComponent)
  }
] as Routes;
