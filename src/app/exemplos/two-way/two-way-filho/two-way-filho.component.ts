import { DecimalPipe } from '@angular/common';
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-two-way-filho',
  imports: [
    DecimalPipe
  ],
  templateUrl: './two-way-filho.component.html',
  styleUrl: './two-way-filho.component.scss'
})
export class TwoWayFilhoComponent {

  /** Valor usado internamente */
  valor = model(0);


  protected incrementar() {
    this.valor.update(v => v + 2);
  }

  protected decrementar() {
    this.valor.update(v => v - 2);
  }

}
