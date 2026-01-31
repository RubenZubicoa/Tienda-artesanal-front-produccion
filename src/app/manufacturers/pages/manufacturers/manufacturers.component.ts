import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import {
  getCurrentLocation,
  getDistanceBetweenCoordinates,
} from '../../../shared/utils/location';
import {
  Manufacturer,
  ManufacturerFilters,
  ManufacturerWithLocation,
} from '../../../core/models/Manufacturer';
import { ManufacturersFiltersComponent } from '../../components/manufacturers-filters/manufacturers-filters.component';
import { ManufacturerPageViews } from '../../models/manufacturer-page-views';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';

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
    ManufacturersFiltersComponent,
  ],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss',
})
export class ManufacturersComponent implements OnInit {
  public view = signal<ManufacturerPageViews>(ManufacturerPageViews.MAP);

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly toastService = inject(ToastService);

  public manufacturers = signal<Manufacturer[]>([]);
  public manufacturersLocations = signal<ManufacturerWithLocation[]>([]);
  public markers = computed(() =>
    this.manufacturersLocations().map((manufacturer) => manufacturer.marker)
  );
  public manufacturersCards = computed(() =>
    this.manufacturersLocations()?.map(mapManufacturerToCardData)
  );
  public currentLocation = signal<{ lat: number; lng: number } | null>(null);
  public filters = signal<ManufacturerFilters>({ maxDistance: 20 });
  public mapLocation = computed(
    () => this.filters().location ?? this.currentLocation()
  );
  public readonly views = ManufacturerPageViews;

  ngOnInit(): void {
    getCurrentLocation().then((currentLocation) => {
      this.currentLocation.set(currentLocation);
      this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
        this.manufacturers.set(manufacturers);
        this.getManufacturerLocations(manufacturers, this.filters());
      });
    }).catch((error) => {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error', 'Error al obtener la ubicación actual, por favor revise la configuración de su dispositivo o introduce una ubicación manualmente');
    });
  }

  public goToManufacturersDetails(manufacturerId: string) {
    this.router.navigate(['/manufacturers', manufacturerId]);
  }

  public toggleView(view: ManufacturerPageViews) {
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

  public applyFilters(filters: ManufacturerFilters) {
    this.filters.set(filters);
    this.getManufacturerLocations(this.manufacturers(), filters);
  }

  private getManufacturerLocations(manufacturers: Manufacturer[], filters: ManufacturerFilters) {
    const maxDistance = filters.maxDistance ?? 20;
    const mapLocation = filters.location ?? this.currentLocation();
    this.manufacturersLocations.set([]);
    manufacturers.forEach((manufacturer) => {
        if (
          manufacturer.name
            .toLowerCase()
            .includes(filters.name?.toLowerCase() ?? '') === false
        ) {
          return;
        }
      getLocationFromAddress(manufacturer.address ?? '').then((location) => {
        const distance = getDistanceBetweenCoordinates(
          mapLocation ?? { lat: 0, lng: 0 },
          location ?? { lat: 0, lng: 0 }
        );
        if (distance <= maxDistance) {
          manufacturer.latitude = location?.lat;
          manufacturer.longitude = location?.lng;
          const marker: MapMarker = {
            id: manufacturer.uuid,
            lat: location?.lat ?? 0,
            lng: location?.lng ?? 0,
            isClickable: true,
          };
          this.manufacturersLocations.update((manufacturers) => [
            ...manufacturers,
            {
              ...manufacturer,
              marker,
            },
          ]);
        }
      });
    });
  }
}
