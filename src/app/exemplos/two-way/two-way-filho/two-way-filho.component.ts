import { Component } from '@angular/core';

@Component({
  selector: 'app-two-way-filho',
  imports: [],
  templateUrl: './two-way-filho.component.html',
  styleUrl: './two-way-filho.component.scss'
})
export class TwoWayFilhoComponent {

  protected valorInterno = 0;


  protected incrementar() {
    this.valorInterno++;
  }

  protected decrementar() {
    this.valorInterno--;
  }

}
