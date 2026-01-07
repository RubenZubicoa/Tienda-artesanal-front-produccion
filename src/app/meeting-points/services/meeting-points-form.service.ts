import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';

export type MeetingPointsFormInput = {
  name: string;
  description?: string;
}

type MeetingPointsFormContent = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

export type MeetingPointsForm = FormGroup<MeetingPointsFormContent>;

@Injectable({
  providedIn: 'root'
})
export class MeetingPointsFormService implements IServiceForm<MeetingPointsFormInput, MeetingPointsForm, MeetingPointsFormInput> {

  crearFormulario(): MeetingPointsForm {
    return new FormGroup<MeetingPointsFormContent>({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }
  actualizarFormulario(form: MeetingPointsForm, inputData: MeetingPointsFormInput): void {
    form.patchValue({
      name: inputData.name,
      description: inputData.description,
    });
  }
  obtenerDatos(form: MeetingPointsForm): MeetingPointsFormInput {
    return form.getRawValue() as MeetingPointsFormInput;
  }
  reset(form: MeetingPointsForm): void {
    form.reset();
  }
}
