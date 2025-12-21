import { Component, computed, effect, inject, signal } from '@angular/core';
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
  public manufacturersCards = computed(() =>
    this.manufacturers()?.map(mapManufacturerToCardData)
  );
  public manufacturersLocations = signal<MapMarker[]>([]);

  constructor() {
    effect(
      () => {
        this.manufacturers()?.forEach((manufacturer) => {
          getLocationFromAddress(manufacturer.address ?? '').then(
            (location) => {
              manufacturer.latitude = location?.lat;
              manufacturer.longitude = location?.lng;
              this.manufacturersLocations.set([
                ...this.manufacturersLocations(),
                {
                  id: manufacturer.uuid,
                  lat: location?.lat ?? 0,
                  lng: location?.lng ?? 0,
                },
              ]);
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
