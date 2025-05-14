import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../layout/card/card.component';
import { Usuario } from '../../../shared/model/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-visualizacao',
  imports: [
    DatePipe,
    CardComponent,
    RouterLink
  ],
  providers: [
    UsuarioService
  ],
  templateUrl: './usuario-visualizacao.component.html',
  styleUrl: './usuario-visualizacao.component.scss'
})
export class UsuarioVisualizacaoComponent {

  idUsuario = input.required<string>(); //

  private usuarioService = inject(UsuarioService);

  protected usuario?: Usuario;


  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    this.usuarioService.obter(this.idUsuario())
      .subscribe(usuario => this.usuario = usuario);
  }

}
