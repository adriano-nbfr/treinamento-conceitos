import { Component } from '@angular/core';
import { HomePortal } from './home-portal/home-portal';
import { LayoutHeader } from './layout-header/layout-header';
import { TwoWayPai } from './exemplos/two-way/two-way-pai/two-way-pai';

@Component({
  selector: 'app-root',
  imports: [
    LayoutHeader,
    HomePortal,
    TwoWayPai
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'two-way';

}
