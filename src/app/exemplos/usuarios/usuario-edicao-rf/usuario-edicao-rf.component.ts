import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../../layout/card/card.component";
import { Usuario } from '../../../shared/model/usuario';
import { UsuarioService } from '../usuario.service';

interface TipoFormUsuario {
  nome: FormControl<string | null>;
  email: FormControl<string | null>;
  matricula: FormControl<number | null>;
  dataNascimento?: FormControl<string | null>;
}

@Component({
  selector: 'app-usuario-edicao-rf',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    CardComponent
  ],
  templateUrl: './usuario-edicao-rf.component.html',
  styleUrl: './usuario-edicao-rf.component.scss'
})
export class UsuarioEdicaoRfComponent {

  usuario = input.required<Usuario>(); // Usuário carregado no resolve da rota

  private usuarioService = inject(UsuarioService);

  private router = inject(Router);

  protected informarDataNascimento = new FormControl(false);

  private fb = inject(FormBuilder);

  protected formUsuario = this.fb.group<TipoFormUsuario>({
    nome: this.fb.control('',
      { validators: [Validators.required, Validators.minLength(10)] }),
    email: this.fb.control('',
      { validators: [Validators.required, Validators.email] }),
    matricula: this.fb.control<number | null>(null,
      { validators: [Validators.min(100)] })
  }, { validators: [this.customValidator] });


  ngOnInit() {
    this.formUsuario.patchValue(this.usuario());
  }

  salvarClick() {
    if (this.formUsuario.invalid)
      return;

    let usuario = {...this.usuario(), ...this.formUsuario.value} as Usuario;

    if (!usuario.id) {
      usuario = {...usuario, dataCadastro: new Date().toISOString()};
      this.usuarioService.incluir(usuario).subscribe({
        next: usuario => this.router.navigate(['/exemplos/usuarios', usuario.id]),
        error: error => console.error(error)
      });
    }
    else {
      this.usuarioService.alterar(usuario, usuario.id).subscribe({
        next: usuario => alert('Usuário alterado com sucesso.'),
        error: error => console.error(error)
      });
    }
  }

  protected informarDataNascimentoChange() {
    if (this.informarDataNascimento.value) {
      const control = this.fb.control('', [Validators.required]);
      this.formUsuario.addControl('dataNascimento', control);
      //this.formMascaras.updateValueAndValidity();
    }
    else {
      this.formUsuario.removeControl('dataNascimento');
      //this.formMascaras.updateValueAndValidity();
    }
  }


  private customValidator(control: AbstractControl<Usuario>) {
    const usuario = control.value;
    if (usuario.email && !usuario.email.endsWith('@mpf.mp.br') &&
      usuario.matricula && usuario.matricula < 1000)
      return {'matricula.reservada': true};

    return null;
  }

}
