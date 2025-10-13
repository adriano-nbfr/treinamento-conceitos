import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApi {

  private urlApi = '/api/usuarios';

  async carregarUsuariosPromise() {
    const res = await fetch(this.urlApi);
    return await res.json() as Usuario[]; // fetch não é tipada
  }

}
