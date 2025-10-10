import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appFiltroHover]',
  host: {
    '(mouseenter)' : 'onMouseEnter($event)',
    '(mouseleave)' : 'onMouseLeave($event)',
  }
})
export class FiltroHover {

  appFiltroHover = input<'sepia' | 'negativo'>('sepia');


  protected onMouseEnter(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.style.filter = this.appFiltroHover() === 'negativo'
      ? 'invert(1)'
      : 'sepia(1)';
  }

  protected onMouseLeave(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.style.filter = '';
  }

}
