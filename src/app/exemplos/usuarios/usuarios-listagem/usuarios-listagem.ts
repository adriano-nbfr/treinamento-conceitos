import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { Card } from '../../../shared/card/card';
import { Bloqueado } from '../../../shared/diretivas/bloqueado';
import { Usuario } from '../../../shared/model/usuario';
import { FiltrarPipe } from '../../../shared/pipes/filtrar-pipe';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatePipe,
    FiltrarPipe,
    Bloqueado,
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

  protected numeroPagina = 1;

  protected tamanhoPagina = 5;

  protected totalPaginas = 0;

  private subs?: Subscription = undefined;

  protected filtro = new FormControl('');

  // protected listagemFiltrada$ = this.filtro.valueChanges.pipe(
  //   debounceTime(300),
  //   map(texto => (texto?.length ?? 0) >= 3 ? texto : ''),
  //   startWith(''),
  //   distinctUntilChanged(),
  //   tap(texto => console.log('Filtrando com: ', texto)),
  //   map(texto => obterItensFiltrados(this.usuarios, texto))
  // );


  ngOnInit() {
    this.carregarUsuarios();
  }


  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }


  protected async carregarUsuarios() {
    this.carregando = true;

    this.subs = this.usuariosApi.listar(this.numeroPagina, this.tamanhoPagina, 'nome')
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: pagina => {
          this.usuarios = [...pagina.dados];
          this.numeroPagina = pagina.info?.pagina ?? 1;
          this.totalPaginas = pagina.info?.totalPaginas ?? 1;
          this.filtro.setValue('');
        },
        error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
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
