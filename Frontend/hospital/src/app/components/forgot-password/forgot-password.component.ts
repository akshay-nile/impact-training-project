import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form?: FormGroup;
  emailExist = false;
  isOtpSent = false;
  message = '';
  buttonLabel = 'Send OTP';

  constructor(private router: Router, private forgotPassService: ForgotPasswordService) { }

  get email() {
    return this.form.controls.email;
  }

  get otp() {
    return this.form.controls.otp;
  }

  get newPass() {
    return this.form.controls.newPass;
  }

  get confirm() {
    return this.form.controls.confirm;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      otp: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      newPass: new FormControl('', [Validators.required, passwordValidator]),
      confirm: new FormControl('', [Validators.required, passwordValidator])
    }, confirmPassword('newPass', 'confirm'));
  }

  onSendOtpClick() {
    this.forgotPassService.checkEmailExist(this.form.value.email).subscribe(res => {
      this.emailExist = res;
      if (this.emailExist) {
        this.message = '';
        this.sendOtpEmail();
      } else {
        this.message = 'No account is linked with this email.';
      }
    });
  }

  sendOtpEmail() {
    this.buttonLabel = 'Sending...';
    this.forgotPassService.sendOtp(this.form.value.email).subscribe(res => {
      this.isOtpSent = res;
      if (this.isOtpSent) {
        this.message = 'A six digit OTP has been sent to your email.';
        this.buttonLabel = 'Reset Password';
      } else {
        this.message = 'Something went wrong! OTP could not be sent.';
        this.email.enable();
        this.buttonLabel = 'Send OTP';
      }
    });
  }

  resetPassword() {
    if(this.form.invalid) {
      return;
    }
    const passUpdate = {
      email: this.form.value.email as string,
      oldPassword: this.form.value.otp as string,
      newPassword: this.form.value.newPass as string
    };
    this.forgotPassService.resetPassword(passUpdate).subscribe(res => {
      console.log(res);
      this.form.reset();
      this.isOtpSent = false;
      this.emailExist = false;
      this.buttonLabel = 'Send OTP';
      switch (res as string) {
        case 'success':
          alert("Your password has been successfully reset.");
          this.router.navigate(['login']);
          break;
        case 'expired':
          alert("OTP you entered was expired. Please try again.");
          break;
        case 'failed':
          alert("Failed to reset your password.");
          break;
        default:
          this.message = 'Something went wrong! Could not reset password.';
      }
    });
  }
}
