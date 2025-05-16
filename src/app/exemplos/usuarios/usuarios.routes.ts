import { Routes } from '@angular/router';
import { usuarioEdicaoResolve, usuarioResolve } from './usuario-resolve';
import { UsuarioService } from './usuario.service';

export default [
  {
    path: '',
    loadComponent: () => import('./usuarios-listagem/usuarios-listagem.component')
      .then(m => m.UsuariosListagemComponent)
  },
  {
    path: ':idUsuario',
    providers: [
      { provide: UsuarioService }
    ],
    children: [
      {
        path: 'visualizar',
        title: 'Usuários - Visualização',
        resolve: {
          usuario: usuarioResolve
        },
        loadComponent: () => import('./usuario-visualizacao/usuario-visualizacao.component')
          .then(m => m.UsuarioVisualizacaoComponent)
      },
      {
        path: '',
        title: 'Usuários - Edição',
        resolve: {
          usuario: usuarioEdicaoResolve
        },
        loadComponent: () => import('./usuario-edicao-td/usuario-edicao-td.component')
          .then(m => m.UsuarioEdicaoTdComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
