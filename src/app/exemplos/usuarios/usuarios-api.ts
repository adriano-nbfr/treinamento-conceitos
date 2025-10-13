import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApi {

  private http = inject(HttpClient);

  private urlApi = '/api/usuarios';

  async carregarUsuariosPromise() {
    const res = await fetch(this.urlApi);
    return await res.json() as Usuario[]; // fetch não é tipada
  }

  carregarUsuariosObservable() {
    return this.http.get<Usuario[]>(this.urlApi);
  }

}
