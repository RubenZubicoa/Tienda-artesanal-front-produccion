import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { SgdeRequest } from '../../../serie/models/request';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startLoading', () => {
    it('deberia de añadir la request a pendingRequests', () => {
      const req: SgdeRequest = {
        id: 'test',
        method: 'GET',
      };

      service.startLoading(req);

      expect(service.pendingRequests()).toEqual([req]);
    });
  });

  describe('stopLoading', () => {
    it('deberia de quitar la request de pendingRequests', () => {
      const req: SgdeRequest = {
        id: 'test',
        method: 'GET',
      };

      service.pendingRequests.set([req]);

      service.stopLoading(req);

      expect(service.pendingRequests()).toEqual([]);
    });

    it('si la peticion no existe no deberia de hacer nada', () => {
      const req: SgdeRequest = {
        id: 'test',
        method: 'GET',
      };

      service.pendingRequests.set([req]);

      service.stopLoading({id: 'Test2'});

      expect(service.pendingRequests()).toEqual([req]);
    });
  });
});
