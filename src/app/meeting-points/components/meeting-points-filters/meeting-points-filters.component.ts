import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FiltersContainerComponent } from '../../../shared/components/filters-container/filters-container.component';
import { MeetingPointFilters } from '../../../core/models/MeetingPoint';
import { MEETING_POINTS_CHIPS } from '../../models/meeting-points-chips';
import { MeetingPointsFiltersFormService } from '../../services/meeting-points-filters-form.service';

@Component({
  selector: 'app-meeting-points-filters',
  imports: [CommonModule, FiltersContainerComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,],
  templateUrl: './meeting-points-filters.component.html',
  styleUrl: './meeting-points-filters.component.scss'
})
export class MeetingPointsFiltersComponent {
  public readonly formService = inject(MeetingPointsFiltersFormService);
  
  public applyFilters = output<MeetingPointFilters>(); 

  public filters: MeetingPointFilters | undefined = undefined;
  public readonly chips = MEETING_POINTS_CHIPS;

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

  removeFilter(filters: MeetingPointFilters | undefined) {
    if (filters !== undefined) {
      this.filters = filters;
      this.formService.actualizarFormulario(this.formService.form, filters);
      this.applyFiltersClick();
    }
  }
}
