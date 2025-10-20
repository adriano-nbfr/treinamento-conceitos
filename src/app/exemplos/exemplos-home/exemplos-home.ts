import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exemplos-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ],
  templateUrl: './exemplos-home.html',
  styleUrl: './exemplos-home.scss'
})
export class ExemplosHome {

}
