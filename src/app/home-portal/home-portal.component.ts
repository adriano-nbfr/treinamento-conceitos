import { Component, inject, input, TemplateRef } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalDestaquesComponent } from "./portal-destaques/portal-destaques.component";
import { PortalMaisSistemasComponent } from './portal-mais-sistemas/portal-mais-sistemas.component';
import { OrdenarPipe } from '../shared/pipes/ordenar.pipe';
import { HomePortalService } from './home-portal.service';

@Component({
  selector: 'app-home-portal',
  imports: [
    PortalDestaquesComponent,
    PortalMaisSistemasComponent,
    OrdenarPipe
  ],
  templateUrl: './home-portal.component.html',
  styleUrl: './home-portal.component.scss'
})
export class HomePortalComponent {

  /** Um template para customizar o conteúdo dos links na seção "Mais Sistemas".
   * O contexto contém um atributo 'atalho' do tipo `AtalhoSistema`, com dados para montar o link. */
  templateLinkMaisSistemas = input<TemplateRef<unknown>>();

  private portalService = inject(HomePortalService);

  // Esse array seria obtido como um JSON de resposta a uma requisição, por exemplo
  private atalhos: AtalhoSistema[] = [];
  protected atalhosDestaque: AtalhoSistema[] = [];
  protected atalhosMaisSistemas: AtalhoSistema[] = [];


  ngOnInit() {
    this.carregarAtalhos();
  }

  protected carregarAtalhos() {
    this.portalService.carregarAtalhos()
      .then((atalhos) => {
        this.atalhos = atalhos;
        this.atualizarListasAtalhos();
      });
  }

  protected promoverAtalhoMaisSistemas(atalho: AtalhoSistema) {
    this.atalhos = this.atalhos.map(a => a.url === atalho.url ? {...a, destaque: true} : a);
    this.atualizarListasAtalhos();
  }


  private atualizarListasAtalhos() {
    this.atalhosDestaque = this.atalhos.filter(a => a.destaque);
    this.atalhosMaisSistemas = this.atalhos.filter(a => !a.destaque);
  }

}
