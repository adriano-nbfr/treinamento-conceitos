import { Component } from '@angular/core';
import { TwoWayPai } from './exemplos/two-way/two-way-pai/two-way-pai';
import { HomePortal } from './home-portal/home-portal';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [
    Layout,
    HomePortal,
    TwoWayPai
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

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
