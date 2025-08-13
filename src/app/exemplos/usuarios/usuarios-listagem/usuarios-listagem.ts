import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, Subscription, tap } from 'rxjs';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    AsyncPipe,
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

  private subs?: Subscription = undefined;

  protected filtro = new FormControl('');

  protected listagemFiltrada$ = this.filtro.valueChanges.pipe(
    debounceTime(300),
    map(texto => (texto?.length ?? 0) >= 3 ? texto : ''),
    startWith(''),
    distinctUntilChanged(),
    tap(texto => console.log('Filtrando com: ', texto)),
    map(texto => obterItensFiltrados(this.usuarios, texto))
  );


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
