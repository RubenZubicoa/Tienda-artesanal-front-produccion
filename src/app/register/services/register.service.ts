import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';
import { UserDB } from '../../core/models/User';
import { Manufacturer } from '../../core/models/Manufacturer';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { InsertOneResult } from '../../core/models/InsertOneResult';

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  manufacturer?: {
    name: string;
    phone: string;
    email: string;
    address: string;
    description?: string;
    image?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.USERS_URL;
  private readonly manufacturerService = inject(ManufacturerService);

  register(registerData: RegisterData): Observable<InsertOneResult> {
    if (registerData.manufacturer) {
      const manufacturer: Manufacturer = {
        uuid: '',
        name: registerData.manufacturer.name,
        phone: registerData.manufacturer.phone,
        email: registerData.manufacturer.email,
        address: registerData.manufacturer.address,
        description: registerData.manufacturer.description,
        image: registerData.manufacturer.image
      };
      return this.manufacturerService.createManufacturer(manufacturer).pipe(
        switchMap((rowInserted: InsertOneResult) => {
          return this.createUser({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            manufacturerId: rowInserted.insertedId
          });
        }),
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
    }
    const userData: Partial<UserDB> = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    };
    return this.createUser(userData);
  }

  private createUser(userData: Partial<UserDB>): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, userData);
  }
}

