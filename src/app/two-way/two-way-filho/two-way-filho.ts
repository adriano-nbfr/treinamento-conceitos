import { DecimalPipe } from '@angular/common';
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-two-way-filho',
  imports: [
    DecimalPipe
  ],
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

  /////


  // constructor() {
  //   console.log('Constructor Two-way Filho');

  //   afterEveryRender({
  //     read: () => console.log('AfterEveryRender Two-way Filho')
  //   });

  //   afterNextRender({
  //     read: () => console.log('AfterNextRender Two-way Filho')
  //   });
  // }

  // ngOnInit() {
  //   console.log('OnInit Two-way Filho');
  // }

  // ngOnDestroy() {
  //   console.log('OnDestroy Two-way Filho');
  // }

  // ngOnChanges() {
  //   console.log('OnChanges Two-way Filho');
  // }

  // ngDoCheck() {
  //   console.log('DoCheck Two-way Filho');
  // }

  // ngAfterViewInit() {
  //   console.log('AfterViewInit Two-way Filho');
  // }

  // ngAfterViewChecked() {
  //   console.log('AfterViewChecked Two-way Filho');
  // }

}
