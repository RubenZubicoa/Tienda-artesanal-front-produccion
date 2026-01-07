import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MEETING_POINTS_COLUMNS } from '../../models/meeting-points-columns';
import { map } from 'rxjs';
import { mapMeetingPointToMeetingPoint, MeetingPoint } from '../../../core/models/MeetingPoint';
import { MeetingPointsService } from '../../services/meeting-points.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { MeetingPointDetailsDialogComponent } from '../../components/meeting-point-details-dialog/meeting-point-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-points',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent],
  templateUrl: './meeting-points.component.html',
  styleUrl: './meeting-points.component.scss'
})
export class MeetingPointsComponent implements OnInit {
  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  public readonly columns = MEETING_POINTS_COLUMNS;
  public meetingPoints = signal<MeetingPoint[]>([]);

  ngOnInit(): void {
    if (this.currentUserService.isManufacturer()) {
      this.getMeetingPoints();
    } else {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener puntos de encuentro', 'No tienes un fabricante asociado, por favor contacta al administrador o inicia sesión como fabricante');
    }
  }

  public openMeetingPointDetailsDialog(meetingPoint: MeetingPoint) {
    this.dialog.open(MeetingPointDetailsDialogComponent, {
      data: { meetingPoint },
    });
  }

  private getMeetingPoints(){
    this.meetingPointsService.getMeetingPointsByManufacturer(this.currentUserService.currentManufacturer()?.uuid ?? '').pipe(
      map((data) => data.map(mapMeetingPointToMeetingPoint))
    ).subscribe({
      next: (data) => {
        this.meetingPoints.set(data);
      },
    });
  }
}
