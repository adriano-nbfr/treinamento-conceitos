import { Component, input, output, TemplateRef } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-portal-mais-sistemas',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './portal-mais-sistemas.component.html',
  styleUrl: './portal-mais-sistemas.component.scss'
})
export class PortalMaisSistemasComponent {

  /** Um array com dados de atalhos a exibir como links em uma listagem */
  atalhos = input.required<AtalhoSistema[]>();

  /** O número de atalhos a partir do qual a lista será colapsada com um botão para alternar a exibição. (0 = nunca, default = 5) */
  minimoColapsar = input(5, { transform: (n: number) => Math.max(0, n) } );

  /** Um template customizado para os links. */
  templateLink = input<TemplateRef<unknown>>();

  /** Evento disparado ao clicar em um atalho durante a edição, indicando que ele deve passar para os destaques. */
  atalhoPromovido = output<AtalhoSistema>();


  protected exibirMais = false;

  protected editando = false;


  atalhoClick(atalho: AtalhoSistema, event: MouseEvent) {
    if (this.editando) {
      event.preventDefault();
      this.atalhoPromovido.emit(atalho);
    }
  }

}
