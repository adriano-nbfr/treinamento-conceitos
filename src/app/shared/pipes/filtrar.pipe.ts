import { Pipe, PipeTransform } from '@angular/core';
import { obterItensFiltrados } from './filtragem';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe<T> implements PipeTransform {

  transform(itens: T[], texto?: string | null) {
    return obterItensFiltrados(itens, texto ?? '');
  }

}
