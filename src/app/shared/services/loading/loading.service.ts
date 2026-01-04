import { HttpRequest } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { TiendaRequest } from '../../../core/models/TiendaRequest';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public pendingRequests = signal<TiendaRequest[]>([]);

  startLoading(req: TiendaRequest) {
    this.pendingRequests.update((requests) => {
      requests.push(req);
      return requests;
    });
  }

  stopLoading(req: TiendaRequest) {
    this.pendingRequests.update((requests) => {
      const index = requests.findIndex((value) => {
        if (value.id === req.id && value.method === req.method){
          return value;
        }
        return undefined;
      });
      if (index !== -1){
        requests.splice(index, 1)
      }
      return requests;
    });
  }
}
