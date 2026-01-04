import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { TiendaRequest } from '../models/TiendaRequest';

export const CHECK_SHOW_SPINNER = new HttpContextToken<boolean>(() => true);

export function checkShowSpinner() {
  return new HttpContext().set(CHECK_SHOW_SPINNER, false);
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_SHOW_SPINNER)) {
    const loadingService = inject(LoadingService);
    const request: TiendaRequest = { id: req.url, method: req.method };
    loadingService.startLoading(request);
    return next(req).pipe(
      finalize(() => {
        return loadingService.stopLoading(request);
      })
    );
  }
  return next(req);
};
