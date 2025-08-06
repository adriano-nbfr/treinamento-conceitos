import { Component, input } from '@angular/core';
import { AtalhoSistema } from '../atalho-sistema';

@Component({
  selector: 'app-portal-destaques',
  imports: [],
  templateUrl: './portal-destaques.html',
  styleUrl: './portal-destaques.scss'
})
export class PortalDestaques {

  /** Um array com dados de atalhos a exibir como links de destaque no portal */
  atalhos = input.required<AtalhoSistema[]>();

}
