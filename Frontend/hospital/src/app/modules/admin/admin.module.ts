import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';
import { EmployeeEditDialogComponent } from './components/staff-management/employee-edit-dialog/employee-edit-dialog.component';
import { EmployeeRegisterDialogComponent } from './components/staff-management/employee-register-dialog/employee-register-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { PatientViewDialogComponent } from './components/patient-management/patient-view-dialog/patient-view-dialog.component';
import { PatientProfileViewComponent } from './components/patient-management/patient-view-dialog/patient-profile-view/patient-profile-view.component';
import { PatientNomineeViewComponent } from './components/patient-management/patient-view-dialog/patient-nominee-view/patient-nominee-view.component';
import { PatientDemographicViewComponent } from './components/patient-management/patient-view-dialog/patient-demographic-view/patient-demographic-view.component';
import { PatientAllergyViewComponent } from './components/patient-management/patient-view-dialog/patient-allergy-view/patient-allergy-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StaffManagementComponent,
    DataManagementComponent,
    EmployeeEditDialogComponent,
    EmployeeRegisterDialogComponent,
    PatientManagementComponent,
    PatientViewDialogComponent,
    PatientProfileViewComponent,
    PatientNomineeViewComponent,
    PatientDemographicViewComponent,
    PatientAllergyViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
