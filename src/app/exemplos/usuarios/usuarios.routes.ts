import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios-api";

export default [
  {
    path: '',
    pathMatch: 'full',
    title: 'Usuários - Listagem',
    loadComponent: () => import('./usuarios-listagem/usuarios-listagem')
      .then(m => m.UsuariosListagem)
  },
  {
    path: ':idUsuario',
    title: 'Usuários - Visualização',
    resolve: {
      usuario: (route: ActivatedRouteSnapshot) =>
        inject(UsuariosApi).obter(route.params['idUsuario'])
    },
    loadComponent: () => import('./usuarios-visualizacao/usuarios-visualizacao')
      .then(m => m.UsuariosVisualizacao)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
