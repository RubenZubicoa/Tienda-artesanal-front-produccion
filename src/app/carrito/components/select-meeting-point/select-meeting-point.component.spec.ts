import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMeetingPointComponent } from './select-meeting-point.component';

describe('SelectMeetingPointComponent', () => {
  let component: SelectMeetingPointComponent;
  let fixture: ComponentFixture<SelectMeetingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMeetingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMeetingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
