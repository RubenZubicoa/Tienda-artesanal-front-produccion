import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FiltersContainerComponent } from '../../../shared/components/filters-container/filters-container.component';
import { ManufacturerFilters } from '../../../core/models/Manufacturer';
import { ManufacturersFormFiltersService } from '../../services/manufacturers-form-filters.service';
import { MANUFACTURERS_CHIPS } from '../../models/manufacturers-chips';
import { FilterChip } from '../../../shared/components/filter-chips/filter-chip';

@Component({
  selector: 'app-manufacturers-filters',
  imports: [CommonModule, FiltersContainerComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './manufacturers-filters.component.html',
  styleUrl: './manufacturers-filters.component.scss'
})
export class ManufacturersFiltersComponent {
  public readonly formService = inject(ManufacturersFormFiltersService);
  
  public applyFilters = output<ManufacturerFilters>(); 

  public filters: ManufacturerFilters | undefined = undefined;
  public readonly chips: FilterChip[] = MANUFACTURERS_CHIPS;

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

  removeFilter(filters: ManufacturerFilters | undefined) {
    if (filters !== undefined) {
      this.filters = filters;
      this.formService.actualizarFormulario(this.formService.form, filters);
      this.applyFiltersClick();
    }
  }
}
