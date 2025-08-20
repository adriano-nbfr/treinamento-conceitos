import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, signal, TemplateRef } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalApi } from './portal-api';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from './portal-mais-sistemas/portal-mais-sistemas';

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

  protected editando = false;

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
    this.carregarAtalhos();
  }


  protected carregarAtalhos() {
    this.portalApi.obterAtalhos()
      .then((atalhos) => {
        this.atalhos.set(atalhos);
      })
      .catch(() => this.erroAtalhos = 'Algo deu errado. Não foi possível obter os atalhos.');
  }


  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos.update(atalhos => atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a));
  }

}
