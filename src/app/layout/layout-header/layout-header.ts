import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

/** O componente que exibe o header da aplicação */
@Component({
  selector: 'header [app-layout-header]',
  imports: [
    DatePipe
  ],
  host: {
    '[class.header-gigante]' : 'gigante',
    '(click)' : 'headerClick($event)'
  },
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss'
})
export class LayoutHeader {

  /** O título que será exibido no header da aplicação */
  titulo = input('Treinamento Angular');

  protected logoGradiente = false;

  tituloCentralizado = false;

  protected opacidade = 1;

  gigante = false;

  protected hoje = new Date();


  protected headerClick(event: MouseEvent) {
    if (event.ctrlKey) {
      this.gigante = !this.gigante;
    }
  }

  protected logoClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.logoGradiente = !this.logoGradiente;
  }

}
