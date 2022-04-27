import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';
import { UtilityService } from 'src/app/services/utility.service';
import { UserCredential } from 'src/app/models/UserCredential';
import { AdminService } from 'src/app/services/admin.service';
import { formatDate } from '@angular/common';
import { Employee } from 'src/app/models/Employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message: string = '';
  messageFlag: boolean = false;
  userCredential = new UserCredential();
  isOldPasswordCorrect: boolean = false;
  userId: number;
  form!: FormGroup;
  emailExists = false;
  buttonLabel = "Update";
  titles = "Mr Ms Mrs Dr".split(' ');
  roles = 'DOCTOR NURSE ADMIN'.split(' ');
  employee: any;
  isDisable = true;
  attempts = 3;
  editMode = false;

constructor(private snackbar: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private utilityService: UtilityService,
    private adminService: AdminService,
    @Inject(LOCALE_ID) private locale: string,) {
    this.employee = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.employee.employeeId;
  }

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

  get title() {
    return this.form.controls.title;
  }

  get firstName() {
    return this.form.controls.firstName;
  }

  get lastName() {
    return this.form.controls.lastName;
  }

  get birthdate() {
    return this.form.controls.birthdate;
  }

  get employeeId(){
    return this.form.controls.employeeId;
  }

  get specialization() {
    return this.form.controls.specialization;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      employeeId: new FormControl(this.employee.employeeId, []),
      title: new FormControl(this.employee.title, [Validators.required]),
      firstName: new FormControl(this.employee.firstName, [Validators.required, noSpaceValidator]),
      lastName: new FormControl(this.employee.lastName, [Validators.required, noSpaceValidator]),
      email: new FormControl(this.employee.email, []),
      birthdate: new FormControl(this.employee.birthdate, [Validators.required]),
      specialization: new FormControl(this.employee.specialization, [Validators.maxLength(10), noSpaceValidator]),
      role: new FormControl(this.employee.role, []),
      password: new FormControl(this.employee.password, [])
    });
    this.setEditMode(false);
  }
  
  // onEmailEntered() {
  //   if (this.email.valid) {
  //     this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
  //   }
  // }

  editEmployee() {
    this.adminService.updateEmployee(this.form.value, "update").subscribe(res => {
      if (res != null && res.employeeId === this.form.value.employeeId) {
        this.snackbar.open("Profile details successfully updated", "", { duration: 3000 });
        for (let field of 'title firstName lastName birthdate specialization'.split(' ')) {
          this.form.controls[field].setValue(res[field]);
        }}
    });
    this.setEditMode(false);
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
    for (let field of 'title firstName lastName birthdate specialization'.split(' ')) {
      this.form.controls[field].setValue(this.employee[field]);
      mode ? this.form.controls[field].enable() : this.form.controls[field].disable();
    }
  }

  confirmPasswordForm = new FormGroup({
    oldpassword: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    confirmPassword: new FormControl('', [Validators.required])
  }, confirmPassword('password', 'confirmPassword'));

  get f() {
    return this.confirmPasswordForm.controls;
  }

  get cpass() {
    return this.confirmPasswordForm.controls.confirmPassword;
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  submit() {
    this.userCredential.email = this.employee.email;
    this.userCredential.oldPassword = this.confirmPasswordForm.value.oldpassword;
    this.userCredential.newPassword = this.confirmPasswordForm.value.confirmPassword;
    this.utilityService.changeUserPassword(this.userCredential).subscribe((result) => {
      if (!result) {
        if (--this.attempts == 0) {
          this.loginService.blockAccount(this.form.value.email).subscribe(res =>
            this.message = "Account is Blocked!"
          );
        } else {
          this.confirmPasswordForm.reset();
          this.message = "Kindly provide correct old password";
        }
      }
      else{
        this.snackbar.open("Your password has been successfully updated. You may now login your account", "", { duration: 3000 });
        sessionStorage.clear();
        this.router.navigate(['login']);  
      }
    }
      , (err: Error) => this.message = err.message);
  }
}
