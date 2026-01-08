import { Component, computed, DestroyRef, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { RegisterFormInput, RegisterFormService } from '../../services/register-form.service';
import { RegisterData, RegisterService } from '../../services/register.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { User } from '../../../core/models/User';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly registerFormService = inject(RegisterFormService);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserService = inject(CurrentUserService);

  public user = this.currentUserService.currentUser;
  public manufacturer = this.currentUserService.currentManufacturer;
  public isUpdateMode = computed(() => this.user() !== undefined);


  public form = this.registerFormService.crearFormulario();

  public get isManufacturer(): boolean {
    return this.form.get('isManufacturer')?.value ?? false;
  }

  constructor() {
    effect(() => {
      const user = this.user();
      const manufacturer = this.manufacturer();
      if (user) {
        const formInput: RegisterFormInput = {
          name: user.name,
          email: user.email,
          password: user.password,
          confirmPassword: user.password,
          isManufacturer: user.manufacturerId !== undefined,
          phone: user.phone,
        };
        if (manufacturer) {
          formInput.manufacturerName = manufacturer.name;
          formInput.manufacturerPhone = manufacturer.phone;
          formInput.manufacturerAddress = manufacturer.address;
          formInput.manufacturerDescription = manufacturer.description;
          formInput.manufacturerImage = manufacturer.image;
        }
        this.registerFormService.actualizarFormulario(this.form, formInput);
      } else{
        this.registerFormService.reset(this.form);
      }
    });
  }

  public register(): void {
    if (this.form.invalid) {
      if (this.form.errors?.['passwordMismatch']) {
        this.toastService.showMessage(
          ToastTypes.ERROR,
          'Error de validación',
          'Las contraseñas no coinciden'
        );
        return;
      }
      this.form.markAllAsTouched();
      this.toastService.showMessage(
        ToastTypes.ERROR,
        'Error de validación',
        'Por favor, completa todos los campos requeridos correctamente'
      );
      return;
    }

    const formData = this.registerFormService.obtenerDatos(this.form);

    const registerData: RegisterData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      manufacturer: this.isManufacturer ? {
        name: formData.manufacturerName!,
        phone: formData.manufacturerPhone!,
        email: formData.email!,
        address: formData.manufacturerAddress!,
        description: formData.manufacturerDescription,
        image: formData.manufacturerImage
      } : undefined
    };

    if (this.isUpdateMode()) {
      this.update(this.user()!.uuid, this.manufacturer()!.uuid!, registerData);
    } else {
      this.create(registerData);
    }
  }

  private create(registerData: RegisterData){
    this.registerService.register(registerData).subscribe({
      next: () => {
        this.toastService.showMessage(
          ToastTypes.SUCCESS,
          'Registro exitoso',
          'Tu cuenta ha sido creada correctamente'
        );
        this.router.navigate(['/']);
      },
    });
  }

  private update(userId: User['uuid'], manufacturerId: Manufacturer['uuid'], registerData: RegisterData){
    this.registerService.update(userId, manufacturerId, registerData, this.destroyRef);
  }
}
