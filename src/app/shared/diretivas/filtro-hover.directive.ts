import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appFiltroHover]',
  host: {
    '(mouseenter)' : 'hostMouseEnter($event.target)',
    '(mouseleave)' : 'hostMouseLeave($event.target)',
  }
})
export class FiltroHoverDirective {

  /** Um filtro a ser aplicado quando o cursor estiver sobre o elemento associado. (default = 'inverter') */
  appFiltroHover = input<'inverter' | 'dessaturar'>('inverter');


  protected hostMouseEnter(target: HTMLElement) {
    target.style.filter = this.appFiltroHover() === 'inverter'
      ? 'invert(1)'
      : 'saturate(0.2)';
  }

  protected hostMouseLeave(target: HTMLElement) {
    target.style.filter = '';
  }

}
