import { Component, inject } from '@angular/core';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';
import { DatePipe } from '@angular/common';
import { Card } from '../../../shared/card/card';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    DatePipe,
    Card
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

  protected async carregarUsuarios() {
    this.carregando = true;

    // this.usuariosApi.carregarUsuariosPromise()
    //   .then(usuarios => this.usuarios = usuarios)
    //   .catch(error => this.erro = `Não foi possível carregar: ${error.message}`)
    //   .finally(() => this.carregando = false);

    this.usuariosApi.carregarUsuariosObservable()
      .pipe(
        finalize(() => this.carregando = false)
      )
      .subscribe({
        next: (usuarios) => this.usuarios = usuarios,
        error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
      });
  }

}
