import { Component, contentChild, contentChildren, ElementRef, inject, TemplateRef } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from './portal-mais-sistemas/portal-mais-sistemas';
import { PortalApi } from './portal-api';

@Component({
  selector: 'app-home-portal',
  imports: [
    PortalDestaques,
    PortalMaisSistemas
  ],
  templateUrl: './home-portal.html',
  styleUrl: './home-portal.scss'
})
export class HomePortal {

  private portalApi = inject(PortalApi);

  private atalhos: AtalhoSistema[] = [];

  protected atalhosDestaque: AtalhoSistema[] = [];
  protected atalhosMaisSistemas: AtalhoSistema[] = [];

  protected erroAtalhos = '';

  protected editando = false;

  protected templateContentChild = contentChild(TemplateRef<any>);


  ngOnInit() {
    this.carregarAtalhos();
  }


  protected carregarAtalhos() {
    this.portalApi.obterAtalhos()
      .then((atalhos) => {
        this.atalhos = atalhos;
        this.atualizarListasAtalhos();
      })
      .catch(() => this.erroAtalhos = 'Algo deu errado. Não foi possível obter os atalhos.');
  }


  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos = this.atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a);
    this.atualizarListasAtalhos();
  }

  private atualizarListasAtalhos() {
    this.atalhosDestaque = this.atalhos.filter(a => a.destaque);
    this.atalhosMaisSistemas = this.atalhos.filter(a => !a.destaque);
  }

}
