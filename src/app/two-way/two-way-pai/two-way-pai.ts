import { Component } from '@angular/core';
import { TwoWayFilho } from "../two-way-filho/two-way-filho";
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-two-way-pai',
  imports: [
    Card,
    TwoWayFilho
  ],
  templateUrl: './two-way-pai.html',
  styleUrl: './two-way-pai.scss'
})
export class TwoWayPai {

  protected valorPai = 5;

}
