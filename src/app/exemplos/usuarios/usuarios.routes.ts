import { Routes } from '@angular/router';
import { resolveUsuario } from './usuario-visualizacao/resolve';
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
      UsuarioService
    ],
    resolve: {
      usuario: resolveUsuario
    },
    loadComponent: () => import('./usuario-visualizacao/usuario-visualizacao.component')
      .then(m => m.UsuarioVisualizacaoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
