import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { finalize, firstValueFrom, Subscription } from 'rxjs';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';

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

  private subscriptionUsuarios?: Subscription;


  ngOnInit() {
    this.carregarUsuarios();
  }

  ngOnDestroy() {
    this.subscriptionUsuarios && this.subscriptionUsuarios.unsubscribe();
  }


  protected carregarUsuarios() {
    this.carregando = true;

    const obs = this.usuariosApi.carregarUsuariosObservable()
      .pipe(
        finalize(() => this.carregando = false)
      );

    this.subscriptionUsuarios = obs.subscribe({
      next: (usuarios) => this.usuarios = usuarios,
      error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`,
    });

    // firstValueFrom(obs)
    //   .then(usuarios => this.usuarios = usuarios)
    //   .catch(error => this.erro = `Não foi possível carregar: ${error.message}`)
    //   .finally(() => this.carregando = false);

    // const abortController = new AbortController();

    // this.usuariosApi.carregarUsuariosPromise()
    //   .then(usuarios => this.usuarios = usuarios)
    //   .catch(error => this.erro = `Não foi possível carregar: ${error.message}`)
    //   .finally(() => this.carregando = false);

    // abortController.abort(new Error('Cancelado ao sair da tela'));
  }

}
