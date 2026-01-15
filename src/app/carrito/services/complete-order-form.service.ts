import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';

export interface ICompleteOrderForm {
  name: string;
  email: string;
  phone: string;
}

type CompleteOrderFormContent = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
};

export type CompleteOrderForm = FormGroup<CompleteOrderFormContent>;

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderFormService implements IServiceForm<ICompleteOrderForm, CompleteOrderForm, ICompleteOrderForm> {

  crearFormulario(): CompleteOrderForm {
    return new FormGroup<CompleteOrderFormContent>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    });
  }
  actualizarFormulario(form: CompleteOrderForm, inputData: ICompleteOrderForm): void {
    form.patchValue(inputData);
  }
  obtenerDatos(form: CompleteOrderForm): ICompleteOrderForm {
    return form.getRawValue() as ICompleteOrderForm;
  }
  reset(form: CompleteOrderForm): void {
    form.reset();
  }
}
