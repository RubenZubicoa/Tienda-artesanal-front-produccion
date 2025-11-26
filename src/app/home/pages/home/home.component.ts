import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Section {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public readonly router = inject(Router);

  public sections: Section[] = [
    {
      title: 'Vendedores',
      description:
      'Encuentra los mejores vendedores de productos artesanales de la region',
      image: 'https://picsum.photos/300/300',
    },
    {
      title: 'Productos',
      description: 'Encuentra los mejores productos artesanales de la region',
      image: 'https://picsum.photos/300/300',
    },
  ];

  public navigateToSection(section: Section) {
    switch (section.title) {
      case 'Productos':
        this.router.navigate(['/products']);
        break;
      case 'Vendedores':
        this.router.navigate(['/manufacturers']);
        break;
    }
  }
}
