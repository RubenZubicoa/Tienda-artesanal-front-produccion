import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersContainerComponent } from '../../../shared/components/filters-container/filters-container.component';
import { OrderFilters, OrderStatus } from '../../../core/models/Order';
import { ORDERS_CHIPS } from '../../models/orders.chips';
import { OrderFiltersFormService } from '../../services/order-filters-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-order-filters',
  imports: [CommonModule, FiltersContainerComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,],
  templateUrl: './order-filters.component.html',
  styleUrl: './order-filters.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class OrderFiltersComponent {
  public readonly formService = inject(OrderFiltersFormService);
  
  public applyFilters = output<OrderFilters>(); 

  public filters: OrderFilters | undefined = undefined;
  public readonly chips = ORDERS_CHIPS;
  public readonly statuses = Object.values(OrderStatus);

  ngOnInit(): void {
    this.filters = this.formService.obtenerDatos(this.formService.form);
  }

  applyFiltersClick() {
    this.filters = this.formService.obtenerDatos(this.formService.form);
    this.applyFilters.emit(this.filters);
  }

  clearFiltersClick() {
    this.formService.reset(this.formService.form);
    this.filters = undefined;
    this.applyFilters.emit({});
  }

  removeFilter(filters: OrderFilters | undefined) {
    if (filters !== undefined) {
      this.filters = filters;
      this.formService.actualizarFormulario(this.formService.form, filters);
      this.applyFiltersClick();
    }
  }
}
