import { Component } from '@angular/core';
import { TwoWayFilhoComponent } from "../two-way-filho/two-way-filho.component";

@Component({
  selector: 'app-two-way-pai',
  imports: [TwoWayFilhoComponent],
  templateUrl: './two-way-pai.component.html',
  styleUrl: './two-way-pai.component.scss'
})
export class TwoWayPaiComponent {

  protected valorPai = 5;

}
