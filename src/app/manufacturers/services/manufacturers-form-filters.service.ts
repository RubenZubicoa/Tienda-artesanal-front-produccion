import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';
import { ManufacturerFilters } from '../../core/models/Manufacturer';

type ManufacturersFormFiltersFormContent = {
  maxDistance: FormControl<number | null>;
}

export type ManufacturersFormFiltersForm = FormGroup<ManufacturersFormFiltersFormContent>;

@Injectable({
  providedIn: 'root'
})
export class ManufacturersFormFiltersService implements IServiceForm<ManufacturerFilters, ManufacturersFormFiltersForm, ManufacturerFilters> {

  public form = this.crearFormulario({});
  crearFormulario(inputData: ManufacturerFilters): ManufacturersFormFiltersForm {
    return new FormGroup<ManufacturersFormFiltersFormContent>({
      maxDistance: new FormControl(inputData.maxDistance ?? null),
    });
  }
  actualizarFormulario(form: ManufacturersFormFiltersForm, inputData: ManufacturerFilters): void {
    form.patchValue({
      maxDistance: inputData.maxDistance ?? null,
    });
  }

  obtenerDatos(form: ManufacturersFormFiltersForm): ManufacturerFilters {
    const rawValue = form.getRawValue();
    return rawValue as ManufacturerFilters;
  }
  reset(form: ManufacturersFormFiltersForm): void {
    form.reset();
  }
}
