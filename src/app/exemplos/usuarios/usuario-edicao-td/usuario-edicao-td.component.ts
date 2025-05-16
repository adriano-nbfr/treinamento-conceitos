import { Component, inject, input, viewChild } from '@angular/core';
import { Usuario } from '../../../shared/model/usuario';
import { UsuarioService } from '../usuario.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from "../../../layout/card/card.component";
import { DatePipe, JsonPipe } from '@angular/common';

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

}
