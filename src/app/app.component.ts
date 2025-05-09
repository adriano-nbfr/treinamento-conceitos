import { Component } from '@angular/core';
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

}
