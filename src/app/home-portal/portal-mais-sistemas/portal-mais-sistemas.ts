import { Component, input, output } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';
import { OrdenarPipe } from '../../shared/pipes/ordenar-pipe';

@Component({
  selector: 'app-portal-mais-sistemas',
  imports: [
    OrdenarPipe
  ],
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


  // protected ordenarAtalhos(itens: AtalhoSistema[], atributo: keyof AtalhoSistema) {
  //   console.log('Função ordenarAtalhos() processada.');

  //   if (itens.length === 0)
  //     return itens;

  //   return [...itens]
  //     .sort((a, b) => (a[atributo]! > b[atributo]!) ? 1 : (a[atributo]! < b[atributo]!) ? - 1 : 0);
  // }

}
