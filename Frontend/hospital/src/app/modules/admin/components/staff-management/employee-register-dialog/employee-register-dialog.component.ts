import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { UtilityService } from 'src/app/services/utility.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'employee-register-dialog',
  templateUrl: './employee-register-dialog.component.html',
  styleUrls: ['./employee-register-dialog.component.css']
})
export class EmployeeRegisterDialogComponent {

  form!: FormGroup;
  emailExists = false;

  constructor(
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<EmployeeRegisterDialogComponent>,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, noSpaceValidator]),
      lastName: new FormControl('', [Validators.required, noSpaceValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
      role: new FormControl(''),
      specialization: new FormControl({ value: '', disabled: true }, [Validators.required, noSpaceValidator]),
    });
  }

  get today() {
    let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
    let date = new Date(Date.now().valueOf() - miliSeconds);
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  f(field: string) {
    return this.form.controls[field];
  }

  onEmailEntered() {
    if (this.f('email').valid) {
      this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
    }
  }

  registerEmployee() {
    let employee = this.form.getRawValue();
    this.adminService.registerEmployee(employee).subscribe(res => {
      if (res) {
        this.snackbar.open('Employee Successfully Registered !', "", { duration: 3000 });
        this.dialogRef.close(res);
      } else alert(res);
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}
