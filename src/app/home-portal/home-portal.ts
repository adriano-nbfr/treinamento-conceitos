import { ChangeDetectionStrategy, Component, computed, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalApi } from './portal-api';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from "./portal-mais-sistemas/portal-mais-sistemas";


const OPCOES_COMPLETA = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Muito Bom'];
const OPCOES_REDUZIDA = ['Ruim', 'Regular', 'Bom'];


@Component({
  selector: 'app-home-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PortalDestaques,
    PortalMaisSistemas
],
  templateUrl: './home-portal.html',
  styleUrl: './home-portal.scss'
})
export class HomePortal {

  private portalApi = inject(PortalApi);

  private atalhos = signal<AtalhoSistema[]>([]);

  protected atalhosDestaque = computed(() => this.atalhos().filter(a => a.destaque));
  protected atalhosMaisSistemas = computed(() => this.atalhos().filter(a => !a.destaque));

  protected erroAtalhos = '';


  // ////////////////

  // opcoesAvaliacao = signal(OPCOES_COMPLETA);

  // avaliacao = linkedSignal({
  //   source: this.opcoesAvaliacao,
  //   computation: (opcoes, previo) => {
  //     return opcoes.find(o => o === previo?.value) ?? opcoes[Math.trunc(opcoes.length / 2)];
  //   }
  // });


  // trocarOpcoes(reduzida: boolean) {
  //   if (reduzida)
  //     this.opcoesAvaliacao.set(OPCOES_REDUZIDA);
  //   else
  //     this.opcoesAvaliacao.set(OPCOES_COMPLETA);
  // }


  // ///////////////


  constructor() {
    this.carregarAtalhos();

    effect(() => {
      const qtdMaisSistemas = this.atalhosMaisSistemas().length;

      // untracked(() => {
      //   metodoComplexoEmUmServico(qtdMaisSistemas);
      // });
    });
  }

  protected async carregarAtalhos() {
    this.erroAtalhos = '';

    try {
      this.atalhos.set(await this.portalApi.obterAtalhos());
    }
    catch(error) {
      this.erroAtalhos = 'Algo deu errado. Não foi possível obter os atalhos';
    }

    // this.portalApi.obterAtalhos()
    //   .then((atalhosJson) => {
    //     this.erroAtalhos = '';
    //     this.atalhos = atalhosJson;
    //     this.atualizarListasAtalhos();
    //   })
    //   .catch(() => {
    //     this.erroAtalhos = 'Algo deu errado. Não foi possível obter os atalhos'
    //   });
  }

  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos.update((atalhos) => atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a));
  }

}
