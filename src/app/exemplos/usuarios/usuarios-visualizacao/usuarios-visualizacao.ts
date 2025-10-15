import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { Usuario } from '../../../shared/model/usuario';

@Component({
  selector: 'app-usuarios-visualizacao',
  imports: [
    RouterLink,
    DatePipe,
    Card
  ],
  templateUrl: './usuarios-visualizacao.html',
  styleUrl: './usuarios-visualizacao.scss'
})
export class UsuariosVisualizacao {

  usuario = input.required<Usuario>();

}
