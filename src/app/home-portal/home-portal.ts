import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalApi } from './portal-api';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from "./portal-mais-sistemas/portal-mais-sistemas";


// const OPCOES_COMPLETA = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Muito Bom'];
// const OPCOES_REDUZIDA = ['Ruim', 'Regular', 'Bom'];


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

  protected atalhos = this.portalApi.obterAtalhosComoHttpResource();

  protected atalhosDestaque = computed(() => this.atalhos.value().filter(a => a.destaque));
  protected atalhosMaisSistemas = computed(() => this.atalhos.value().filter(a => !a.destaque));


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
    // this.carregarAtalhos();

    // effect(() => {
    //   const qtdMaisSistemas = this.atalhosMaisSistemas().length;

    //   // untracked(() => {
    //   //   metodoComplexoEmUmServico(qtdMaisSistemas);
    //   // });
    // });
  }

  // protected async carregarAtalhos() {
  //   resolverDadoAssincrono(this.portalApi.obterAtalhos(), this.atalhos, []);
  // }

  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos.value.update((atalhos) => atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a));
  }


  recarregar() {
    this.atalhos.reload();
  }

}
