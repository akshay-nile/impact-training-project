import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  user: any;
  patientVisitForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (this.user.demographics == null || this.user.nominee == null || this.user.allergy == null) {
      setTimeout(() => {
        alert("Please complete your profile first !")
        this.router.navigate(['patient', 'dashboard', 'profile']);
      }, 500);
    }
    
    this.patientVisitForm = this.formBuilder.group({
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      blood_pressure: new FormControl('', [Validators.required]),
      body_temperature: new FormControl('', [Validators.required]),
      respiration_rate: new FormControl('', [Validators.required])
    })
  }

  get height() {
    return this.patientVisitForm.get('height');
  }
  get weight() {
    return this.patientVisitForm.get('weight');
  }
  get blood_pressure() {
    return this.patientVisitForm.get('blood_pressure');
  }
  get body_temperature() {
    return this.patientVisitForm.get('body_temperature');
  }
  get respiration_rate() {
    return this.patientVisitForm.get('respiration_rate');
  }
  
  cancel() {
    this.patientVisitForm.reset();

  }

}
