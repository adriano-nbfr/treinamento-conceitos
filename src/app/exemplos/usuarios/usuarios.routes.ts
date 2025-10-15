import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios-api";
import { inject } from "@angular/core";

export default [
  {
    path: '',
    providers: [
      UsuariosApi
    ],
    children: [
      {
        path: ':idUsuario',
        title: 'Exemplos - Usuário Visualização - Treinamento Conceitos',
        resolve: {
          usuario: (route: ActivatedRouteSnapshot) =>
            inject(UsuariosApi).obter(route.params['idUsuario'])
        },
        loadComponent: () => import('./usuarios-visualizacao/usuarios-visualizacao')
          .then(m => m.UsuariosVisualizacao)
      },
      {
        path: '',
        pathMatch: 'full',
        title: 'Exemplos - Listagem de usuários - Treinamento Conceitos',
        loadComponent: () => import('./usuarios-listagem/usuarios-listagem')
          .then(m => m.UsuariosListagem)
      }
    ]
  }

] as Routes;
