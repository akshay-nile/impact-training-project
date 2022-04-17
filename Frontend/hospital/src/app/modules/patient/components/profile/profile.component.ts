import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';
import { UtilityService } from 'src/app/services/utility.service';
import { UserCredential } from 'src/app/models/UserCredential';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  // message: string = '';
  // messageFlag: boolean = false;
  // userCredential = new UserCredential();
  // isOldPasswordCorrect: boolean = false;
  // patientId: number;
  // form!: FormGroup;
  // emailExists = false;
  // buttonLabel = "Update";
  // titles = 'Mr Ms Mrs'.split(' ');
  // genders = 'Male Female'.split(' ');
  // isDisable = true;
  // attempts = 3;

  constructor(
    // private snackbar: MatSnackBar,
    private router: Router,
    // private loginService: LoginService,
    // private adminService: AdminService,
    // @Inject(LOCALE_ID) private locale: string
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // this.patientId = this.patient.patientId;
    
    // this.form = new FormGroup({
    //   birthdate: new FormControl('', [Validators.required]),
    //   age: new FormControl({ value: this.calcAge(), disabled: true }, [Validators.required]),
    //   phone: new FormControl('', [Validators.required,
    //   Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    //   gender: new FormControl({ value: this.guessGender(), disabled: true }, [Validators.required]),
    //   race: new FormControl('', [Validators.required]),
    //   ethnicity: new FormControl('', [Validators.required]),
    //   language: new FormControl('', [Validators.required]),
    //   address: new FormControl('', [Validators.required]),
    //   nomineeTitle: new FormControl(''),
    //   nomineeFirstName: new FormControl('', [Validators.required]),
    //   nomineeLastName: new FormControl('', [Validators.required]),
    //   relationship: new FormControl('', [Validators.required]),
    //   nomineeEmail: new FormControl('', [Validators.required, Validators.email]),
    //   nomineePhone: new FormControl('', [Validators.required,
    //   Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    //   nomineeAddress: new FormControl('', [Validators.required])
    // });
  }

  // get today() {
  //   let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
  //   let date = new Date(Date.now().valueOf() - miliSeconds);
  //   return formatDate(date, 'yyyy-MM-dd', this.locale);
  // }

  
  // get nomineeTitle() {
  //   return this.form.controls.nomineeTitle;
  // }

  // get nomineeFirstName() {
  //   return this.form.controls.nomineeFirstName;
  // }

  // get nomineeLastName() {
  //   return this.form.controls.nomineeLastName;
  // }

  // get relationship() {
  //   return this.form.controls.relationship;
  // }

  // get nomineeEmail() {
  //   return this.form.controls.nomineeEmail;
  // }


  // get nomineePhone() {
  //   return this.form.controls.nomineePhone;
  // }

  // get nomineeAddress() {
  //   return this.form.controls.nomineeAddress;
  // }

  ngOnInit(): void {
  }

  // onEmailEntered() {
  //   if (this.email.valid) {
  //     this.utilityService.emailExists(this.form.value.email).subscribe(res => this.emailExists = res);
  //   }
  // }

  // editPatient() {
  //   this.buttonLabel = "Updating..."
  //   this.utilityService.updatePatientDetails(this.patient).subscribe(res => {
  //     this.buttonLabel = 'Edit';
  //     if (res != null && res.patientId > 0) {
  //       this.snackbar.open("Profile details successfully updated", "", { duration: 3000 });
  //     }
  //   });
  // }

  // confirmPasswordForm = new FormGroup({
  //   oldpassword: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
  //   password: new FormControl('', [Validators.required, passwordValidator]),
  //   confirmPassword: new FormControl('', [Validators.required])
  // }, confirmPassword('password', 'confirmPassword'));

  // get f() {
  //   return this.confirmPasswordForm.controls;
  // }

  // get cpass() {
  //   return this.confirmPasswordForm.controls.confirmPassword;
  // }

  // backToLogin() {
  //   this.router.navigate(['login']);
  // }

  // submit() {
  //   this.userCredential.email = this.patient.email;
  //   this.userCredential.oldPassword = this.confirmPasswordForm.value.oldpassword;
  //   this.userCredential.newPassword = this.confirmPasswordForm.value.confirmPassword;
  //   this.utilityService.changeUserPassword(this.userCredential).subscribe((result) => {
  //     if (!result) {
  //       if (--this.attempts == 0) {
  //         this.loginService.blockAccount(this.form.value.email).subscribe(res =>
  //           this.message = "Account is Blocked!"
  //         );
  //       } else {
  //         this.confirmPasswordForm.reset();
  //         this.message = "Kindly provide correct old password";
  //       }
  //     }
  //     else {
  //       this.snackbar.open("Your password has been successfully updated. You may now login your account", "", { duration: 3000 });
  //       sessionStorage.clear();
  //       this.router.navigate(['login']);
  //     }
  //   }
  //     , (err: Error) => this.message = err.message);
  // }
}
