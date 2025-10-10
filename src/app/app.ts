import { Component, ViewEncapsulation } from '@angular/core';
import { HomePortal } from "./home-portal/home-portal";
import { LayoutHeader } from "./layout-header/layout-header";
import { TwoWayPai } from "./two-way/two-way-pai/two-way-pai";
import { Bloqueado } from './shared/diretivas/bloqueado';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    HomePortal,
    LayoutHeader,
    TwoWayPai,
    Bloqueado
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

  protected conteudoBloqueado = false;

}
