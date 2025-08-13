import { Component, inject } from '@angular/core';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';
import { DatePipe } from '@angular/common';
import { Card } from '../../../shared/card/card';
import { finalize, firstValueFrom, Subscription } from 'rxjs';
import { FiltrarPipe } from '../../../shared/pipes/filtrar-pipe';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    DatePipe,
    FiltrarPipe,
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

  protected filtro = '';

  private subs?: Subscription = undefined;


  ngOnInit() {
    this.carregarUsuarios();
  }


  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }


  protected async carregarUsuarios() {
    this.carregando = true;

    // const abortController = new AbortController();

    // firstValueFrom(this.usuariosApi.carregarUsuariosObservable())
    // this.usuariosApi.carregarUsuariosPromise(abortController.signal)
    //   .then(usuarios => this.usuarios = usuarios)
    //   .catch(error => this.erro = `Não foi possível carregar: ${error.message}`)
    //   .finally(() => this.carregando = false);

    // abortController.abort(Error('Cancelado ao sair da tela'));

    const o = this.usuariosApi.carregarUsuariosObservable()
      .pipe(
        finalize(() => this.carregando = false)
      );

    this.subs = o.subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
    });
  }

}
