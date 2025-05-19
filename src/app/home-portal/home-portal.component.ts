import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, signal, TemplateRef } from '@angular/core';
import { OrdenarPipe } from '../shared/pipes/ordenar.pipe';
import { AtalhoSistema } from './atalho-sistema';
import { HomePortalService } from './home-portal.service';
import { PortalDestaquesComponent } from "./portal-destaques/portal-destaques.component";
import { PortalMaisSistemasComponent } from './portal-mais-sistemas/portal-mais-sistemas.component';

@Component({
  selector: 'app-home-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private changeDectector = inject(ChangeDetectorRef);

  // Esse array seria obtido como um JSON de resposta a uma requisição, por exemplo
  private atalhos = signal<AtalhoSistema[]>([]);

  protected atalhosDestaque = computed(() => this.atalhos().filter(a => a.destaque));

  protected atalhosMaisSistemas = computed(() => this.atalhos().filter(a => !a.destaque));


  ngOnInit() {
    this.carregarAtalhos();
  }

  protected carregarAtalhos() {
    this.portalService.carregarAtalhos()
      .then((atalhos) => {
        this.atalhos.set(atalhos);
      });
  }

  protected promoverAtalhoMaisSistemas(atalho: AtalhoSistema) {
    this.atalhos.update(itens => itens.map(a => a.url === atalho.url ? {...a, destaque: true} : a));
  }

}
