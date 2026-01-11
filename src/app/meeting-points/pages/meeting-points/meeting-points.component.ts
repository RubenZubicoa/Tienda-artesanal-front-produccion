import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MEETING_POINTS_COLUMNS } from '../../models/meeting-points-columns';
import { MeetingPoint, MeetingPointFilters } from '../../../core/models/MeetingPoint';
import { MeetingPointsService } from '../../services/meeting-points.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { MeetingPointDetailsDialogComponent } from '../../components/meeting-point-details-dialog/meeting-point-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MeetingPointFormDialogComponent } from '../../components/meeting-point-form-dialog/meeting-point-form-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MeetingPointsFiltersComponent } from '../../components/meeting-points-filters/meeting-points-filters.component';

@Component({
  selector: 'app-meeting-points',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent, MeetingPointsFiltersComponent],
  templateUrl: './meeting-points.component.html',
  styleUrl: './meeting-points.component.scss'
})
export class MeetingPointsComponent implements OnInit {
  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly columns = MEETING_POINTS_COLUMNS;
  public filters = signal<MeetingPointFilters>({});
  public meetingPoints = signal<MeetingPoint[]>([]);

  ngOnInit(): void {
    if (this.currentUserService.isManufacturer()) {
      this.getMeetingPoints(this.filters());
    } else {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener puntos de encuentro', 'No tienes un fabricante asociado, por favor contacta al administrador o inicia sesión como fabricante');
    }
  }

  public openMeetingPointDetailsDialog(meetingPoint: MeetingPoint) {
    this.dialog.open(MeetingPointDetailsDialogComponent, {
      data: { meetingPoint },
      width: '80vw',
      height: '90vh',
    });
  }

  public openMeetingPointFormDialog(meetingPoint?: MeetingPoint) {
    const dialogRef = this.dialog.open(MeetingPointFormDialogComponent, {
      data: { meetingPoint },
      width: '80vw',
      height: '90vh',
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result) {
        this.getMeetingPoints(this.filters());
      }
    });
  }

  public deleteMeetingPoint(meetingPoint: MeetingPoint) {
    const confirmed = confirm('¿Estás seguro de querer eliminar este punto de encuentro?');
    if (!confirmed) {
      return;
    }
    this.meetingPointsService.deleteMeetingPoint(meetingPoint.uuid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.getMeetingPoints(this.filters());
      },
    });
  }

  public applyFilters(filters: MeetingPointFilters) {
    this.filters.set(filters);
    this.getMeetingPoints(filters);
  }

  private getMeetingPoints(filters: MeetingPointFilters){
    filters.manufacturerId = this.currentUserService.currentManufacturer()?.uuid ?? '';
    this.meetingPointsService.getMeetingPointsByFilters(filters).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.meetingPoints.set(data);
      },
    });
  }


}
