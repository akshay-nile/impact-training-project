import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
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
  languages: string[] = [];
  user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private patientDetailsService: PatientDetailsService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilityService.getLanguages().subscribe(res => this.languages = res);
    this.user = JSON.parse(localStorage.getItem('user'));

    this.patientdetailsForm = <FormGroup>this.formBuilder.group({
      firstname: new FormControl(this.user.firstName, [Validators.required]),
      lastname: new FormControl(this.user.lastName, [Validators.required]),
      gender: new FormControl(this.user.title === 'Mr' ? 'Male' : 'Female', [Validators.required]),
      dob: new FormControl(this.user.birthdate, [Validators.required]),
      age: new FormControl(this.calcAge(this.user.birthdate), [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required,
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      race: new FormControl('', [Validators.required]),
      ethnicity: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    for (let control of 'firstname lastname dob email phone age'.split(' ')) {
      this.patientdetailsForm.controls[control].disable();
    }
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
    return this.patientdetailsForm.controls.age;
  }
  get email() {
    return this.patientdetailsForm.get('email');
  }
  get phone() {
    return this.patientdetailsForm.get('phone');
  }
  get language() {
    return this.patientdetailsForm.controls.language;
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

  calcAge(birthdate: Date) {
    let miliSeconds = (Date.now().valueOf() - new Date(birthdate).valueOf()).valueOf();
    return Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 / 12);
  }

  getAllPatientDetails() {
    this.patientDetailsService.getPatientDetails().subscribe(
      (data: PatientDetails[]) => this.patientdetails = data, error => this.error = error)
    console.log(this.patientdetails);
  }

  onSubmit() {
    const demographics = {};
    for (let control of 'age gender race ethnicity language address'.split(' ')) {
      let wasDisabled = this.age.disabled;
      this.age.enable()
      demographics[control] = this.patientdetailsForm.value[control];
      if (wasDisabled) this.age.disable();
    }
    this.user['demographics'] = demographics;
    console.log(this.user);
    this.patientDetailsService.updateDemographicDetails(this.user).subscribe(res => {
      if (!res) return;
      alert('Successfully Updated!')
      this.patientdetailsForm.reset();
      this.router.navigate(['patient', 'nominee']);
    }, err => alert(err));
  }

  clear() {
    for (let control of 'language race ethnicity address'.split(' ')) {
      this.patientdetailsForm.controls[control].reset();
    }
  }

  updatePatientDetails(id: number = 1) {
    this.patientDetailsService.getPatientDetailsById(id).subscribe(data => this.pd = data);
  }


}






