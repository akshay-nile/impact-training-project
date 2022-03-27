import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencycontactinfoComponent } from './emergencycontactinfo.component';

describe('EmergencycontactinfoComponent', () => {
  let component: EmergencycontactinfoComponent;
  let fixture: ComponentFixture<EmergencycontactinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencycontactinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencycontactinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
