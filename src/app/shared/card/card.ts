import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  titulo = input('');

  tituloLink = input('');

}
