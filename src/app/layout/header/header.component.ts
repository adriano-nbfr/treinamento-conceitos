import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header[app-header]',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class' : 'app-header',
    '[class.header-gigante]' : 'gigante',
    '(click)' : 'headerClick($event)'
  },
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected imgSrc = 'img/logo-angular-branco.png';

  protected titulo = 'Treinamento Angular';

  protected tituloCentralizado = false;

  logoGradiente = false;

  protected opacidadeTitulo = 0.8;

  gigante = false;

  protected logoCkick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation(); // evita o bubbling
    this.logoGradiente = !this.logoGradiente;
  }

  protected headerClick(event: MouseEvent) {
    if (event.ctrlKey) { // Só alterna se clicar segurando Ctrl
      this.gigante = !this.gigante;
    }
  }

}
