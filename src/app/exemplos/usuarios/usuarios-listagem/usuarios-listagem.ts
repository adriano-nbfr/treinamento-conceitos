import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, Subscription } from 'rxjs';
import { Card } from '../../../shared/card/card';
import { Bloqueado } from '../../../shared/diretivas/bloqueado';
import { Usuario } from '../../../shared/model/usuario';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    RouterLink,
    Card,
    DatePipe,
    Bloqueado,
    ReactiveFormsModule
  ],
  templateUrl: './usuarios-listagem.html',
  styleUrl: './usuarios-listagem.scss'
})
export class UsuariosListagem {

  private usuariosApi = inject(UsuariosApi);

  protected usuarios = signal<Usuario[]>([]);

  protected erro = '';

  protected carregando = false;

  protected numeroPagina = 1;

  protected tamanhoPagina = 5;

  protected totalPaginas = 0;

  private subscriptionUsuarios?: Subscription;

  protected filtro = new FormControl('');

  protected textoFiltro = toSignal(this.filtro.valueChanges.pipe(
    debounceTime(300),
    map((texto) => (texto?.length ?? 0) > 2 ? texto : ''),
    distinctUntilChanged()
  ), {initialValue: ''});

  protected listagemFiltrada = computed(() => {
    return obterItensFiltrados(this.usuarios(), this.textoFiltro());
  });


  ngOnInit() {
    this.carregarUsuarios();
  }

  ngOnDestroy() {
    this.subscriptionUsuarios && this.subscriptionUsuarios.unsubscribe();
  }


  protected carregarUsuarios() {
    this.carregando = true;

    this.usuariosApi.listar(this.numeroPagina, this.tamanhoPagina, 'nome')
      .pipe(
        finalize(() => this.carregando = false)
      ).subscribe({
        next: (pagina) => {
          this.usuarios.set([...pagina.dados]);
          this.numeroPagina = pagina.info?.pagina ?? 1;
          this.totalPaginas = pagina.info?.totalPaginas ?? 1;
          // this.filtro.setValue('');
        },
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

  protected async excluir(usuario: Usuario) {
    if (!confirm(`Confirmar a exclusão de ${usuario.nome} ?`))
      return;

    this.usuariosApi.excluir(usuario.id).subscribe({
      next: () => this.carregarUsuarios(),
      error: (error: Error) => console.log(`Não foi possível excluir o usuário. ${error.message}`)
    });
  }

  protected primeira() {
    this.carregarPagina(1);
  }

  protected anterior() {
    this.carregarPagina(this.numeroPagina - 1)
  }

  protected proxima() {
    this.carregarPagina(this.numeroPagina + 1)
  }

  protected ultima() {
    this.carregarPagina(this.totalPaginas);
  }

  protected alterarTamanhoPagina(n: number) {
    this.tamanhoPagina = n;
    this.carregarPagina(1);
  }

  private carregarPagina(pagina: number) {
    if (pagina > this.totalPaginas || pagina < 1)
      return;

    this.numeroPagina = pagina;
    this.carregarUsuarios();
  }

}
