import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { MapComponent } from '../../../shared/components/map/map.component';
import { MapMarker } from '../../../shared/components/map/map.models';

@Component({
  selector: 'app-meeting-point-details-dialog',
  imports: [CommonModule, MatDialogModule, MapComponent],
  templateUrl: './meeting-point-details-dialog.component.html',
  styleUrl: './meeting-point-details-dialog.component.scss'
})
export class MeetingPointDetailsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MeetingPointDetailsDialogComponent>);
  public readonly data = inject<{ meetingPoint: MeetingPoint }>(MAT_DIALOG_DATA);

  public readonly marker: MapMarker = {
    id: '1',
    lat: this.data.meetingPoint.location.latitude,
    lng: this.data.meetingPoint.location.longitude,
    isClickable: false,
    draggable: false,
  };
}
