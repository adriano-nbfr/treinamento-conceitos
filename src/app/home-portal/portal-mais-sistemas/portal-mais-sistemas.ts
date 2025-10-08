import { Component, input, output } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';

@Component({
  selector: 'app-portal-mais-sistemas',
  imports: [],
  templateUrl: './portal-mais-sistemas.html',
  styleUrl: './portal-mais-sistemas.scss'
})
export class PortalMaisSistemas {

  /** Um array com dados de atalhos a exibir como links Mais Sistemas no portal */
  atalhos = input.required<AtalhoSistema[]>();

  /** O número de atalhos a partir do qual a lista será colapsada com um botão para alternar a exibição. (0 = nunca, default = 5) */
  minimoColapsar = input(5, {
    transform: (n: number) => Math.max(0, n)
  });

  /** Evento disparado ao clicar em um atalho durante a edição, indicando que ele deve passar para os destaques. */
  atalhoPromovido = output<AtalhoSistema>();


  exibirMais = false;

  editando = false;


  protected atalhoClick(atalho: AtalhoSistema, event: MouseEvent) {
    if (this.editando) {
      event.preventDefault(); // evita que o link seja acionado
      this.atalhoPromovido.emit(atalho);
    }
  }

}
