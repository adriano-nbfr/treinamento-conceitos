import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalApi {

  private urlAtalhosJson = './json/atalhos-portal.json';

  async obterAtalhos() {
    const res = await fetch(this.urlAtalhosJson);
    return await res.json();
  }

}
