import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  patientVisitForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    console.log(this.patientVisitForm.value);
    this.patientVisitForm.reset();

  }

}
