import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../shared/model/usuario';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs';
import { obterItensFiltrados } from '../../../shared/pipes/filtragem';

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

  protected filtro = new FormControl('');

  protected usuarios: Usuario[] = [];

  protected listagemFiltrada$ = this.filtro.valueChanges.pipe(
    debounceTime(300),
    map(texto => (texto?.length ?? 0) > 2 ? texto : ''),
    startWith(''),
    distinctUntilChanged(),
    tap(texto => console.log(`Filtrando com : "${texto}"`)),
    map(texto => obterItensFiltrados(this.usuarios, texto)),
  );

  ngOnInit() {
    this.carregarUsuarios();
  }

  protected async carregarUsuarios() {
    return fetch('http://localhost:3000/usuarios')
      .then(res => res.json())
      .then(usuarios => this.usuarios = usuarios);
  }

}
