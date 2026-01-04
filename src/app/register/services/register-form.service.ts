import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';

export type RegisterFormInput = {
  // Usuario
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Manufacturer (opcional)
  isManufacturer: boolean;
  manufacturerName?: string;
  manufacturerPhone?: string;
  manufacturerAddress?: string;
  manufacturerDescription?: string;
  manufacturerImage?: string;
}

type RegisterFormContent = {
  // Usuario
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  
  // Manufacturer (opcional)
  isManufacturer: FormControl<boolean | null>;
  manufacturerName: FormControl<string | null>;
  manufacturerPhone: FormControl<string | null>;
  manufacturerAddress: FormControl<string | null>;
  manufacturerDescription: FormControl<string | null>;
  manufacturerImage: FormControl<string | null>;
};

export type RegisterForm = FormGroup<RegisterFormContent>;

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService implements IServiceForm<RegisterFormInput, RegisterForm, RegisterFormInput> {

  crearFormulario(): RegisterForm {
    const form = new FormGroup<RegisterFormContent>({
      // Usuario
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      
      // Manufacturer
      isManufacturer: new FormControl(false),
      manufacturerName: new FormControl(null),
      manufacturerPhone: new FormControl(null),
      manufacturerAddress: new FormControl(null),
      manufacturerDescription: new FormControl(null),
      manufacturerImage: new FormControl(null),
    });

    // Validación personalizada para confirmar contraseña
    form.addValidators((control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    });

    // Validaciones condicionales para manufacturer
    form.get('isManufacturer')?.valueChanges.subscribe(isManufacturer => {
      if (isManufacturer) {
        form.get('manufacturerName')?.setValidators([Validators.required]);
        form.get('manufacturerPhone')?.setValidators([Validators.required]);
        form.get('manufacturerEmail')?.setValidators([Validators.required, Validators.email]);
        form.get('manufacturerAddress')?.setValidators([Validators.required]);
      } else {
        form.get('manufacturerName')?.clearValidators();
        form.get('manufacturerPhone')?.clearValidators();
        form.get('manufacturerEmail')?.clearValidators();
        form.get('manufacturerAddress')?.clearValidators();
      }
      form.get('manufacturerName')?.updateValueAndValidity();
      form.get('manufacturerPhone')?.updateValueAndValidity();
      form.get('manufacturerAddress')?.updateValueAndValidity();
    });

    return form;
  }

  actualizarFormulario(form: RegisterForm, inputData: RegisterFormInput): void {
    form.patchValue(inputData);
  }

  obtenerDatos(form: RegisterForm): RegisterFormInput {
    return form.getRawValue() as RegisterFormInput;
  }

  reset(form: RegisterForm): void {
    form.reset();
  }
}

