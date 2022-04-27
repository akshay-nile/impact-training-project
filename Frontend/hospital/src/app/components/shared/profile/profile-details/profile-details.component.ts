import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() user: any;

  form!: FormGroup;
  editMode = false;

  constructor(
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  get today() {
    let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
    let date = new Date(Date.now().valueOf() - miliSeconds);
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      employeeId: [this.user.employeeId],
      title: [this.user.title],
      firstName: [this.user.firstName, [Validators.required, noSpaceValidator]],
      lastName: [this.user.lastName, [Validators.required, noSpaceValidator]],
      email: [this.user.email],
      role: [this.user.role],
      birthdate: [this.user.birthdate, [Validators.required]],
      specialization: [this.user.specialization]
    });
    this.setEditMode(false);
  }

  f(field: string) {
    return this.form.controls[field];
  }

  updateProfileDetails() {
    let employee = this.form.getRawValue();
    employee['password'] = this.user.password;
    this.adminService.updateEmployee(employee, "update").subscribe(res => {
      if (res) {
        this.user = res;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.setEditMode(false);
        this.snackbar.open("Profile Details Successfully Updated !", "", { duration: 3000 });
      } else alert(res);
    });
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
    for (let field of 'title firstName lastName birthdate specialization'.split(' ')) {
      mode ? this.f(field).enable() : this.f(field).disable();
    }
  }
}
