import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { catchError, throwError } from 'rxjs';
import { RAIZ_API } from '../../shared/providers/raiz-api';

@Injectable()
export class UsuarioService {

  private http = inject(HttpClient);

  private raizApi = inject(RAIZ_API);

  private urlApi = `${this.raizApi}/usuarios`;

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


}
