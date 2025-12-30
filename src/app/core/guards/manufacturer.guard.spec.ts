import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { manufacturerGuard } from './manufacturer.guard';

describe('manufacturerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => manufacturerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
