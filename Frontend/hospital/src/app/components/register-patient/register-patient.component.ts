import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { UtilityService } from 'src/app/services/utility.service';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';

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
  today = '2004-03-31';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private registrationService: RegistrationService,
  ) { }
  
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
    this.form = this.formBuilder.group({
      title: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['+91 ' ,[Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPass: ['', [Validators.required]],
    }, confirmPassword('password','confirmPass'));
  }

  onEmailEntered() {
    if(this.email.valid) {
      this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
    }
  }

  onPhoneEntered() {
    if(this.phone.valid) {
      this.utilityService.phoneExists(this.form.value.phone).subscribe(res => this.phoneExists = res);
    }
  }

  registerPatient() {
    this.registrationService.registerPatient(this.form.value).subscribe(res => {
      if(res != null) {
        alert('Registration was successful !');
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    });
  }

}
