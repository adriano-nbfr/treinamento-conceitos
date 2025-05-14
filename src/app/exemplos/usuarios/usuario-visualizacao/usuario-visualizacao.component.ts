import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../layout/card/card.component';
import { Usuario } from '../../../shared/model/usuario';

@Component({
  selector: 'app-usuario-visualizacao',
  imports: [
    DatePipe,
    CardComponent,
    RouterLink
  ],
  templateUrl: './usuario-visualizacao.component.html',
  styleUrl: './usuario-visualizacao.component.scss'
})
export class UsuarioVisualizacaoComponent {

  usuario = input.required<Usuario>(); // obtido do resolve da rota

}
