import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios-api";
import { inject } from "@angular/core";
import { of } from "rxjs";

const usuarioVisualizarResolve = (route: ActivatedRouteSnapshot) =>
  inject(UsuariosApi).obter(route.params['idUsuario']);

const usuarioEdicaoResolve = (route: ActivatedRouteSnapshot) => {
  const id = route.params['idUsuario'];

  if (id === 'novo')
    return of({});

  return inject(UsuariosApi).obter(id);
};

export default [
  {
    path: '',
    providers: [
      UsuariosApi
    ],
    children: [
      {
        path: ':idUsuario/visualizar',
        title: 'Exemplos - Usuário Visualização - Treinamento Conceitos',
        resolve: {
          usuario: usuarioVisualizarResolve
        },
        loadComponent: () => import('./usuarios-visualizacao/usuarios-visualizacao')
          .then(m => m.UsuariosVisualizacao)
      },
      {
        path: ':idUsuario',
        title: 'Exemplos - Usuário Edição - Treinamento Conceitos',
        resolve: {
          usuario: usuarioEdicaoResolve
        },
        loadComponent: () => import('./usuarios-edicao-rf/usuarios-edicao-rf')
          .then(m => m.UsuariosEdicaoRf)
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
