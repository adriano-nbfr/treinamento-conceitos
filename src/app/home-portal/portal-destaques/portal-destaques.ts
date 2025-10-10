import { Component, input, output } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';
import { FiltroHover } from '../../shared/diretivas/filtro-hover';

@Component({
  selector: 'app-portal-destaques',
  imports: [
    FiltroHover
  ],
  templateUrl: './portal-destaques.html',
  styleUrl: './portal-destaques.scss'
})
export class PortalDestaques {

  /** Um array com dados de atalhos a exibir como links de destaque no portal */
  atalhos = input.required<AtalhoSistema[]>();

  /** Evento disparado ao clicar em um atalho durante a edição, indicando que ele deve deixar os destaques. */
  atalhoRebaixado = output<AtalhoSistema>();

  editando = false;


  protected atalhoClick(atalho: AtalhoSistema, event: MouseEvent) {
    if (this.editando) {
      event.preventDefault(); // evita que o link seja acionado
      this.atalhoRebaixado.emit(atalho);
    }
  }

}
