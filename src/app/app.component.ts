import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomePortalComponent } from "./home-portal/home-portal.component";
import { TwoWayPaiComponent } from "./exemplos/two-way/two-way-pai/two-way-pai.component";

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HomePortalComponent,
    // TwoWayPaiComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
