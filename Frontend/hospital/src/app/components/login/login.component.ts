import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form?: FormGroup;
  attempts: number = 3;
  message: string = '';
  emailExist: boolean = true;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private utilityService: UtilityService,
  ) { }

  get pass() {
    return this.form.controls.password;
  }

  get email() {
    return this.form.controls.email;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator])
    });
  }

  onEmailEntered() {
    if (this.email.valid) {
      this.attempts = 3;
      this.utilityService.emailExists(this.form.value.email).subscribe(res => {
        this.emailExist = res;
      });
    }
  }

  onLoginClicked() {
    this.authenticationService.authenticate(this.form.value).subscribe(res => {
      if (res === null) {
        if (--this.attempts == 0) {
          this.loginService.blockAccount(this.form.value.email).subscribe(res =>
            this.message = "Account is Blocked!"
          );
        } else {
          this.pass.reset();
          this.message = "Wrong Password! " + this.attempts + " attempts left";
        }
      } else {
        this.attempts = 3;
        switch (res.user.status as string) {
          case "ACTIVE":
            this.form.reset();
            let role = !res.user.role ? 'patient' : res.user.role.toLowerCase();
            sessionStorage.setItem('user', JSON.stringify(res.user));
            sessionStorage.setItem('token', res.token);
            this.router.navigate([role]);
            break;
          case "BLOCKED":
            this.message = "Account was Locked!";
            break;
          case "INACTIVE":
            this.message = "Account was Deleted!";
            break;
          default:
            this.message = "Unexpected status: " + res.user.status;
        }
      }
    }, (err: Error) => this.message = err.message);
  }
}
