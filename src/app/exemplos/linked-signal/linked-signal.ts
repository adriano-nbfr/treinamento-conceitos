import { ChangeDetectionStrategy, Component, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/card/card';


const OPCOES_COMPLETA = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Muito Bom'];
const OPCOES_REDUZIDA = ['Ruim', 'Regular', 'Bom'];
const cores = []


@Component({
  selector: 'app-linked-signal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Card,
  ],
  templateUrl: './linked-signal.html',
  styleUrl: './linked-signal.scss'
})
export class LinkedSignal {

  protected opcoesAvaliacao = signal(OPCOES_COMPLETA);

  // sintaxe mais avançada para definição de um linkedSignal, que permite usar o estado prévio
  protected avaliacao = linkedSignal({
    source: this.opcoesAvaliacao, // vincula a computação a mudanças neste signal
    computation: (opcoes, previo) => {
      // caso a opção anterior não esteja mais presente, usa a opção do meio
      return opcoes.find(o => o === previo?.value) ?? opcoes[Math.trunc(opcoes.length / 2)];
    }
  });


  definirOpcoesAvaliacao(reduzida: boolean) {
    if (reduzida)
      this.opcoesAvaliacao.set(OPCOES_REDUZIDA);
    else
      this.opcoesAvaliacao.set(OPCOES_COMPLETA);
  }

}
