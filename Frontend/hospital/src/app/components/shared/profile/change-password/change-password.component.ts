import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() user: any;

  form!: FormGroup;
  label = 'Change Password';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private utilityService: UtilityService,
  ) { }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, confirmPassword('newPassword', 'confirmPassword'));

  }

  changePassword() {
    const params = {
      email: this.user.email,
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    };
    this.label = 'Please wait...';
    this.utilityService.changeUserPassword(params).subscribe(res => {
      this.label = 'Change Password';
      if (res) {
        this.snackbar.open("Password Successfully Changed !", "", { duration: 3000 });
        this.logout();
      } else {
        this.form.reset();
        alert("Incorrect Old Password !");
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
