import { Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios/usuarios-api";
import { inject } from "@angular/core";

export default [
  {
    path: 'two-way',
    title: 'Two-Way Binding',
    loadComponent: () => import('./two-way/two-way-pai/two-way-pai').then(m => m.TwoWayPai)
  },
  {
    path: 'usuarios',
    title: 'Usuários',
    providers: [
      UsuariosApi
    ],
    loadComponent: () => import('./usuarios/usuarios-listagem/usuarios-listagem').then(m => m.UsuariosListagem)
  }
] as Routes;
