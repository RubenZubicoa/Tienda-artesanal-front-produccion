import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
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
import { CarruselComponent } from '../../../shared/components/carrusel/carrusel.component';
import { InsertOneResult } from '../../../core/models/InsertOneResult';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    CarruselComponent
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
  public manufacturerImage = computed(() => this.manufacturer()?.image);
  public image = signal<string | undefined>(undefined);
  public imageToDisplay = computed(() => this.image() ?? this.manufacturerImage() ?? '');
  public isUpdateMode = computed(() => this.user() !== undefined);

  private imageFile = signal<File | undefined>(undefined);
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
      this.update(this.user()!.uuid, this.manufacturer()!.uuid!, registerData, this.imageFile(), this.manufacturerImage() ?? undefined);
    } else {
      this.create(registerData, this.imageFile());
    }
  }

  private create(registerData: RegisterData, imageFile?: File){
    this.registerService.register(registerData, imageFile)
    this.router.navigate(['/']);
  }

  private update(userId: User['uuid'], manufacturerId: Manufacturer['uuid'], registerData: RegisterData, imageFile?: File, oldImage?: string){
    this.registerService.update(userId, manufacturerId, registerData, this.destroyRef, imageFile, oldImage);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo inválido', 
          'Por favor selecciona un archivo de imagen'
        );
        return;
      }

      // Validar tamaño (por ejemplo, máximo 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo muy grande', 
          'El tamaño máximo permitido es 5MB'
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        this.image.set(base64String);
      };
      reader.readAsDataURL(file);

      this.imageFile.set(file);

      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      input.value = '';
    }
  }
}
