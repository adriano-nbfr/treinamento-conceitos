import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalApi } from './portal-api';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from "./portal-mais-sistemas/portal-mais-sistemas";

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


  // constructor() {
  //   this.carregarAtalhos();

  //   // effect(() => {
  //   //   const qtdMaisSistemas = this.atalhosMaisSistemas().length;

  //   //   // untracked(() => {
  //   //   //   metodoComplexoEmUmServico(qtdMaisSistemas);
  //   //   // });
  //   // });
  // }

  // protected async carregarAtalhos() {
  //   resolverDadoAssincrono(this.portalApi.obterAtalhos(), this.atalhos, []);
  // }

  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos.value.update((atalhos) => atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a));
  }


  protected recarregar() {
    this.atalhos.reload(); // um resource permite executar posteriormente sua função loader.
  }

}
