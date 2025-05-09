import { Component } from '@angular/core';
import { TwoWayFilhoComponent } from "../two-way-filho/two-way-filho.component";
import { CardComponent } from '../../../layout/card/card.component';

@Component({
  selector: 'app-two-way-pai',
  imports: [
    CardComponent,
    TwoWayFilhoComponent
  ],
  templateUrl: './two-way-pai.component.html',
  styleUrl: './two-way-pai.component.scss'
})
export class TwoWayPaiComponent {

  protected valorPai = 5;

}
