import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

export const manufacturerGuard: CanActivateFn = () => {
  return inject(CurrentUserService).isManufacturer();
};
