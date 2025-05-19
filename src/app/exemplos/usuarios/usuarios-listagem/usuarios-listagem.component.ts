import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, map, startWith } from 'rxjs';
import { CardComponent } from '../../../layout/card/card.component';
import { BloqueadoDirective } from '../../../shared/diretivas/bloqueado.directive';
import { Usuario } from '../../../shared/model/usuario';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    BloqueadoDirective,
    RouterLink,
    CardComponent
  ],
  providers: [
    UsuarioService
  ],
  templateUrl: './usuarios-listagem.component.html',
  styleUrl: './usuarios-listagem.component.scss'
})
export class UsuariosListagemComponent implements OnInit {

  private usuarioService = inject(UsuarioService);

  protected filtro = new FormControl<string>('', {nonNullable: true});

  protected erro = '';

  protected carregando = false;

  protected numeroPagina = 1;

  protected tamanhoPagina = 5;

  protected totalPaginas = 0;

  protected usuarios = signal<Usuario[]>([]);

  protected textoFiltro = toSignal(this.filtro.valueChanges.pipe(
    debounceTime(300),
    startWith(''),
    map(texto => (texto?.length ?? 0) > 2 ? texto : ''),
    distinctUntilChanged(),
  ), {initialValue: ''});

  protected listagemFiltrada = computed(() => {
    return obterItensFiltrados(this.usuarios(), this.textoFiltro());
  });


  ngOnInit() {
    this.carregarUsuarios();
  }

  // protected async carregarUsuarios() {
  //   // const abortController = new AbortController();
  //   // this.usuarioService.carregarUsuariosPromise(abortController.signal)
  //   //   .then(usuarios => this.usuarios = usuarios)
  //   //   .catch((error: Error) => this.erro = `Não foi possível carregar: ${error.message}`);

  //   const sub = this.usuarioService.carregarUsuariosObservable()
  //     .subscribe({
  //       next: usuarios => this.usuarios = usuarios,
  //       error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
  //     });
  // }


  protected async carregarUsuarios() {
    this.carregando = true
    this.usuarioService.listar(this.numeroPagina, this.tamanhoPagina, 'nome')
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: pagina => {
          this.usuarios.set([...pagina.dados]);
          this.numeroPagina = pagina.info?.pagina ?? 1;
          this.totalPaginas = pagina.info?.totalPaginas ?? 1;
        },
        error: error => console.error(error)
      });
  }

  protected async excluir(usuario: Usuario) {
    if (!confirm(`Confirmar a exclusão de ${usuario.nome} ?`))
      return;

    this.usuarioService.excluir(usuario.id).subscribe({
      next: () => this.carregarUsuarios(),
      error: (error) => console.error(error.message)
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
