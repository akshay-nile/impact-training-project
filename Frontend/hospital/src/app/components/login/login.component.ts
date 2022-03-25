import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  attempts: number = 3;
  user: any;
  customMessage: string = '';
  messageFlag: boolean = false;
  emailFound: boolean = false;

  constructor(private router: Router, private membershipService: MembershipService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])[A-Za-z0-9]{8,}$')])
    });
  }

  get f() {
    return this.form.controls;
  }

  onEmailEntered() {
    if (this.form.controls.email.valid) {
      this.attempts = 3;
      this.membershipService.checkEmailExist(this.form.value.email).subscribe(res => {
        this.emailFound = res;
        if (!this.emailFound) {
          this.messageFlag = true;
          this.customMessage = "No records found for this email";
        } else {
          this.messageFlag = false;
          this.customMessage = "";
        }
      });
    }
  }

  submit() {
    if (this.emailFound) {
      this.membershipService.login(this.form.value).subscribe(res => {
        if (res === null) {
          this.messageFlag = true;
          if (--this.attempts == 0) {
            this.membershipService.block(this.form.value.email).subscribe(res => this.customMessage = "Your account is blocked!");
          } else {
            this.form.controls.password.reset();
            this.customMessage = "Wrong Password! " + this.attempts + " login attempts remaining.";
          }
        } else {
          this.attempts = 3;
          this.user = res;
          this.form.reset();
          if (this.user.status !== "ACTIVE") {
            this.messageFlag = true;
            this.customMessage = "Your account is locked!";
          } else {
            console.log(this.user);
            let role = !this.user.role ? 'patient' : this.user.role.toLowerCase();
            this.router.navigate([role, 'dashboard']);
          }
        }
      },
        (err: Error) => {
          this.messageFlag = true;
          this.customMessage = err.message;
          this.form.reset();
        });
    }
  }

  forgotPassword() {
    console.log('Inside ')
    this.router.navigate(['forgot-password']);
  }

}
