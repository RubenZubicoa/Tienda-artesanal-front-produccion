import { Injectable } from '@angular/core';
import { IServiceForm } from '../../core/models/IServiceForm';
import { ProductFilters } from '../../core/models/Product';
import { FormControl, FormGroup } from '@angular/forms';

type ProductsFormFiltersFormContent = {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormGroup<{
    start: FormControl<number | null>;
    end: FormControl<number | null>;
  }>;
  inStock: FormControl<boolean | null>;
  category: FormControl<string | null>;
}

export type ProductsFormFiltersForm = FormGroup<ProductsFormFiltersFormContent>;

@Injectable({
  providedIn: 'root'
})
export class ProductsFormFiltersService implements IServiceForm<ProductFilters, ProductsFormFiltersForm, ProductFilters> {

  public form = this.crearFormulario({});
  crearFormulario(inputData: ProductFilters): ProductsFormFiltersForm {
    return new FormGroup<ProductsFormFiltersFormContent>({
      name: new FormControl(inputData.name ?? null),
      description: new FormControl(inputData.description ?? null),
      price: new FormGroup({
        start: new FormControl(inputData.price?.start ?? null),
        end: new FormControl(inputData.price?.end ?? null),
      }),
      inStock: new FormControl(inputData.inStock ?? null),
      category: new FormControl(inputData.category ?? null),
    });
  }
  actualizarFormulario(form: ProductsFormFiltersForm, inputData: ProductFilters): void {
    form.patchValue({
      name: inputData.name ?? null,
      description: inputData.description ?? null,
      price: inputData.price ? {
        start: inputData.price.start ?? null,
        end: inputData.price.end ?? null,
      } : undefined,
      inStock: inputData.inStock ?? null,
      category: inputData.category ?? null,
    });
  }
  obtenerDatos(form: ProductsFormFiltersForm): ProductFilters {
    const rawValue = form.getRawValue();
    return {
      name: rawValue.name ?? undefined,
      description: rawValue.description ?? undefined,
      price: rawValue.price ? {
        start: rawValue.price.start ?? undefined,
        end: rawValue.price.end ?? undefined,
      } : undefined,
      inStock: rawValue.inStock ?? undefined,
      category: rawValue.category ?? undefined,
    };
  }
  reset(form: ProductsFormFiltersForm): void {
    form.reset();
  }
}
