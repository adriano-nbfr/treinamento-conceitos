import { Routes } from "@angular/router";
import { ExemplosHome } from "./exemplos-home/exemplos-home";
import { TwoWayPai } from "./two-way/two-way-pai/two-way-pai";
import { UsuariosListagem } from "./usuarios/usuarios-listagem/usuarios-listagem";

export default [
  {
    path: 'two-way',
    title: 'Exemplos - Two-way binding - Treinamento Conceitos',
    component: TwoWayPai
  },
  {
    path: 'usuarios',
    title: 'Exemplos - Listagem de usuários - Treinamento Conceitos',
    component: UsuariosListagem
  },
  {
    path: '',
    pathMatch: 'full',
    title: 'Exemplos - Treinamento Conceitos',
    component: ExemplosHome
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;
