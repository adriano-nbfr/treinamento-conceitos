import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { UsuariosApi } from "./usuarios-api";
import { of } from "rxjs";
import { Usuario } from "../../shared/model/usuario";

const usuarioVisualizacaoResolve = (route: ActivatedRouteSnapshot) =>
  inject(UsuariosApi).obter(route.params['idUsuario']);

const usuarioEdicaoResolve = (route: ActivatedRouteSnapshot) => {
  const id = route.params['idUsuario'];
  if (id === 'novo')
    return of({ } as Usuario);

  return inject(UsuariosApi).obter(id);
}


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
    children: [
      {
        path: 'visualizar',
        title: 'Usuários - Visualização',
        resolve: {
          usuario: usuarioVisualizacaoResolve
        },
        loadComponent: () => import('./usuarios-visualizacao/usuarios-visualizacao')
          .then(m => m.UsuariosVisualizacao)
      },
      {
        path: '',
        title: 'Usuários - Edição',
        resolve: {
          usuario: usuarioEdicaoResolve
        },
        loadComponent: () => import('./usuarios-edicao-rf/usuarios-edicao-rf')
          .then(m => m.UsuariosEdicaoRf)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
