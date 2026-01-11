import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MeetingPointFilters } from '../../core/models/MeetingPoint';
import { IServiceForm } from '../../core/models/IServiceForm';

type MeetingPointsFiltersFormContent = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

export type MeetingPointsFiltersForm = FormGroup<MeetingPointsFiltersFormContent>;

@Injectable({
  providedIn: 'root'
})
export class MeetingPointsFiltersFormService implements IServiceForm<MeetingPointFilters, MeetingPointsFiltersForm, MeetingPointFilters> {

  public form = this.crearFormulario({});
  crearFormulario(inputData: MeetingPointFilters): MeetingPointsFiltersForm {
    return new FormGroup<MeetingPointsFiltersFormContent>({
      name: new FormControl<string | null>(inputData.name ?? null),
      description: new FormControl<string | null>(inputData.description ?? null),
    });
  }
  actualizarFormulario(form: MeetingPointsFiltersForm, inputData: MeetingPointFilters): void {
    form.patchValue({
      name: inputData.name ?? null,
      description: inputData.description ?? null,
    });
  }
  obtenerDatos(form: MeetingPointsFiltersForm): MeetingPointFilters {
    return form.getRawValue() as MeetingPointFilters;
  }
  reset(form: MeetingPointsFiltersForm): void {
    form.reset();
  }

  
}
