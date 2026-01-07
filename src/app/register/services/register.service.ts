import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';
import { UpdateUserDB, User, UserDB } from '../../core/models/User';
import { AddManufacturerDB, Manufacturer, UpdateManufacturerDB } from '../../core/models/Manufacturer';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { InsertOneResult } from '../../core/models/InsertOneResult';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../shared/components/toast/toast.service';
import { ToastTypes } from '../../shared/components/toast/toastData';

export type RegisterData = {
  name: string;
  email: string;
  phone: string;
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
  private readonly toastService = inject(ToastService);

  register(registerData: RegisterData): Observable<InsertOneResult> {
    if (registerData.manufacturer) {
      const manufacturer: AddManufacturerDB = {
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
      );
    }
    const userData: Partial<UserDB> = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    };
    return this.createUser(userData);
  }

  update(userId: User['uuid'], manufacturerId: Manufacturer['uuid'], registerData: RegisterData, destroyRef: DestroyRef): void{
    const userData: UpdateUserDB = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
    };
    this.updateUser( userId, userData).pipe(takeUntilDestroyed(destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Actualización exitosa', 'Tu cuenta ha sido actualizada correctamente');
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al actualizar', 'Ha ocurrido un error al actualizar tu cuenta');
      }
    });
    const manufacturerFormData = registerData.manufacturer;
    if (manufacturerFormData) {
      const manufacturerData: UpdateManufacturerDB = {
        name: manufacturerFormData.name,
        phone: manufacturerFormData.phone,
        email: manufacturerFormData.email,
        address: manufacturerFormData.address,
        description: manufacturerFormData.description,
        image: manufacturerFormData.image,
      };
      this.manufacturerService.updateManufacturer(manufacturerId, manufacturerData).pipe(takeUntilDestroyed(destroyRef)).subscribe();
    }
  }

  private createUser(userData: Partial<UserDB>): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, userData);
  }

  private updateUser(userId: User['uuid'], userData: Partial<UserDB>): Observable<void> {
    return this.http.put<void>(this.url + '/' + userId, userData);
  }
}

