import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.css']
})
export class EmployeeEditDialogComponent implements OnInit {

  form!: FormGroup;
  editMode = false;

  constructor(
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  get today() {
    let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
    let date = new Date(Date.now().valueOf() - miliSeconds);
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      employeeId: new FormControl(this.data.employee.employeeId),
      title: new FormControl(this.data.employee.title, [Validators.required]),
      firstName: new FormControl(this.data.employee.firstName, [Validators.required, noSpaceValidator]),
      lastName: new FormControl(this.data.employee.lastName, [Validators.required, noSpaceValidator]),
      email: new FormControl(this.data.employee.email),
      birthdate: new FormControl(this.data.employee.birthdate, [Validators.required]),
      status: new FormControl(this.data.employee.status),
      role: new FormControl(this.data.employee.role),
      specialization: new FormControl(this.data.employee.specialization, [noSpaceValidator]),
    });
    this.form.disable();
  }

  f(field: string) {
    return this.form.controls[field];
  }

  updateOrEditEmployee(action: string) {
    if (!this.editMode && action !== 'password') {
      this.editMode = true;
      for (let field of 'title firstName lastName birthdate status role specialization'.split(' ')) {
        this.f(field).enable();
      }
      if (this.data.employee.role !== 'DOCTOR') this.f('specialization').disable();
    } else {
      let employee = this.form.getRawValue();
      employee['password'] = this.data.employee.password;
      this.adminService.updateEmployee(employee, action).subscribe(res => {
        if (res) {
          this.data.employee = res;
          this.snackbar.open(`Employee ${action === 'password' ? 'Password Succesufully Reset' : 'Information Successfully Updated'} !`, "", { duration: 3000 });
          if(action === 'update') this.dialogRef.close(this.data.employee);
        } else alert(res);
        this.resetEditMode();
      });
    }
  }

  resetEditMode() {
    for (let field of 'title firstName lastName birthdate status role specialization'.split(' ')) {
      this.f(field).setValue(this.data.employee[field]);
      this.f(field).disable();
    }
    this.editMode = false;
  }

  close() {
    this.dialogRef.close(null);
  }
}
