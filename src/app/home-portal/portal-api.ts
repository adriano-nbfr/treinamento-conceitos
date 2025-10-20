import { Injectable, resource } from '@angular/core';
import { AtalhoSistema } from './atalho-sistema';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortalApi {

  private urlAtalhosJson = './json/atalhos-portal.json';

  async obterAtalhos() {
    const res = await fetch(this.urlAtalhosJson);
    return await res.json();
  }


  obterAtalhosComoResource() {
    return resource<AtalhoSistema[], unknown>({
      loader: () => this.obterAtalhos(),
      defaultValue: []
    })
  }


  obterAtalhosComoHttpResource() {
    return httpResource<AtalhoSistema[]>(
      () => this.urlAtalhosJson,
      { defaultValue: [] }
    );
  }

}
