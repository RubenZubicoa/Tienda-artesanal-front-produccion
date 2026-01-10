import { Injectable, signal } from '@angular/core';
import { OrderFilters, OrderStatus } from '../../core/models/Order';
import { FormControl, FormGroup } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';

type OrderFiltersFormContent = {
    username?: FormControl<string | null>;
    phone?: FormControl<string | null>;
    email?: FormControl<string | null>;
    status?: FormControl<OrderStatus | null>;
    createdAt?: FormGroup<{ start?: FormControl<Date | null>; end?: FormControl<Date | null> }>;
}

export type OrderFiltersForm = FormGroup<OrderFiltersFormContent>;


@Injectable({
  providedIn: 'root'
})
export class OrderFiltersFormService implements IServiceForm<OrderFilters, OrderFiltersForm, OrderFilters> {
  public form = this.crearFormulario({});

  crearFormulario(inputData: OrderFilters): OrderFiltersForm {
    return new FormGroup<OrderFiltersFormContent>({
      username: new FormControl<string | null>(inputData.username ?? null),
      phone: new FormControl<string | null>(inputData.phone ?? null),
      email: new FormControl<string | null>(inputData.email ?? null),
      status: new FormControl<OrderStatus | null>(inputData.status ?? null),
      createdAt: new FormGroup<{ start?: FormControl<Date | null>; end?: FormControl<Date | null> }>({
        start: new FormControl<Date | null>(inputData.createdAt?.start ? new Date(inputData.createdAt.start) : null),
        end: new FormControl<Date | null>(inputData.createdAt?.end ? new Date(inputData.createdAt.end) : null),
      }),
    });
  }
  actualizarFormulario(form: OrderFiltersForm, inputData: OrderFilters): void {
    form.patchValue({
      username: inputData.username ?? null,
      phone: inputData.phone ?? null,
      email: inputData.email ?? null,
      status: inputData.status ?? null,
      createdAt: inputData.createdAt ? {
        start: inputData.createdAt.start ? new Date(inputData.createdAt.start) : null,
        end: inputData.createdAt.end ? new Date(inputData.createdAt.end) : null,
      } : undefined,
    });
  }
  obtenerDatos(form: OrderFiltersForm): OrderFilters {
    const rawValue = form.getRawValue();
    return {
      username: rawValue.username ?? null,
      phone: rawValue.phone ?? null,
      email: rawValue.email ?? null,
      status: rawValue.status ?? null,
      createdAt: rawValue.createdAt ? {
        start: rawValue.createdAt.start ? rawValue.createdAt.start.getTime() : null,
        end: rawValue.createdAt.end ? rawValue.createdAt.end.getTime() : null,
      } : null,
    };
  }
  reset(form: OrderFiltersForm): void {
    form.reset();
  }

}
