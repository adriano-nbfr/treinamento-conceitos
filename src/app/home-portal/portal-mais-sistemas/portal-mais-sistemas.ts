import { Component, input, output } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';

@Component({
  selector: 'app-portal-mais-sistemas',
  imports: [],
  templateUrl: './portal-mais-sistemas.html',
  styleUrl: './portal-mais-sistemas.scss'
})
export class PortalMaisSistemas {

  /** Um array com dados de atalhos a exibir como links de destaque no portal */
  atalhos = input.required<AtalhoSistema[]>();

  /** Determina se o modo de edição dos atalhos estará ativado. */
  edicaoAtiva = input(false);

  /** O número de atalhos a partir do qual a lista será colapsada com um botão para alternar a exibição. (0 = nunca, default = 5) */
  minimoColapsar = input(5, {transform: (n: number) => Math.max(0, n) });

  /** Evento disparado ao clicar em um atalho durante a edição, indicando que ele deve passar para os destaques.
   * O valor do evento é um objeto do tipo `AtalhoSistema` */
  atalhoPromovido = output<AtalhoSistema>();

  protected exibirMais = false;


  protected atalhoClick(atalho: AtalhoSistema, event: MouseEvent) {
    if (this.edicaoAtiva()) {
      event.preventDefault(); // evita que o link seja acionado
      this.atalhoPromovido.emit(atalho);
    }
  }

}
