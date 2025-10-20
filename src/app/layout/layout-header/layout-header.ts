import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'header[app-layout-header]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe
  ],
  host: {
    'class' : 'app-header',
    '[class.header-gigante]' : 'gigante()',
    '(click)' : 'headerClick($event)'
  },
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss'
})
export class LayoutHeader {

  titulo = input('Treinamento Angular');

  protected logoGradiente = signal(false);

  protected tituloCentralizado = signal(false);

  protected opacidadeTitulo = signal(1);

  gigante = signal(false);

  protected hoje = new Date();


  protected headerClick(event: MouseEvent) {
    if (event.ctrlKey) {
      this.gigante.set(!this.gigante());
    }
  }

  protected logoClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.logoGradiente.set(!this.logoGradiente());
  }


  ///////

  // constructor() {
  //   console.log('Constructor Header');

  //   afterEveryRender({
  //     read: () => console.log('AfterEveryRender Header')
  //   });

  //   afterNextRender({
  //     read: () => console.log('AfterNextRender Header')
  //   });
  // }

  // ngOnInit() {
  //   console.log('OnInit Header');
  // }

  // ngOnChanges() {
  //   console.log('OnChanges Header');
  // }

  // ngDoCheck() {
  //   console.log('DoCheck Header');
  // }

  // ngAfterViewInit() {
  //   console.log('AfterViewInit Header');
  // }

  // ngAfterViewChecked() {
  //   console.log('AfterViewChecked Header');
  // }

}
