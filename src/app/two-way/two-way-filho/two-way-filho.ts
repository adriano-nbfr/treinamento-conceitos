import { Component, model } from '@angular/core';

@Component({
  selector: 'app-two-way-filho',
  imports: [],
  templateUrl: './two-way-filho.html',
  styleUrl: './two-way-filho.scss'
})
export class TwoWayFilho  {

  valor = model(0);

  protected incrementar() {
    this.valor.update(v => v + 1);
  }

  protected decrementar() {
    this.valor.update(v => v - 1);
  }

}
