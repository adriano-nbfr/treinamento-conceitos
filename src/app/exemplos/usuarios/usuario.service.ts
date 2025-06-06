import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Usuario } from '../../shared/model/usuario';
import { RAIZ_API } from '../../shared/providers/raiz-api';
import { erroResponseTratado } from '../../shared/rest/erro-response';
import { EstrategiaPaginacao, OrdenacaoDados } from '../../shared/rest/estrategia-paginacao';

@Injectable()
export class UsuarioService {

  private http = inject(HttpClient);

  private raizApi = inject(RAIZ_API);

  private estrategia: EstrategiaPaginacao<Usuario> = inject(EstrategiaPaginacao);

  private urlApi = `${this.raizApi}/usuarios`;


  listar(pagina?: number, tamanhoPagina?: number, ordenacao?: OrdenacaoDados) {
    const params = this.estrategia
      .montarParametrosRequest(pagina, tamanhoPagina, ordenacao);

    return this.http.get(this.urlApi, {params}).pipe(
      map(res => this.estrategia.montarPaginaResultado(res))
    );
  }


  async carregarUsuariosPromise(abortSignal?: AbortSignal) {
    try {
      const res = await fetch(this.urlApi, { signal: abortSignal });

      if (!res.ok)
        throw new Error(`Não foi possível obter os dados. [Status: ${res.status}]`);

      return await res.json() as Usuario[];
    }
    catch (error: any) {
      if (error instanceof TypeError)
        throw Error(`O destino ${this.urlApi} não pode ser alcançado. Verifique sua conexão.`);

      throw error;
    }
  }

  carregarUsuariosObservable() {
    return this.http.get<Usuario[]>(this.urlApi)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => Error(`Não foi possível obter os dados. [Status: ${error.status}]`));
        })
      );
  }

  obter(id: string) {
    return this.http.get<Usuario>(`${this.urlApi}/${id}`)
      .pipe(catchError(erroResponseTratado));
  }

  incluir(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.urlApi}`, usuario)
      .pipe(catchError(erroResponseTratado));
  }

  alterar(usuario: Usuario, id?: string) {
    const idUsuario = id ?? usuario.id;
    const url = idUsuario ? `${this.urlApi}/${idUsuario}` : this.urlApi;
    return this.http.put<Usuario>(url, usuario)
      .pipe(catchError(erroResponseTratado));
  }

  excluir(id: string) {
    return this.http.delete(`${this.urlApi}/${id}`)
      .pipe(catchError(erroResponseTratado));
  }

}
