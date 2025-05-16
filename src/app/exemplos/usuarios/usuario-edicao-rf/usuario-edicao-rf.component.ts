import { Component, inject, input } from '@angular/core';
import { Usuario } from '../../../shared/model/usuario';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from "../../../layout/card/card.component";
import { DatePipe, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../usuario.service';

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

  private fb = inject(FormBuilder);

  protected formUsuario = this.fb.group({
    nome: this.fb.control(''),
    email: this.fb.control(''),
    matricula: this.fb.control<number | null>(null)
  });


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

  private customValidator(control: AbstractControl<Usuario>) {
    const usuario = control.value;
    if (usuario.email && !usuario.email.endsWith('@mpf.mp.br') &&
      usuario.matricula && usuario.matricula < 1000)
      return {'matricula.reservada': true};

    return null;
  }

}
