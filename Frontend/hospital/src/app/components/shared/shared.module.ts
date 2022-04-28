import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskReasonComponent } from './ask-reason/ask-reason.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { MaterialModule } from 'src/app/material.module';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';

const shared = [
  AskReasonComponent,
  ChangePasswordComponent,
  ProfileDetailsComponent,
  ProfileComponent,
  ReportComponent
];


@NgModule({
  declarations: shared,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: shared
})
export class SharedModule { }
