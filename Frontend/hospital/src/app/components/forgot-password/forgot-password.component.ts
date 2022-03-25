import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { MembershipService } from 'src/app/services/membership.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';
  successMessage: string = '';
  messageFlag: boolean = false;
  emailSent: boolean = false;

  constructor(private router: Router, private membershipService: MembershipService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get f() {
    return this.form.controls;
  }

  backToLogin() {
    console.log("Back to")
    this.router.navigate(['login']);
  }

  submit() {
    this.email = this.form.value.email;
    this.membershipService.getOtp(this.email).subscribe(
      (result) => {
        if (result == true) {
          this.messageFlag = true;
          this.emailSent = result;
          this.successMessage = "OTP has been sent to registered Email Id";
        }
      },
      error => {
        console.log(error);
      }

    );
  }
}
