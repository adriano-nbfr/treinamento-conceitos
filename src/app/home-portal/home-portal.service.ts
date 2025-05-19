import { Injectable } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';

@Injectable({
  providedIn: 'root'
})
export class HomePortalService {

  private urlAtalhosJson = './json/atalhos-portal.json';

  async carregarAtalhos(): Promise<AtalhoSistema[]> {
    try {
      const res = await fetch(this.urlAtalhosJson);
      return await res.json();
    }
    catch {
      throw new Error('Não foi possível obter os atalhos');
    }
  }

}
