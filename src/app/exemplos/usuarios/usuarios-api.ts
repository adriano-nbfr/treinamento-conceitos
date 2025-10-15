import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Usuario } from '../../shared/model/usuario';
import { RAIZ_API } from '../../shared/providers/raiz-api';
import { erroResponseTratado } from '../../shared/rest/erro-response';
import { EstrategiaPaginacao, OrdenacaoDados } from '../../shared/rest/estrategia-paginacao';

@Injectable()
export class UsuariosApi {

  private http = inject(HttpClient);

  private estrategia: EstrategiaPaginacao<Usuario> = inject(EstrategiaPaginacao);

  // private estrategia: EstrategiaPaginacao<Usuario> =
  //   inject(EstrategiaPaginacao, {optional: true}) ??
  //   new EstrategiaPaginacaoJsonServer();

  private raizApi = inject(RAIZ_API);

  private urlApi = `${this.raizApi}/usuarios`;

  async carregarUsuariosPromise(abortSignal?: AbortSignal) {
    try {
      const res = await fetch(this.urlApi, { signal: abortSignal });

      if (!res.ok)
        throw new Error(`Erro ao obter os dados. [Status: ${res.status}]`);

      return await res.json() as Usuario[]; // fetch não é tipada
    }
    catch (error: any) {
      if (error instanceof TypeError)
        throw Error(`Não houve resposta de ${this.urlApi}.`);

      throw error;
    }
  }

  carregarUsuariosObservable() {
    return this.http.get<Usuario[]>(this.urlApi)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const msg = error.status === 0
            ? `Não houve resposta de ${this.urlApi}.`
            : `Erro ao obter os dados. [Status: ${error.status}]`;

          return throwError(() => Error(msg));
        })
      );
  }

  listar(pagina?: number, tamanhoPagina?: number, ordenacao?: OrdenacaoDados) {
    // Delega para a estratégia a montagem dos parâmetros de paginação da forma adequada
    const params = this.estrategia.montarParametrosRequest(pagina, tamanhoPagina, ordenacao);

    // Delega para a estratégia a obtenção dos dados e metadados da página a partir da resposta
    return this.http.get(this.urlApi, {params}).pipe(
      map(res => this.estrategia.montarPaginaResultado(res)),
      catchError(erroResponseTratado)
    );
  }

}
