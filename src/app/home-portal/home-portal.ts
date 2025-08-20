import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, signal, TemplateRef } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalApi } from './portal-api';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from './portal-mais-sistemas/portal-mais-sistemas';
import { dadoAssincrono, resolverDadoAssincrono } from '../shared/dado-assincrono';

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

  protected atalhos = dadoAssincrono<AtalhoSistema[]>([]);

  protected atalhosDestaque = computed(() => this.atalhos.valor().filter(a => a.destaque));

  protected atalhosMaisSistemas = computed(() => this.atalhos.valor().filter(a => !a.destaque));

  protected editando = signal(false);

  protected templateContentChild = contentChild(TemplateRef<any>);


  constructor() {
    effect(() => {
      const qtdMaisSistemas = this.atalhosMaisSistemas().length;
      console.log(qtdMaisSistemas);
      // untracked(() => {
      //   umaFuncaoComplexaEmOutroService(qtdMaisSistemas);
      // });
    });
  }


  ngOnInit() {
    resolverDadoAssincrono(this.portalApi.obterAtalhos(), this.atalhos, []);
  }

  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos.valor.update(atalhos => atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a));
  }

}
