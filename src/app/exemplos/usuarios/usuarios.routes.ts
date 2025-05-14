import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./usuarios-listagem/usuarios-listagem.component')
      .then(m => m.UsuariosListagemComponent)
  },
  {
    path: ':idUsuario',
    loadComponent: () => import('./usuario-visualizacao/usuario-visualizacao.component')
      .then(m => m.UsuarioVisualizacaoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;