import { Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { MeetingPointsService } from '../../../meeting-points/services/meeting-points.service';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarritoService } from '../../services/carrito.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-meeting-point',
  imports: [CommonModule, MatSelectModule, MatIconModule],
  templateUrl: './select-meeting-point.component.html',
  styleUrl: './select-meeting-point.component.scss'
})
export class SelectMeetingPointComponent implements OnInit {

  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly carritoService = inject(CarritoService);
  private readonly destroyRef = inject(DestroyRef);

  public disabledForm = input<boolean>(false);
  public manufacturersIds = signal<Manufacturer['uuid'][]>([]);
  public selectedMeetingPoint = output<{ manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid'] }>();

  public data: Record<Manufacturer['uuid'], MeetingPoint[]> = {};

  ngOnInit(): void {
    const manufacturersIds = Object.keys(this.carritoService.getProductsCartByManufacturer());
    this.manufacturersIds.set(manufacturersIds);
    manufacturersIds.forEach(manufacturerId => {
      this.meetingPointsService.getMeetingPointsByManufacturer(manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(meetingPoints => {
        console.log(manufacturersIds, meetingPoints);
        this.data[manufacturerId] = meetingPoints;
      });
    });
  }

  public onChangeMeetingPoint(manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid']): void {
    console.log(manufacturerId, meetingPointId);
    this.selectedMeetingPoint.emit({ manufacturerId, meetingPointId });
  }

}
