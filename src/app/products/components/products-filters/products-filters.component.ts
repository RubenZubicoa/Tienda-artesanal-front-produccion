import { Component, inject, input, output } from '@angular/core';
import { ProductsFormFiltersService } from '../../services/products-form-filters.service';
import { CommonModule } from '@angular/common';
import { FiltersContainerComponent } from '../../../shared/components/filters-container/filters-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProductFilters } from '../../../core/models/Product';
import { PRODUCTS_CHIPS } from '../../models/products-chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-products-filters',
  imports: [CommonModule, FiltersContainerComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatSliderModule, MatSlideToggleModule, FormsModule],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss'
})
export class ProductsFiltersComponent {
  public readonly formService = inject(ProductsFormFiltersService);
  
  public maxPrice = input<number>(100);
  public applyFilters = output<ProductFilters>(); 

  public filters: ProductFilters | undefined = undefined;
  public readonly chips = PRODUCTS_CHIPS;
  public startPrice = 0;
  public endPrice = 100;

  ngOnInit(): void {
    this.filters = this.formService.obtenerDatos(this.formService.form);
  }

  applyFiltersClick() {
    this.filters = this.formService.obtenerDatos(this.formService.form);
    this.filters.price = {
      start: this.startPrice,
      end: this.endPrice,
    };
    this.applyFilters.emit(this.filters);
  }

  clearFiltersClick() {
    this.formService.reset(this.formService.form);
    this.filters = undefined;
    this.applyFilters.emit({});
  }

  removeFilter(filters: ProductFilters | undefined) {
    if (filters !== undefined) {
      this.filters = filters;
      this.formService.actualizarFormulario(this.formService.form, filters);
      this.applyFiltersClick();
    }
  }

  priceChange(event: Event) {
    console.log(event);
  }
}
