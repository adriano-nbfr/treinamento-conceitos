import { Component, input } from '@angular/core';

import { BloqueadoDirective } from '../shared/diretivas/bloqueado.directive';
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

  bloqueado = input(false);

}
