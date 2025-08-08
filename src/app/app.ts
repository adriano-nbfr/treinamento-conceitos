import { Component } from '@angular/core';
import { TwoWayPai } from './exemplos/two-way/two-way-pai/two-way-pai';
import { HomePortal } from './home-portal/home-portal';
import { LayoutHeader } from './layout-header/layout-header';
import { Bloqueado } from './shared/diretivas/bloqueado';

@Component({
  selector: 'app-root',
  imports: [
    LayoutHeader,
    HomePortal,
    TwoWayPai,
    Bloqueado
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

  protected conteudoBloqueado = false;

  // private elementoMain = viewChild<ElementRef>('appMain');

  // private header = viewChild.required(LayoutHeader);

  // private botoes = viewChildren<ElementRef>('botao');


  // ngOnInit() {
  //   this.elementoMain()?.nativeElement.classList.add('icones-grandes');

  //   const header = this.header();
  //   if (header) {
  //     header.gigante = true;
  //     header.tituloCentralizado = true;
  //   }

  //   console.log(this.botoes().map(b => b.nativeElement.innerText));

  // }

}
