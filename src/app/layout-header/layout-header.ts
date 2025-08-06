import { Component } from '@angular/core';

@Component({
  selector: 'header [app-layout-header]',
  imports: [],
  host: {
    '[class.header-gigante]' : 'gigante',
    '(click)' : 'headerClick($event)'
  },
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss'
})
export class LayoutHeader {

  protected titulo = 'Treinamento Angular Conceitos';

  protected logoGradiente = false;

  protected tituloCentralizado = false;

  protected opacidade = 1;

  protected gigante = false;


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
