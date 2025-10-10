import { Component, ViewEncapsulation } from '@angular/core';
import { HomePortal } from "./home-portal/home-portal";
import { LayoutHeader } from "./layout-header/layout-header";
import { TwoWayPai } from "./two-way/two-way-pai/two-way-pai";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    HomePortal,
    LayoutHeader,
    TwoWayPai
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

}
