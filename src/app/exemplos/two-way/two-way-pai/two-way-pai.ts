import { Component, computed, effect, signal } from '@angular/core';
import { TwoWayFilho } from "../two-way-filho/two-way-filho";
import { Card } from '../../../shared/card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-two-way-pai',
  imports: [
    RouterLink,
    Card,
    TwoWayFilho
  ],
  templateUrl: './two-way-pai.html',
  styleUrl: './two-way-pai.scss'
})
export class TwoWayPai {

  protected valorPai = signal(5);

  protected isPar = computed(() => {
    console.log('isPar calculado');
    return this.valorPai() % 2 == 0;
  });


  constructor() {
    this.valorPai.set(2);
    this.valorPai.set(3);
    this.valorPai.set(4);

    effect(() => console.log('Effect leu isPar: ', this.isPar()));
  }

}
