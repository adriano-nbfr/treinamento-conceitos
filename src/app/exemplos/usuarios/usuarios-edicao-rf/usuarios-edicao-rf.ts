import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';
import { UsuariosApi } from '../usuarios-api';


type ContatoFormGroup = {
  nome: FormControl<string>;
  telefone: FormControl<string>
}

type UsuarioFormGroup = {
  nome: FormControl<string>;
  email: FormControl<string>;
  matricula: FormControl<number | null>;
  contatos: FormArray<FormGroup<ContatoFormGroup>>;
}


@Component({
  selector: 'app-usuarios-edicao-rf',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    JsonPipe,
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

  protected formUsuario = this.fb.group<UsuarioFormGroup>({
    'nome': this.fb.control('', {
        validators: [Validators.required, Validators.minLength(10)],
        nonNullable: true
      }),
    'email': this.fb.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    'matricula': this.fb.control<number | null>(null, [Validators.min(100)]),
    'contatos': this.fb.array<FormGroup<ContatoFormGroup>>([])
  }, {validators: [this.customValidator]});


  ngOnInit() {
    this.inicializarForm();
  }

  protected get contatos() {
    return this.formUsuario.controls.contatos;
  }

  protected inicializarForm() {
    this.formUsuario.controls.contatos.clear();
    this.usuarioSalvo.contatos?.forEach(() => this.adicionarContato());
    this.formUsuario.patchValue(this.usuarioSalvo);
    this.formUsuario.markAsPristine();
  }

  protected criarContatoFormGroup() {
    return this.fb.group({
      nome: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
      telefone: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
    });
  }

  protected adicionarContato() {
    this.contatos.push(this.criarContatoFormGroup());
    this.contatos.markAsDirty();
  }

  protected removerContato(indice: number) {
    this.contatos.removeAt(indice);
    this.contatos.markAsDirty();
  }

  protected salvarClick() {
    const usuario = {...this.usuarioSalvo, ...this.formUsuario.value} as Usuario;

    if (!this.usuarioSalvo.id) {
      usuario.dataCadastro = new Date().toISOString();
      this.usuariosApi.incluir(usuario).subscribe({
        next: (usuario) => {
          this.usuarioSalvo = usuario; // guarda o estado salvo no caso de ter que restaurar
          this.router.navigate(['/exemplos/usuarios', usuario.id]);
        },
        error: (error) => console.error(error)
      });
    }
    else {
      this.usuariosApi.alterar(usuario, usuario.id).subscribe({
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
    const usuario = control.value;

    if (usuario.email && !usuario.email.endsWith('@mpf.mp.br') &&
      usuario.matricula && usuario.matricula < 1000)
      erros['matricula.reservada'] = true;

    return erros;
  }

}
