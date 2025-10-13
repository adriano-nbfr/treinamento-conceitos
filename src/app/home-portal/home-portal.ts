import { Component, inject } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalDestaques } from "./portal-destaques/portal-destaques";
import { PortalMaisSistemas } from "./portal-mais-sistemas/portal-mais-sistemas";
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


  constructor() {
    this.carregarAtalhos();
  }

  protected async carregarAtalhos() {
    this.erroAtalhos = '';

    try {
      this.atalhos = await this.portalApi.obterAtalhos();
      this.atualizarListasAtalhos();
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

  private atualizarListasAtalhos() {
    this.atalhosDestaque = this.atalhos.filter(a => a.destaque);
    this.atalhosMaisSistemas = this.atalhos.filter(a => !a.destaque);
  }

  protected alterarDestaqueAtalho(atalho: AtalhoSistema, destaque: boolean) {
    this.atalhos = this.atalhos.map(a => a.url === atalho.url ? {...a, destaque} : a);
    this.atualizarListasAtalhos();
  }

}
