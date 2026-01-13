import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { mapManufacturerToCardData } from '../../../shared/components/card/card.models';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from '../../../shared/components/map/map.component';
import { getLocationFromAddress } from '../../../shared/utils/geocoder';
import { MapMarker } from '../../../shared/components/map/map.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManufacturersDialogComponent } from '../../components/manufacturers-dialog/manufacturers-dialog.component';
import { ManufacturerService } from '../../services/manufacturer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { getCurrentLocation, getDistanceBetweenCoordinates } from '../../../shared/utils/location';
import { ManufacturerFilters, ManufacturerWithLocation } from '../../../core/models/Manufacturer';

@Component({
  selector: 'app-manufacturers',
  imports: [
    CardComponent,
    CommonModule,
    BreadcrumbsComponent,
    MatButtonToggleModule,
    MatIconModule,
    MapComponent,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss',
})
export class ManufacturersComponent {
  public view = signal<'map' | 'list'>('map');

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly manufacturerService = inject(ManufacturerService);

  public manufacturers = toSignal(this.manufacturerService.getManufacturers());
  public manufacturersLocations = signal<ManufacturerWithLocation[]>([]);
  public markers = computed(() => this.manufacturersLocations().map(manufacturer => manufacturer.marker));
  public manufacturersCards = computed(() =>
    this.manufacturersLocations()?.map(mapManufacturerToCardData)
  );
  public currentLocation = signal<{ lat: number, lng: number } | null>(null);
  public filters = signal<ManufacturerFilters>({ maxDistance: 20 });

  constructor() {
    getCurrentLocation().then(currentLocation => {
      this.currentLocation.set(currentLocation);
    });
    effect(
      () => {
        this.manufacturers()?.forEach((manufacturer) => {
          getLocationFromAddress(manufacturer.address ?? '').then(
            (location) => {
              const distance = getDistanceBetweenCoordinates(this.currentLocation() ?? { lat: 0, lng: 0 }, location ?? { lat: 0, lng: 0 });
              if (distance <= this.filters().maxDistance!) {
                manufacturer.latitude = location?.lat;
                manufacturer.longitude = location?.lng;
                const marker: MapMarker = {
                  id: manufacturer.uuid,
                  lat: location?.lat ?? 0,
                  lng: location?.lng ?? 0,
                  isClickable: true,
                };
                this.manufacturersLocations.set([
                  ...this.manufacturersLocations(),
                  {
                    ...manufacturer,
                    marker,
                  },
                ]);
              }
            }
          );
        });
      },
      { allowSignalWrites: true }
    );
  }

  public goToManufacturersDetails(manufacturerId: string) {
    this.router.navigate(['/manufacturers', manufacturerId]);
  }

  public toggleView(view: 'map' | 'list') {
    this.view.set(view);
  }

  public showManufacturersDetails(manufacturerId: string) {
    const manufacturer = this.manufacturers()?.find(
      (manufacturer) => manufacturer.uuid === manufacturerId
    );
    if (manufacturer) {
      this.dialog.open(ManufacturersDialogComponent, {
        data: {
          manufacturer: manufacturer,
        },
      });
    }
  }
}
