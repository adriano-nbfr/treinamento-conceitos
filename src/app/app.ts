import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Layout
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
