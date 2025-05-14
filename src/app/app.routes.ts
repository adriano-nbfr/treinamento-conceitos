import { Routes } from '@angular/router';
import { HomePortalComponent } from './home-portal/home-portal.component';
import { UsuariosListagemComponent } from './exemplos/usuarios/usuarios-listagem/usuarios-listagem.component';
import { TwoWayPaiComponent } from './exemplos/two-way/two-way-pai/two-way-pai.component';
import { ErroNavegacaoComponent } from './erro-navegacao/erro-navegacao.component';

export const routes: Routes = [
  {
    path: 'portal',
    component: HomePortalComponent
  },
  {
    path: 'exemplos/usuarios',
    component: UsuariosListagemComponent
  },
  {
    path: 'exemplos/two-way',
    component: TwoWayPaiComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'portal'
  },
  {
    path: '**',
    component: ErroNavegacaoComponent
  }
];
