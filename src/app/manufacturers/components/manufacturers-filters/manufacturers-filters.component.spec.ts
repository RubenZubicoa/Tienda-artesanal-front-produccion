import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersFiltersComponent } from './manufacturers-filters.component';

describe('ManufacturersFiltersComponent', () => {
  let component: ManufacturersFiltersComponent;
  let fixture: ComponentFixture<ManufacturersFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturersFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
