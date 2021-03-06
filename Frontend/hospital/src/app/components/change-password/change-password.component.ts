import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPassword, passwordValidator } from 'src/app/validators/password.validator';
import { UtilityService } from 'src/app/services/utility.service';
import { UserCredential } from 'src/app/models/UserCredential';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  registerForm!: FormGroup;
  customMessage: string = '';
  messageFlag: boolean = false;
  userCredential = new UserCredential();
  isOldPasswordCorrect: boolean = false;
  userId: number;
  constructor(private router: Router,
    private utilityService: UtilityService) {
      this.userId = JSON.parse(sessionStorage.getItem('user')).employeeId;
  }

  form = new FormGroup({
    oldpassword: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, passwordValidator, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, confirmPassword('password','confirmPassword'));

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
  }
  backToLogin() {
    this.router.navigate(['login']);
  }

  submit() {
    console.log(this.userId);

    // this.userCredential.employeeId = this.userId;
    // this.userCredential.password = this.form.value.confirmPassword;
    if (!this.isPasswordCorrect()) {
      this.customMessage = "Enter correct Old Password";
    }
    this.utilityService.changeUserPassword(this.userCredential).subscribe((result) => {
      this.customMessage = 'Password changed successfully';
      this.messageFlag = true;
      this.router.navigate(['login']);
    });

  }
  isPasswordCorrect() {

    return false;

  }
}
