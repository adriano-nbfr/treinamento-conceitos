import { Injectable } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';

@Injectable({
  providedIn: 'root'
})
export class PortalApi {

  private urlAtalhosJson = './json/atalhos-portal.json';

  async obterAtalhos() {
    try {
      const res = await fetch(this.urlAtalhosJson);
      return await res.json() as AtalhoSistema[];
    }
    catch(error: any) {
      throw Error(`Não foi possível carregar os atalhos: [${error.message}]`);
    }
  }

}
