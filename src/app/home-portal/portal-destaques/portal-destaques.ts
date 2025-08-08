import { Component, input, output } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';

@Component({
  selector: 'app-portal-destaques',
  imports: [],
  templateUrl: './portal-destaques.html',
  styleUrl: './portal-destaques.scss'
})
export class PortalDestaques {

  /** Um array com dados de atalhos a exibir como links de destaque no portal */
  atalhos = input.required<AtalhoSistema[]>();

  /** Determina se o modo de edição dos atalhos estará ativado. */
  edicaoAtiva = input(false);

  /** Evento disparado ao clicar em um atalho durante a edição, indicando que ele deve sair dos destaques. */
  atalhoRebaixado = output<AtalhoSistema>();


  protected atalhoClick(atalho: AtalhoSistema, event: MouseEvent) {
    if (this.edicaoAtiva()) {
      event.preventDefault(); // evita que o link seja acionado
      this.atalhoRebaixado.emit(atalho);
    }
  }

}
