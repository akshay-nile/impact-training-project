import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'patient-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() user: any;

  form!: FormGroup;
  attempts = 3;
  message = '';

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private loginService: LoginService
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
    this.utilityService.changeUserPassword(params).subscribe((res) => {
      if (res) {
        alert("Password successfully changed !");
        this.logout();
      } else {
        if (--this.attempts > 0) {
          this.message = this.attempts + " attempts are left"
          this.form.reset();
          alert("Password not changed !");
        } else {
          this.loginService.blockAccount(this.user.email).subscribe(res => {
            alert("Your account is blocked !");
            this.logout();
          });
        }
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
