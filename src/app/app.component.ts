import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomePortalComponent } from "./home-portal/home-portal.component";

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HomePortalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
