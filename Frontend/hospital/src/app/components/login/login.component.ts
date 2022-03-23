import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  customMessage: string = '';
  messageFlag: boolean = false;
  emailSent: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])[A-Za-z0-9]{8,}$')])
  });

  get f() {
    return this.form.controls;
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  submit() {
    this.email = this.form.value.email;
    this.password = this.form.value.password;
    // this.forgotPasswordService.getOtp(this.inputEmail).subscribe(
    //   (result) => {
    //     if (result == true) {
    //       this.messageFlag = true;
    //       this.emailSent = result;
    //       this.customMessage = "OTP has been sent to registered Email Id";
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }

    // );
  }
  forgotPassword() {
    console.log('Inside ')
    this.router.navigate(['forgot-password']);
  }

}
