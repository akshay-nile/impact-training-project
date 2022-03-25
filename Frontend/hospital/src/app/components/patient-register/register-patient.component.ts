import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from './patient';
import { PatientService } from './patient.service';
import { Validation } from './Validation';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
  providers: [PatientService]
})
export class RegisterPatientComponent implements OnInit {

  patients: Patient[];

  registerForm!: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router,  private patientService: PatientService, private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      title: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['1993-08-14', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])[A-Za-z0-9]{8,}$'), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [Validation.match('password', 'confirmPassword')] }
    )
    this.patients = [];
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe((result) => this.patients = result);
  }

  ifPatientexist(patient: Patient): number {
    for (let p of this.patients) {
      if (p.email === patient.email)
        return 1;
      else (p.contactNumber === patient.contactNumber)
      return 2;
    }
    return 0;
  }

  registerPatient() {
    this.submitted = true;
    if (this.ifPatientexist(this.registerForm.value) == 1) {
      alert("User already exists for this email address")
    }
    else if (this.ifPatientexist(this.registerForm.value) == 2) {
      alert("User already exists for this Phone Number")
    }
    else {
      alert("Registration Successfull");
      this.patientService.addPatient(this.registerForm.value);
      this.patients.push(this.registerForm.value);
      this.registerForm.reset();
      this.router.navigate(['patient','dashboard']);
    }
  }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe((result) => this.patients = result);
  }
}
