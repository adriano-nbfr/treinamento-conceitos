import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs';
import { Usuario } from '../../../shared/model/usuario';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios-listagem',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './usuarios-listagem.component.html',
  styleUrl: './usuarios-listagem.component.scss'
})
export class UsuariosListagemComponent implements OnInit {

  private usuarioService = inject(UsuarioService);

  protected filtro = new FormControl('');

  protected erro = '';

  protected usuarios: Usuario[] = [];

  protected listagemFiltrada$ = this.filtro.valueChanges.pipe(
    debounceTime(300),
    map(texto => (texto?.length ?? 0) > 2 ? texto : ''),
    startWith(''),
    distinctUntilChanged(),
    tap(texto => console.log(`Filtrando com : "${texto}"`)),
    map(texto => obterItensFiltrados(this.usuarios, texto)),
    // switchMap(texto => of(obterItensFiltrados(this.usuarios, texto)))
  );

  ngOnInit() {
    this.carregarUsuarios();
  }


  protected async carregarUsuarios() {
    // const abortController = new AbortController();
    // this.usuarioService.carregarUsuariosPromise(abortController.signal)
    //   .then(usuarios => this.usuarios = usuarios)
    //   .catch((error: Error) => this.erro = `Não foi possível carregar: ${error.message}`);

    const sub = this.usuarioService.carregarUsuariosObservable()
      .subscribe({
        next: usuarios => this.usuarios = usuarios,
        error: (error: Error) => this.erro = `Não foi possível carregar: ${error.message}`
      });
  }

}
