import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, TemplateRef, untracked } from '@angular/core';
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

  // Esse array seria obtido como um JSON de resposta a uma requisição, por exemplo
  private readonly atalhos = signal<AtalhoSistema[]>([]);

  protected readonly atalhosDestaque = computed(() => this.atalhos().filter(a => a.destaque));

  protected readonly atalhosMaisSistemas = computed(() => this.atalhos().filter(a => !a.destaque));


  constructor() {
    effect(() => {
      const lengthMaisSistemas = this.atalhosMaisSistemas().length;
      untracked(() => {
        if (lengthMaisSistemas === 0)
          console.log('Mais sistemas vazios!');
      });
    });
  }


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
