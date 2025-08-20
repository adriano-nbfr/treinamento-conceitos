import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { TwoWayFilho } from '../two-way-filho/two-way-filho';

@Component({
  selector: 'app-two-way-pai',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Card,
    TwoWayFilho
  ],
  templateUrl: './two-way-pai.html',
  styleUrl: './two-way-pai.scss'
})
export class TwoWayPai {

  protected valorPai = signal(1);

  protected isPar = computed(() => {
    console.log('isPar calculado');
    return this.valorPai() % 2 == 0;
  });

  constructor() {
    this.valorPai.set(2);
    this.valorPai.set(3);
    this.valorPai.set(4);

    // effect(() => console.log('Effect leu valorPai: ', this.valorPai()));
    effect(() => console.log('Effect leu isPar: ', this.isPar()));
  }

}
