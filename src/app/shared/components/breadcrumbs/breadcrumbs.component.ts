import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Breadcrumb } from './breadcrumb';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterModule, MatIconModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: Breadcrumb[] = [];
  private readonly route: ActivatedRoute = inject(ActivatedRoute)
  private readonly router: Router = inject(Router);


  ngOnInit(): void {
    this.breadcrumbs = this.createBreadcrumbs(this.route.root)
  }

  navigate(url: string): void{
    this.router.navigateByUrl(url)
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeConfig = child.routeConfig;
      if (routeConfig && routeConfig.data && routeConfig.data['breadcrumb']) {
        const routeUrl: string = routeConfig.path ? `/${routeConfig.path}` : '';
        const nextUrl = `${url}${routeUrl}`;
        const breadcrumb: Breadcrumb = {
          label: routeConfig.data['breadcrumb'],
          url: nextUrl
        };
        breadcrumbs.push(breadcrumb);
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
