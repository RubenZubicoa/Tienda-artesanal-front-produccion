import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

export const userGuard: CanActivateFn = () => {
  return inject(CurrentUserService).currentUser() !== undefined;
};
