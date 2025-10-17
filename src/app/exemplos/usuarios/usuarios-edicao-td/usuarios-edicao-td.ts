import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-edicao-td',
  imports: [
    RouterLink,
    FormsModule,
    JsonPipe,
    DatePipe,
    Card
  ],
  templateUrl: './usuarios-edicao-td.html',
  styleUrl: './usuarios-edicao-td.scss'
})
export class UsuariosEdicaoTd {

  private router = inject(Router);
  private usuariosApi = inject(UsuariosApi);
  private activatedRoute = inject(ActivatedRoute);

  // É possível ler o usuário da activatedRoute porque ele já está carregado pelo resolve da rota
  protected usuarioSalvo: Usuario = this.activatedRoute.snapshot.data['usuario'];
  protected usuario: Usuario = {...this.usuarioSalvo}; // copia rasa

  private formUsuario = viewChild.required<NgForm>('formUsuario');


  ngAfterViewInit() {
    this.formUsuario().form.addValidators(this.customValidator);
    this.formUsuario().form.updateValueAndValidity();
  }


  protected salvarClick() {
    if (!this.usuarioSalvo.id) {
      this.usuario.dataCadastro = new Date().toISOString();
      this.usuariosApi.incluir(this.usuario).subscribe({
        next: (usuario) => {
          this.usuarioSalvo = usuario; // guarda o estado salvo no caso de ter que restaurar
          this.usuario = {...usuario}; // atualiza o model após ganhar um id
          this.router.navigate(['/exemplos/usuarios', usuario.id]);
        },
        error: (error) => console.error(error)
      });
    }
    else {
      this.usuariosApi.alterar(this.usuario, this.usuarioSalvo.id).subscribe({
        next: (usuario) => {
          this.usuarioSalvo = usuario; // guarda o estado salvo no caso de ter que restaurar
          alert('Usuário alterado com sucesso.');
        },
        error: (error) => console.error(error)
      });
    }
  }

  protected restaurarClick() {
    this.usuario = {...this.usuarioSalvo};
  }


  private customValidator(control: AbstractControl<Usuario>) {
    const erros: ValidationErrors = {};

    const usuario = control.value; // valor do form
    if (usuario.email && !usuario.email.endsWith('@mpf.mp.br') &&
      usuario.matricula && usuario.matricula < 1000)
      erros['matricula.reservada'] = true;

    return erros;
  }

}
