import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersDialogComponent } from './manufacturers-dialog.component';

describe('ManufacturersDialogComponent', () => {
  let component: ManufacturersDialogComponent;
  let fixture: ComponentFixture<ManufacturersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
