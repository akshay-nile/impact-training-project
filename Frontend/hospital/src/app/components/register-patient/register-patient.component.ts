import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/validators/password.validator';
import { Patient } from './patient';
import { PatientService } from './patient.service';
import { Validation } from './Validation';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  patients: Patient[] = [];

  registerForm!: FormGroup;
  submitted: boolean = false;
  constructor(private router:Router, private patientService: PatientService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      title: new FormControl('Mr'),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: [Validation.match('password', 'confirmPassword')] }
    );
    this.patients = [];
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe((result) => this.patients = result);
  }

  ifPatientexist(patient: Patient): number {
    for (let p of this.patients) {
      if (p.email === patient.email)
        return 1;
      else if (p.contactNumber === patient.contactNumber)
        return 2;
    }
    return 0;
  }

  registerPatient() {
    this.submitted = true;
    if (this.ifPatientexist(this.registerForm.value) == 1) {
      alert("Patient already exists for this Email address")
    }
    else if (this.ifPatientexist(this.registerForm.value) == 2) {
      alert("Patient already exists for this Phone Number")
    }
    else {
      alert("Registration Successfull");
      this.patientService.addPatient(this.registerForm.value).
        subscribe((data) => this.patients.push(data));
      // this.registerForm.reset();
      // this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    // this.patientService.getAllPatients().subscribe((result) => this.patients = result);
  }
}
