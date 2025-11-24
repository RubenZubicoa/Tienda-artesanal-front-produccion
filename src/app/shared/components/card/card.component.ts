import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardData } from './card.models';
import { TruncateTextDirective } from '../../directives/truncate-text.directive';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, CommonModule, TruncateTextDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public card = input.required<CardData>();
  public buttonText = input<string>('Comprar');
  public buttonType = input<'primary' | 'warning'>('primary');

  public click = output<CardData>();

  public onClick() {
    this.click.emit(this.card());
  }
}
