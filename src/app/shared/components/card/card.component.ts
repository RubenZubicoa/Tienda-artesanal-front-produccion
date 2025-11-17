import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public product = input.required<Product>();
}
