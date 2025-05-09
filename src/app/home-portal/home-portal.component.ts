import { Component } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { PortalDestaquesComponent } from "./portal-destaques/portal-destaques.component";
import { PortalMaisSistemasComponent } from './portal-mais-sistemas/portal-mais-sistemas.component';
import { OrdenarPipe } from '../shared/pipes/ordenar.pipe';

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

  // Esse array seria obtido como um JSON de resposta a uma requisição, por exemplo
  private atalhos: AtalhoSistema[] = [
    { url: 'https://novoportal.mpf.mp.br/novaintra', nome: 'Intranet', icone: 'Intranet-MPF.jpg', destaque: true },
    { url: 'https://pontodigital.mpf.mp.br/pontodigital', nome: 'Ponto Digital', icone: 'PontoDigital.jpg', destaque: true },
    { url: 'https://unico.mpf.mp.br/unico', nome: 'Único', icone: 'Unico.jpg', destaque: true },
    { url: 'https://novoportal.mpf.mp.br/snp', nome: 'SNP', icone: 'SNP.jpg', destaque: true },
    { url: 'https://novoportal.mpf.mp.br/kairos', nome: 'Kairos', icone: 'Kairos.jpg', destaque: true },
    { url: 'https://horus.mpf.mp.br/horus', nome: 'Hórus', icone: 'Horus.jpg', destaque: true },
    { url: 'https://mail.google.com/a/mpf.mp.br', nome: 'Correio Eletrônico', icone: 'Correio.jpg', destaque: true },
    { url: 'https://novoportal.mpf.mp.br/biblioteca', nome: 'Biblioteca', icone: 'Biblioteca.jpg', destaque: true },
    { url: 'https://novoportal.mpf.mp.br/apex/f?p=pin', nome: 'PIN', destaque: false },
    { url: 'https://novoportal.mpf.mp.br/apex/f?p=sigov', nome: 'SIGOV', destaque: false },
    { url: 'https://radar.mpf.mp.br/radar2', nome: 'RADAR', destaque: false },
    { url: 'https://novoportal.mpf.mp.br/sisam/portal', nome: 'SISAM', destaque: false },
    { url: 'https://novoportal.mpf.mp.br/extractus', nome: 'Extractus', destaque: false },
    { url: 'https://novoportal.mpf.mp.br/sspr', nome: 'Portal de Senhas', destaque: false },
    { url: 'https://novoportal.mpf.mp.br/autoriza', nome: 'Sistema Autoriza', destaque: false },
  ];


  protected atalhosDestaque: AtalhoSistema[] = [];
  protected atalhosMaisSistemas: AtalhoSistema[] = [];

  constructor() {
    this.atualizarListasAtalhos();
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
