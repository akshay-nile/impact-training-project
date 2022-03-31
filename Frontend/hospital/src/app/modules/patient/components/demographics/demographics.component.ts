import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { PatientDetails } from '../../models/patient-details';
import { DemographicsService } from '../../services/demographics.service';

@Component({
  selector: 'patient-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {
  form!: FormGroup;
  patientdetails!: PatientDetails[];
  pd!: PatientDetails;
  error!: string;
  languages: string[] = [];
  user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private demographicsService: DemographicsService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilityService.getLanguages().subscribe(res => this.languages = res);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    
    this.form = <FormGroup>this.formBuilder.group({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      gender: new FormControl(this.guessGender(), [Validators.required]),
      birthdate: new FormControl(this.user.birthdate, [Validators.required]),
      age: new FormControl(this.calcAge(), [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]),
      race: new FormControl('', [Validators.required]),
      ethnicity: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    for (let control of 'firstName lastName birthdate email phone age'.split(' ')) {
      this.form.controls[control].disable();
    }
  }

  get firstName() {
    return this.form.controls.firstName;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get gender() {
    return this.form.controls.gender;
  }
  get dob() {
    return this.form.controls.birthdate;
  }
  get age() {
    return this.form.controls.age;
  }
  get email() {
    return this.form.controls.email;
  }
  get phone() {
    return this.form.controls.phone;
  }
  get language() {
    return this.form.controls.language;
  }
  get race() {
    return this.form.controls.race;
  }
  get ethnicity() {
    return this.form.controls.ethnicity;
  }
  get address() {
    return this.form.controls.address;
  }

  guessGender() {
    if (this.user.title === 'Mr') return 'MALE';
    if (this.user.title === 'Ms' || this.user.title === 'Mrs') return 'FEMALE'
    return '';
  }

  calcAge() {
    let miliSeconds = (Date.now().valueOf() - new Date(this.user.birthdate).valueOf()).valueOf();
    return Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 / 12);
  }

  updateDemographics() {
    if (!this.user.demographics) this.user.demographics = {};
    for (let control of 'age gender race ethnicity language address'.split(' ')) {
      let wasDisabled = this.age.disabled;
      this.age.enable()
      this.user.demographics[control] = this.form.value[control];
      if (wasDisabled) this.age.disable();
    }
    this.demographicsService.updateDemographics(this.user).subscribe(res => {
      if (!res) return;
      alert('Successfully Updated!')
      this.form.reset();
      this.router.navigate(['patient', 'nominee']);
    }, err => alert(err));
  }

  clear() {
    for (let control of 'language race ethnicity address'.split(' ')) {
      this.form.controls[control].reset();
    }
  }

}






