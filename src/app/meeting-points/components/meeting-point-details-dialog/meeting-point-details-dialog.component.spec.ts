import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPointDetailsDialogComponent } from './meeting-point-details-dialog.component';

describe('MeetingPointDetailsDialogComponent', () => {
  let component: MeetingPointDetailsDialogComponent;
  let fixture: ComponentFixture<MeetingPointDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingPointDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingPointDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
