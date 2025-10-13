import { Component, inject } from '@angular/core';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';
import { Card } from '../../../shared/card/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    Card,
    DatePipe
  ],
  templateUrl: './usuarios-listagem.html',
  styleUrl: './usuarios-listagem.scss'
})
export class UsuariosListagem {

  private usuariosApi = inject(UsuariosApi);

  protected usuarios: Usuario[] = [];

  protected erro = '';

  protected carregando = false;


  ngOnInit() {
    this.carregarUsuarios();
  }

  protected carregarUsuarios() {
    this.carregando = true;
    this.usuariosApi.carregarUsuariosPromise()
      .then(usuarios => this.usuarios = usuarios)
      .catch(error => this.erro = `Não foi possível carregar: ${error.message}`)
      .finally(() => this.carregando = false);
  }

}
