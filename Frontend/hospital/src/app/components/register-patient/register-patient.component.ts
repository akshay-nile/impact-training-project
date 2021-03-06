import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { UtilityService } from 'src/app/services/utility.service';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  form!: FormGroup;
  emailExists = false;
  phoneExists = false;
  titles = 'Mr Ms Mrs Dr'.split(' ');
  message = '';

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private registrationService: RegistrationService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  get today() {
    let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
    let date = new Date(Date.now().valueOf() - miliSeconds);
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  get email() {
    return this.form.controls.email;
  }

  get phone() {
    return this.form.controls.phone;
  }

  get title() {
    return this.form.controls.title;
  }

  get first() {
    return this.form.controls.firstName;
  }

  get last() {
    return this.form.controls.lastName;
  }

  get dob() {
    return this.form.controls.birthdate;
  }

  get pass() {
    return this.form.controls.password;
  }

  get cpass() {
    return this.form.controls.confirmPass;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      firstName: new FormControl('', [Validators.required, noSpaceValidator]),
      lastName: new FormControl('', [Validators.required, noSpaceValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('+91 ', [Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]),
      birthdate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPass: new FormControl('', [Validators.required])
    }, confirmPassword('password', 'confirmPass'));
  }

  onEmailEntered() {
    if (this.email.valid) {
      this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
    }
  }

  onPhoneEntered() {
    if (this.phone.valid) {
      this.utilityService.phoneExists(this.form.value.phone).subscribe(res => this.phoneExists = res);
    }
  }

  registerPatient() {
    let formData = this.form.getRawValue();
    let patient = {nominee: null, demographics: null};
    for(let field of 'title firstName lastName email phone birthdate password'.split(' ')) {
      patient[field] = formData[field];
    }
    this.registrationService.registerPatient(patient).subscribe(res => {
      if (res != null) {
        this.form.reset();
        alert('Registration was successful !');
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    });
  }

}
