import { Component, ViewEncapsulation } from '@angular/core';
import { HomePortal } from "./home-portal/home-portal";
import { Layout } from './layout/layout';
import { TwoWayPai } from "./two-way/two-way-pai/two-way-pai";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    HomePortal,
    TwoWayPai,
    Layout
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected tela: 'home' | 'two-way' = 'home';

}
