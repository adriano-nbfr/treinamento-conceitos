import { Component, inject } from '@angular/core';

import { BloqueadoDirective } from '../shared/diretivas/bloqueado.directive';
import { NavegacaoService } from '../shared/navegacao.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    BloqueadoDirective,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  protected isNavegando = inject(NavegacaoService).isNavegando;

}
