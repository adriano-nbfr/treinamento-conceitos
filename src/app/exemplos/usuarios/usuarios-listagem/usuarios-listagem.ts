import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { Card } from '../../../shared/card/card';
import { Bloqueado } from '../../../shared/diretivas/bloqueado';
import { Usuario } from '../../../shared/model/usuario';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-listagem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatePipe,
    Bloqueado,
    Card
  ],
  templateUrl: './usuarios-listagem.html',
  styleUrl: './usuarios-listagem.scss'
})
export class UsuariosListagem {

  private usuariosApi = inject(UsuariosApi);

  protected erro = '';

  protected carregando = false;

  protected numeroPagina = signal(1);

  protected tamanhoPagina = signal(5);

  protected totalPaginas = signal(0);

  protected usuarios = signal<Usuario[]>([]);

  private subs?: Subscription = undefined;

  protected filtro = new FormControl('');

  protected textoFiltro = toSignal(this.filtro.valueChanges);

  protected listagemFiltrada = computed(() => {
    return obterItensFiltrados(this.usuarios(), this.textoFiltro());
  });


  ngOnInit() {
    this.carregarUsuarios();
  }


  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }


  protected async carregarUsuarios() {
    this.carregando = true;

    this.subs = this.usuariosApi.listar(this.numeroPagina(), this.tamanhoPagina(), 'nome')
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: pagina => {
          this.usuarios.set([...pagina.dados]);
          this.numeroPagina.set(pagina.info?.pagina ?? 1);
          this.totalPaginas.set(pagina.info?.totalPaginas ?? 1);
          this.filtro.setValue('');
        },
        error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
      });
  }

  protected async excluir(usuario: Usuario) {
    if (!confirm(`Confirmar a exclusão de ${usuario.nome} ?`))
      return;

    this.usuariosApi.excluir(usuario.id).subscribe({
      next: () => this.carregarUsuarios(),
      error: (error: Error) => console.log(`Não foi possível excluir o usuário: ${error.message}`)
    });
  }

  protected primeira() {
    this.carregarPagina(1);
  }

  protected anterior() {
    this.carregarPagina(this.numeroPagina() - 1)
  }

  protected proxima() {
    this.carregarPagina(this.numeroPagina() + 1)
  }

  protected ultima() {
    this.carregarPagina(this.totalPaginas());
  }

  protected alterarTamanhoPagina(n: number) {
    this.tamanhoPagina.set(n);
    this.carregarPagina(1);
  }

  private carregarPagina(pagina: number) {
    if (pagina > this.totalPaginas() || pagina < 1)
      return;

    this.numeroPagina.set(pagina);
    this.carregarUsuarios();
  }

}
