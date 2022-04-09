import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'employee-tab',
  templateUrl: './employee-tab.component.html',
  styleUrls: ['./employee-tab.component.css']
})
export class EmployeeTabComponent implements OnInit {
  form!: FormGroup;
  emailExists = false;
  titles = 'Mr Ms Mrs Dr'.split(' ');
  roles = 'DOCTOR NURSE ADMIN'.split(' ');
  buttonLabel = 'Register';

  constructor(
    private utilityService: UtilityService,
    private adminService: AdminService,
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

  get role() {
    return this.form.controls.role;
  }

  get spec() {
    return this.form.controls.specialization;
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

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.maxLength(10)]),
      role: new FormControl('', [Validators.required]),
    });
    this.onRoleSelect();
  }

  onEmailEntered() {
    if (this.email.valid) {
      this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
    }
  }

  onRoleSelect() {
    this.role.value === 'DOCTOR' ? this.spec.enable() : this.spec.disable();
  }

  registerEmployee() {
    console.log(this.form.value);
    this.buttonLabel = "Registering..."

    this.adminService.registerEmployee(this.form.value).subscribe(res => {
      this.buttonLabel = 'Register';
      if (res != null && res.employeeId > 0) {
          this.form.reset();
          alert('Registration was successful!');
        } else { 
          alert('Registration failed.');
        }
    });
  }

}
