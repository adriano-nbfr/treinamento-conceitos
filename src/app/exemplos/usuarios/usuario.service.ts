import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);

  private urlApi = '/api/usuarios';

  async carregarUsuariosPromise(abortSignal?: AbortSignal) {
    const res = await fetch(this.urlApi, { signal: abortSignal });
    return await res.json() as Usuario[];
  }

  carregarUsuariosObservable() {
    return this.http.get<Usuario[]>(this.urlApi);
  }

}
