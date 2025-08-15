import { Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios/usuarios-api";

export default [
  {
    path: 'two-way',
    title: 'Two-Way Binding',
    loadComponent: () => import('./two-way/two-way-pai/two-way-pai').then(m => m.TwoWayPai)
  },
  {
    path: 'usuarios',
    providers: [
      UsuariosApi
    ],
    loadChildren: () => import('./usuarios/usuarios.routes')
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./exemplos-home/exemplos-home').then(m => m.ExemplosHome)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
