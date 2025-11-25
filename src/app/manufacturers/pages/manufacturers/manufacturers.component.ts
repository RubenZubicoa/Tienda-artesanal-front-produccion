import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
import { Manufacturer } from '../../../core/models/Manufacturer';
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

@Component({
  selector: 'app-manufacturers',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent, MatButtonToggleModule, MatIconModule, MapComponent, RouterModule, MatDialogModule  ],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss'
})
export class ManufacturersComponent implements OnInit {

  public manufacturers = signal<Manufacturer[]>(MANUFACTURERS_LIST);
  public manufacturersLocations = signal<MapMarker[]>([]);

  public manufacturersCards = computed(() => this.manufacturers().map(mapManufacturerToCardData));
  public view = signal<'map' | 'list'>('map');

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  
  ngOnInit(): void {
    this.manufacturers().forEach(manufacturer => {
      getLocationFromAddress(manufacturer.city ?? '').then(location => {
        manufacturer.latitude = location?.lat;
        manufacturer.longitude = location?.lng;
        this.manufacturersLocations.set([...this.manufacturersLocations(), {id: manufacturer.uuid, lat: location?.lat ?? 0, lng: location?.lng ?? 0 }]);
      });
    });
  }
  
  public goToManufacturersDetails(manufacturerId: string) {
    this.router.navigate(['/manufacturers', manufacturerId]);
  }

  public toggleView(view: 'map' | 'list') {
    this.view.set(view);
  }

  public showManufacturersDetails(manufacturerId: string) {
    this.dialog.open(ManufacturersDialogComponent, {
      data: {
        manufacturerId: manufacturerId
      }
    });
  }
}
