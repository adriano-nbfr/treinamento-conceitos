import { Component } from '@angular/core';
import { TwoWayFilho } from "../two-way-filho/two-way-filho";

@Component({
  selector: 'app-two-way-pai',
  imports: [
    TwoWayFilho
  ],
  templateUrl: './two-way-pai.html',
  styleUrl: './two-way-pai.scss'
})
export class TwoWayPai {

  protected valorPai = 5;

}
