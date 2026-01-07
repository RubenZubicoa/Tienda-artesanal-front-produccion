import { Component, inject, input, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Section } from '../../../core/models/Section';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenu, MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../login/components/login-dialog/login-dialog.component';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ToastTypes } from '../toast/toastData';
import { ToastService } from '../toast/toast.service';


@Component({
  selector: 'app-section-button',
  imports: [RouterModule, MatIconModule, CommonModule, MatBadgeModule, MatMenuModule],
  templateUrl: './section-button.component.html',
  styleUrl: './section-button.component.scss'
})
export class SectionButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  public currentUser = this.currentUserService.currentUser;

  public section = input.required<Section>();
  public displayMenu = input<boolean>(false);

  public openMenu() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      height: '400px',
    });
  }

  public logout() {
    this.currentUserService.setCurrentUser(undefined);
    this.toastService.showMessage(ToastTypes.SUCCESS, 'Cierre de sesión exitoso', 'Has cerrado sesión correctamente');
  }

  public navigateToRegister() {
    this.router.navigate(['/register']);
  }

  public navigateToOrders() {
    this.router.navigate(['/my-orders']);
  }
}
