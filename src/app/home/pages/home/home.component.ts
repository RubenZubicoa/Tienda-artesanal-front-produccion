import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 public sections = [
  {
    title: 'Productos',
    description: 'Encuentra los mejores productos artesanales de la region',
    image: 'https://picsum.photos/300/300'
  },
  {
    title: 'Vendedores',
    description: 'Encuentra los mejores vendedores de productos artesanales de la region',
  }
]
}
