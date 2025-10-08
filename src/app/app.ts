import { Component, ViewEncapsulation } from '@angular/core';
import { HomePortal } from "./home-portal/home-portal";
import { LayoutHeader } from "./layout-header/layout-header";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    HomePortal,
    LayoutHeader
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
