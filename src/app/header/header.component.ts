import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'header[app-header]',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class' : 'app-header',
    '[class.header-gigante]' : 'gigante',
    '(click)' : 'alternarGigante($event)'
  },
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected imgSrc = 'img/logo-angular-branco.png';

  protected titulo = 'Treinamento Angular';

  protected tituloCentralizado = false;

  protected logoGradiente = false;

  protected opacidadeTitulo = 0.8;

  protected gigante = false;

  protected alternarGradiente(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.logoGradiente = !this.logoGradiente;
  }

  protected alternarGigante(event: MouseEvent) {
    this.gigante = !this.gigante;
  }


}
