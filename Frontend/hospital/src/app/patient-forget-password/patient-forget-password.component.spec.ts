import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientForgetPasswordComponent } from './patient-forget-password.component';

describe('PatientForgetPasswordComponent', () => {
  let component: PatientForgetPasswordComponent;
  let fixture: ComponentFixture<PatientForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
