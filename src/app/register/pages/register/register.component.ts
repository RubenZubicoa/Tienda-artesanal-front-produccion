import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { RegisterFormService } from '../../services/register-form.service';
import { RegisterService } from '../../services/register.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly registerFormService = inject(RegisterFormService);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  public form = this.registerFormService.crearFormulario();

  public get isManufacturer(): boolean {
    return this.form.get('isManufacturer')?.value ?? false;
  }

  public register(): void {
    console.log(this.form.valid);
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   this.toastService.showMessage(
    //     ToastTypes.ERROR,
    //     'Error de validación',
    //     'Por favor, completa todos los campos requeridos correctamente'
    //   );
    //   return;
    // }

    const formData = this.registerFormService.obtenerDatos(this.form);

    console.log(formData);

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      manufacturer: this.isManufacturer ? {
        name: formData.manufacturerName!,
        phone: formData.manufacturerPhone!,
        email: formData.email!,
        address: formData.manufacturerAddress!,
        description: formData.manufacturerDescription,
        image: formData.manufacturerImage
      } : undefined
    };

    this.registerService.register(registerData).subscribe({
      next: () => {
        this.toastService.showMessage(
          ToastTypes.SUCCESS,
          'Registro exitoso',
          'Tu cuenta ha sido creada correctamente'
        );
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastService.showMessage(
          ToastTypes.ERROR,
          'Error al registrarse',
          'No se pudo completar el registro. Por favor, intenta nuevamente'
        );
      }
    });
  }
}
