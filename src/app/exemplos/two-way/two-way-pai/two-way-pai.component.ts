import { Component, computed, effect, signal } from '@angular/core';
import { CardComponent } from '../../../layout/card/card.component';
import { TwoWayFilhoComponent } from "../two-way-filho/two-way-filho.component";

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

  protected valorPai = signal(1);

  protected isPar = computed(() => {
    console.log('isPar foi calculado');
    return this.valorPai() % 2 == 0;
  });

  constructor() {
    effect(() => console.log('Effect leu isPar: ', this.isPar()));
    this.valorPai.set(2);
    this.valorPai.set(3);
    this.valorPai.set(4);
  }

}
