import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { of } from "rxjs";
import { Usuario } from "../../shared/model/usuario";
import { UsuarioService } from "./usuario.service";

export const usuarioResolve = (route: ActivatedRouteSnapshot) =>
  inject(UsuarioService).obter(route.params['idUsuario']);

export const usuarioEdicaoResolve = (route: ActivatedRouteSnapshot) => {
  const id = route.params['idUsuario'];
  if (id === 'novo')
    return of({} as Usuario);

  return inject(UsuarioService).obter(id);
}