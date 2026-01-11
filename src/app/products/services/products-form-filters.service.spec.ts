import { TestBed } from '@angular/core/testing';

import { ProductsFormFiltersService } from './products-form-filters.service';

describe('ProductsFormFiltersService', () => {
  let service: ProductsFormFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFormFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
