import { Component } from '@angular/core';
import { HomePortalComponent } from "./home-portal/home-portal.component";
import { LayoutComponent } from './layout/layout.component';
import { TwoWayPaiComponent } from "./exemplos/two-way/two-way-pai/two-way-pai.component";

@Component({
  selector: 'app-root',
  imports: [
    LayoutComponent,
    //HomePortalComponent,
    TwoWayPaiComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
