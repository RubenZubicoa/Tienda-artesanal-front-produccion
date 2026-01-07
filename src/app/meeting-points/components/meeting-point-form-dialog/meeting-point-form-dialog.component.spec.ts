import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPointFormDialogComponent } from './meeting-point-form-dialog.component';

describe('MeetingPointFormDialogComponent', () => {
  let component: MeetingPointFormDialogComponent;
  let fixture: ComponentFixture<MeetingPointFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingPointFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingPointFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
