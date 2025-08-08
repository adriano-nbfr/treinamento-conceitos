import { Component } from '@angular/core';
import { LayoutHeader } from './layout-header/layout-header';
import { Bloqueado } from '../shared/diretivas/bloqueado';

@Component({
  selector: 'app-layout',
  imports: [
    LayoutHeader,
    Bloqueado
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

  protected conteudoBloqueado = false;

}
