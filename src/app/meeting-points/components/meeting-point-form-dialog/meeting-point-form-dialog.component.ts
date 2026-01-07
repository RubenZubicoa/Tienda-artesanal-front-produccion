import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from '../../../shared/components/map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingPointsFormService } from '../../services/meeting-points-form.service';
import { MapMarker } from '../../../shared/components/map/map.models';
import { MeetingPointsService } from '../../services/meeting-points.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { AddMeetingPointDB, MeetingPoint, UpdateMeetingPointDB } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-meeting-point-form-dialog',
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MapComponent, ReactiveFormsModule],
  templateUrl: './meeting-point-form-dialog.component.html',
  styleUrl: './meeting-point-form-dialog.component.scss'
})
export class MeetingPointFormDialogComponent implements OnInit {
  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly meetingPointsFormService = inject(MeetingPointsFormService);
  private readonly toastService = inject(ToastService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly dialogRef = inject(MatDialogRef<MeetingPointFormDialogComponent>);
  private readonly destroyRef = inject(DestroyRef);
  public readonly data = inject<{ meetingPoint?: MeetingPoint }>(MAT_DIALOG_DATA);

  public form = this.meetingPointsFormService.crearFormulario();

  public marker = signal<MapMarker | undefined>(undefined);
  public isUpdateMode = signal<boolean>(false);

  ngOnInit(): void {
    if (this.data.meetingPoint) {
      this.isUpdateMode.set(true);
      this.meetingPointsFormService.actualizarFormulario(this.form, this.data.meetingPoint);
      this.marker.set({
        id: '1',
        lat: this.data.meetingPoint.location.latitude,
        lng: this.data.meetingPoint.location.longitude,
      });
    }
  }

  public onMapClick(event: { lat: number, lng: number }): void {
    this.marker.set({
      id: '1',
      lat: event.lat,
      lng: event.lng,
      isClickable: true,
      draggable: true,
    });
  }

  public saveMeetingPoint(): void {
    const location = this.marker();
    if (!location) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al crear punto de encuentro', 'No se ha seleccionado un punto en el mapa');
      return;
    }
    const manufacturerId = this.currentUserService.currentManufacturer()?.uuid ?? '';
    if (!manufacturerId) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al crear punto de encuentro', 'No se ha seleccionado un fabricante');
      return;
    }
    const formData = this.meetingPointsFormService.obtenerDatos(this.form);
    const meetingPoint: AddMeetingPointDB = {
      name: formData.name,
      description: formData.description,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
      manufacturerId: manufacturerId,
    };

    if (this.isUpdateMode()) {
      this.updateMeetingPoint(this.data.meetingPoint?.uuid ?? '', meetingPoint);
    } else {
      this.createMeetingPoint(meetingPoint);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  private createMeetingPoint(meetingPoint: AddMeetingPointDB): void {
    this.meetingPointsService.createMeetingPoint(meetingPoint).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Punto de encuentro creado', 'El punto de encuentro ha sido creado correctamente');
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al crear punto de encuentro', 'El punto de encuentro no ha sido creado');
      }
    });
  }

  private updateMeetingPoint( meetingPointId: MeetingPoint['uuid'], meetingPoint: UpdateMeetingPointDB): void {
    this.meetingPointsService.updateMeetingPoint(meetingPointId, meetingPoint).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Punto de encuentro actualizado', 'El punto de encuentro ha sido actualizado correctamente');
        this.dialogRef.close(true);
      },
    });
  }
}
