import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe<T extends object> implements PipeTransform {

  transform(itens: readonly T[], atributo: keyof T): readonly T[] {
    if (itens.length === 0)
      return itens;

    return [...itens]
      .sort((a, b) => a[atributo] > b[atributo] ? 1 : a[atributo] < b[atributo] ? - 1 : 0);
  }

}
