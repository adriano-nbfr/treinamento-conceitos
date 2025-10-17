import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';

@Component({
  selector: 'app-usuarios-edicao-rf',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    JsonPipe,
    DatePipe,
    Card
  ],
  templateUrl: './usuarios-edicao-rf.html',
  styleUrl: './usuarios-edicao-rf.scss'
})
export class UsuariosEdicaoRf {

  private router = inject(Router);
  private usuariosApi = inject(UsuariosApi);
  private activatedRoute = inject(ActivatedRoute);

  // É possível ler o usuário da activatedRoute porque ele já está carregado pelo resolve da rota
  protected usuarioSalvo: Usuario = this.activatedRoute.snapshot.data['usuario'];

  private fb = inject(FormBuilder);

  protected formUsuario = this.fb.group({
    'nome': this.fb.control('', {validators: [Validators.required, Validators.minLength(10)]}),
    'email': this.fb.control('', {validators: [Validators.required, Validators.email]}),
    // 'email': this.fb.control('', {validators: [Validators.required, this.emailMPFValidator]}),
    'matricula': this.fb.control<number | null>(null, {validators: [Validators.min(100)]})
  }, {validators: [this.customValidator]});


  ngOnInit() {
    this.inicializarForm();
  }

  protected inicializarForm() {
    this.formUsuario.patchValue(this.usuarioSalvo);
    this.formUsuario.markAsPristine();
  }

  protected salvarClick() {
    const usuarioReq = {...this.usuarioSalvo, ...this.formUsuario.value} as Usuario;

    if (!this.usuarioSalvo.id) {
      usuarioReq.dataCadastro = new Date().toISOString();
      this.usuariosApi.incluir(usuarioReq).subscribe({
        next: (usuario) => {
          this.usuarioSalvo = usuario; // guarda o estado salvo no caso de ter que restaurar
          this.router.navigate(['/exemplos/usuarios', usuario.id]);
        },
        error: (error) => console.error(error)
      });
    }
    else {
      this.usuariosApi.alterar(usuarioReq, this.usuarioSalvo.id).subscribe({
        next: (usuario) => {
          this.usuarioSalvo = usuario; // guarda o estado salvo no caso de ter que restaurar
          alert('Usuário alterado com sucesso.');
        },
        error: (error) => console.error(error)
      });
    }
  }

  private customValidator(control: AbstractControl<Usuario>) {
    const erros: ValidationErrors = {};

    const usuario = control.value; // valor do form
    if (usuario.email && !usuario.email.endsWith('@mpf.mp.br') &&
      usuario.matricula && usuario.matricula < 1000)
      erros['matricula.reservada'] = true;

    return erros;
  }


  private emailMPFValidator(control: AbstractControl<string>) {
    const erros: ValidationErrors = {};
    if (control.value && !control.value.endsWith('@mpf.mp.br'))
      erros['emailMPF'] = true;

    return erros;
  }

}
