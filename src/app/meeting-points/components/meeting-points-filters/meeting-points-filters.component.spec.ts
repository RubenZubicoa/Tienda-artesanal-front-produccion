import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPointsFiltersComponent } from './meeting-points-filters.component';

describe('MeetingPointsFiltersComponent', () => {
  let component: MeetingPointsFiltersComponent;
  let fixture: ComponentFixture<MeetingPointsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingPointsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingPointsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
