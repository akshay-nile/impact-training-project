import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientDetails } from '../../models/patient-details';
import { PatientDetailsService } from '../../services/patient-details.service';

@Component({
  selector: 'patient-demographics',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class DemographicsComponent implements OnInit {
  patientdetailsForm!: FormGroup;
  patientdetails!: PatientDetails[];
  pd!: PatientDetails;
  error!: string;
  ; constructor(private formBuilder: FormBuilder, private patientDetailsService: PatientDetailsService) { }

  ngOnInit(): void {
    this.patientdetailsForm = this.formBuilder.group({

      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      race: new FormControl('', [Validators.required]),
      ethnicity: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })

  }
  get firstname() {
    return this.patientdetailsForm.get('firstname');
  }
  get lastname() {
    return this.patientdetailsForm.get('lastname');
  }
  get gender() {
    return this.patientdetailsForm.get('gender');
  }
  get dob() {
    return this.patientdetailsForm.get('dob');
  }
  get age() {
    return this.patientdetailsForm.get('age');
  }
  get email() {
    return this.patientdetailsForm.get('email');
  }
  get phone() {
    return this.patientdetailsForm.get('phone');
  }
  get race() {
    return this.patientdetailsForm.get('race');
  }
  get ethnicity() {
    return this.patientdetailsForm.get('ethnicity');
  }
  get address() {
    return this.patientdetailsForm.get('address');
  }

  getAllPatientDetails() {
    this.patientDetailsService.getPatientDetails().subscribe(
      (data: PatientDetails[]) => this.patientdetails = data, error => this.error = error)
    console.log(this.patientdetails);
  }
  onSubmit() {
    console.log(this.patientdetailsForm.value);
    this.patientDetailsService.addPatientDetails(this.patientdetailsForm.value)
      .subscribe(data => this.patientdetails.push(data));
    alert("Patient details added succeessfully");
    this.patientdetailsForm.reset();
  }
  cancel() {
    this.patientdetailsForm.reset();
  }

  updatePatientDetails(id: number = 1) {
    this.patientDetailsService.getPatientDetailsById(id).subscribe(data => this.pd = data);

  }


}






