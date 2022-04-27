import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskReasonComponent } from './ask-reason/ask-reason.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { MaterialModule } from 'src/app/material.module';
import { ProfileComponent } from './profile/profile.component';

const shared = [
  AskReasonComponent,
  ChangePasswordComponent,
  ProfileDetailsComponent,
  ProfileComponent
];


@NgModule({
  declarations: shared,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: shared
})
export class SharedModule { }
