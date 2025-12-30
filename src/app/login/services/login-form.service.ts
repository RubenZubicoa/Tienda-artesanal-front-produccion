import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';


export type LoginFormInput = {
  email: string;
  password: string;
}

type LoginFormContent = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

export type LoginForm = FormGroup<LoginFormContent>;

@Injectable({
  providedIn: 'root'
})
export class LoginFormService implements IServiceForm<LoginFormInput, LoginForm, LoginFormInput> {

  crearFormulario(): LoginForm {
    return new FormGroup<LoginFormContent>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  actualizarFormulario(form: LoginForm, inputData: LoginFormInput): void {
    form.patchValue(inputData);
  }
  obtenerDatos(form: LoginForm): LoginFormInput {
    return form.getRawValue() as LoginFormInput;
  }
  reset(form: LoginForm): void {
    form.reset();
  }
}
