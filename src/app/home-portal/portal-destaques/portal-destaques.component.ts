import { Component, input } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';
import { FiltroHoverDirective } from '../../shared/diretivas/filtro-hover.directive';

@Component({
  selector: 'app-portal-destaques',
  imports: [
    FiltroHoverDirective
  ],
  templateUrl: './portal-destaques.component.html',
  styleUrl: './portal-destaques.component.scss'
})
export class PortalDestaquesComponent {

  /** Um array com dados de atalhos a exibir como links em uma listagem */
  atalhos = input.required<AtalhoSistema[]>();

}
