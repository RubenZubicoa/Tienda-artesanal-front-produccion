import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { getStatusLabel, Order, OrderStatus } from '../../../core/models/Order';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
  selector: 'app-order-data',
  imports: [CommonModule],
  templateUrl: './order-data.component.html',
  styleUrl: './order-data.component.scss'
})
export class OrderDataComponent {
  private readonly currentUserService = inject(CurrentUserService);
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);

  public order = input.required<Order>();
  public manufacturer = signal<Manufacturer | undefined>(undefined);

  public isTheManufacturer = computed(() => this.currentUserService.currentUser()?.manufacturerId === this.order().manufacturerId);

  constructor(){
    effect(() => {
      this.manufacturerService.getManufacturer(this.order().manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturer => {
        this.manufacturer.set(manufacturer);
      });
    }, { allowSignalWrites: true });
  }

  getStatusLabel(status: OrderStatus): string {
    return getStatusLabel(status);
  }

}
