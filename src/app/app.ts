import { Component } from '@angular/core';
import { HomePortal } from './home-portal/home-portal';
import { LayoutHeader } from './layout-header/layout-header';

@Component({
  selector: 'app-root',
  imports: [
    LayoutHeader,
    HomePortal
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
