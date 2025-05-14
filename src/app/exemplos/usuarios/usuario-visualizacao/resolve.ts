import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveData } from "@angular/router";
import { UsuarioService } from "../usuario.service";

export const resolveUsuario: ResolveData = (activeRoute: ActivatedRouteSnapshot) => {
  // tratar direito e notificar (toaster ou popup) falha no carregamento!!
  return inject(UsuarioService).obter(activeRoute.params['idUsuario']);
}
