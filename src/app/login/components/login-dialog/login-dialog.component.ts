import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { LoginFormService } from '../../services/login-form.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';

@Component({
  selector: 'app-login-dialog',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  private readonly loginService = inject(LoginService);
  private readonly loginFormService = inject(LoginFormService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private readonly toastService = inject(ToastService);

  public form = this.loginFormService.crearFormulario();

  public login() {
    const formData = this.loginFormService.obtenerDatos(this.form);
    this.loginService.login(formData.email, formData.password).subscribe({
      next: (user) => {
        this.currentUserService.setCurrentUser(user);
        this.dialogRef.close(true);
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Inicio de sesión exitoso', 'Has iniciado sesión correctamente');
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al iniciar sesión', 'El correo electrónico o la contraseña son incorrectos');
      }
    });
  }
}
