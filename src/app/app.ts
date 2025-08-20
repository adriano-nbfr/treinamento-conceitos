import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Layout } from './layout/layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
