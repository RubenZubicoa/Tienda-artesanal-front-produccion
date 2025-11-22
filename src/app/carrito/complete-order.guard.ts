import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CarritoService } from './services/carrito.service';

export const completeOrderGuard: CanActivateFn = (route, state) => {
  return !inject(CarritoService).isEmpty();
};
