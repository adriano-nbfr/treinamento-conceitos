import { Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomePortalComponent } from "./home-portal/home-portal.component";
import { TwoWayPaiComponent } from "./exemplos/two-way/two-way-pai/two-way-pai.component";
import { BloqueadoDirective } from './shared/diretivas/bloqueado.directive';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    BloqueadoDirective,
    HomePortalComponent,
    // TwoWayPaiComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  protected bloqueado = false;

  private main = viewChild<ElementRef>('main');

  private header = viewChild(HeaderComponent);

  private botoes = viewChildren<ElementRef>('bot');


  // ngOnInit() {
  //   const main = this.main()?.nativeElement as HTMLElement;
  //   if (main) {
  //     main.classList.add('icones-grandes');
  //   }

  //   const header = this.header();
  //   if (header) {
  //     header.logoGradiente = true;
  //     header.gigante = true;
  //   }

  //   console.log(this.botoes())
  // }

}
