import { Component, ViewEncapsulation } from '@angular/core';
import { HomePortal } from "./home-portal/home-portal";
import { LayoutHeader } from "./layout-header/layout-header";
import { Bloqueado } from './shared/diretivas/bloqueado';
import { TwoWayPai } from "./two-way/two-way-pai/two-way-pai";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    HomePortal,
    LayoutHeader,
    TwoWayPai,
    Bloqueado
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

  protected conteudoBloqueado = false;

  // private appMain = viewChild<ElementRef>('appMain');

  // private bloqueado = viewChild(Bloqueado);

  // private appHeader = viewChild(LayoutHeader);


  // ngOnInit() {
  //   const main = this.appMain()?.nativeElement as HTMLElement;

  //   if (main) {
  //     main.classList.add('icones-grandes');
  //   }

  //   setTimeout(() => {
  //     this.bloqueado()?.appBloqueado.set(true);
  //   });

  //   const header = this.appHeader();

  //   if (header) {
  //     header.gigante = true;
  //   }
  // }

}
