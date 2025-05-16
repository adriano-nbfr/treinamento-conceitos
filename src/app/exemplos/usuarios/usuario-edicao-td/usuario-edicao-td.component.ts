import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, input, viewChild } from '@angular/core';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../../layout/card/card.component";
import { Usuario } from '../../../shared/model/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-edicao-td',
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    JsonPipe,
    CardComponent
  ],
  templateUrl: './usuario-edicao-td.component.html',
  styleUrl: './usuario-edicao-td.component.scss'
})
export class UsuarioEdicaoTdComponent {

  usuario = input.required<Usuario>(); // Usuário carregado no resolve da rota

  private usuarioService = inject(UsuarioService);

  private router = inject(Router);

  private formUsuario = viewChild.required(NgForm);


  ngOnInit() {
    setTimeout(() => {
      this.formUsuario().form.patchValue(this.usuario());
      this.formUsuario().form.addValidators(this.customValidator);
      this.formUsuario().form.updateValueAndValidity();
    })
  }

  salvarClick(valorForm: Usuario) {
    if (this.formUsuario().invalid)
      return;

    let usuario = {...this.usuario(), ...valorForm}

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
