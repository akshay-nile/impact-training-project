import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionAppointmentComponent } from './data-collection-appointment.component';

describe('DataCollectionAppointmentComponent', () => {
  let component: DataCollectionAppointmentComponent;
  let fixture: ComponentFixture<DataCollectionAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCollectionAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectionAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
