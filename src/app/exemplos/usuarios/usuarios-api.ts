import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApi {

  private http = inject(HttpClient);

  private urlApi = '/api/zusuarios';

  async carregarUsuariosPromise() {
    try {
      const res = await fetch(this.urlApi);

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

}
