import { computed, Directive, input, model } from '@angular/core';

@Directive({
  selector: '[appBloqueado]',
  exportAs: 'appBloqueado',
  host: {
    '[attr.inert]' : 'appBloqueado() ? "" : undefined',
    '[style]' : 'styleHost()',
  }
})
export class BloqueadoDirective {

  /** Determina se o elemento associado e seu conteúdo aparece bloqueado para interação. */
  appBloqueado = model.required<boolean>();

  /** Determina se um efeito de desfoque também será aplicado ao conteúdo bloqueado. (default = false) */
  desfoque = input(false);


  protected styleHost = computed(() => {
    if (!this.appBloqueado())
      return undefined;

    return `
      cursor: default;
      pointer-events: none;
      user-select: none;
      opacity: 0.8;
      ${this.desfoque() ? 'filter: blur(1px);' : ''}
      `;
  });


  desbloquear() {
    this.appBloqueado.set(false);
  }

}
