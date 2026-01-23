import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config/api.config';
import { from, map, Observable, switchMap } from 'rxjs';
import { AddManufacturerDB, Manufacturer, ManufacturerDB, ManufacturerFilters, ManufacturerFiltersDB, mapManufacturerToManufacturer, UpdateManufacturerDB } from '../../core/models/Manufacturer';
import { InsertOneResult } from '../../core/models/InsertOneResult';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.MANUFACTURERS_URL;

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<ManufacturerDB[]>(this.url).pipe(map(manufacturers => manufacturers.map(mapManufacturerToManufacturer)));
  }

  getManufacturersByFilters(filters: ManufacturerFilters): Observable<Manufacturer[]> {
    const filtersDb: ManufacturerFiltersDB = {};
    if (filters.name) {
      filtersDb.name = filters.name;
    }
    return this.http.post<ManufacturerDB[]>(this.url + '/criteria', filtersDb).pipe(map(manufacturers => manufacturers.map(mapManufacturerToManufacturer)));
  }

  getManufacturer(manufacturerId: string): Observable<Manufacturer> {
    return this.http.get<ManufacturerDB>(this.url + '/' + manufacturerId).pipe(map(mapManufacturerToManufacturer));
  }

  createManufacturer(manufacturer: AddManufacturerDB): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, manufacturer);
  }

  updateManufacturer(manufacturerId: string, manufacturer: UpdateManufacturerDB): Observable<void> {
    return this.http.put<void>(this.url + '/' + manufacturerId, manufacturer);
  }

  deleteManufacturer(manufacturerId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + manufacturerId);
  }

  uploadManufacturerImage(manufacturerId: string, image: File, oldImage?: string): Observable<void> {
    const formData = new FormData();
    formData.append('manufacturerId', manufacturerId);
    formData.append('image', image);
    if (oldImage) {
      formData.append('oldImage', oldImage);
    }
    return this.http.post<void>(this.url + '/uploadImage', formData);
  }
}
