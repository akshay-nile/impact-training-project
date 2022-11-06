import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllergyDialogComponent } from './components/data-management/allergy-dialog/allergy-dialog.component';
import { AllergyTabComponent } from './components/data-management/allergy-tab/allergy-tab.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { DiagnosisDialogComponent } from './components/data-management/diagnosis-dialog/diagnosis-dialog.component';
import { DiagnosisTabComponent } from './components/data-management/diagnosis-tab/diagnosis-tab.component';
import { MedicationDialogComponent } from './components/data-management/medication-dialog/medication-dialog.component';
import { MedicationTabComponent } from './components/data-management/medication-tab/medication-tab.component';
import { ProcedureDialogComponent } from './components/data-management/procedure-dialog/procedure-dialog.component';
import { ProcedureTabComponent } from './components/data-management/procedure-tab/procedure-tab.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { PatientAllergyViewComponent } from './components/patient-management/patient-view-dialog/patient-allergy-view/patient-allergy-view.component';
import { PatientDemographicViewComponent } from './components/patient-management/patient-view-dialog/patient-demographic-view/patient-demographic-view.component';
import { PatientNomineeViewComponent } from './components/patient-management/patient-view-dialog/patient-nominee-view/patient-nominee-view.component';
import { PatientProfileViewComponent } from './components/patient-management/patient-view-dialog/patient-profile-view/patient-profile-view.component';
import { PatientViewDialogComponent } from './components/patient-management/patient-view-dialog/patient-view-dialog.component';
import { EmployeeEditDialogComponent } from './components/staff-management/employee-edit-dialog/employee-edit-dialog.component';
import { EmployeeRegisterDialogComponent } from './components/staff-management/employee-register-dialog/employee-register-dialog.component';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StaffManagementComponent,
    EmployeeEditDialogComponent,
    EmployeeRegisterDialogComponent,
    PatientManagementComponent,
    PatientViewDialogComponent,
    PatientProfileViewComponent,
    PatientNomineeViewComponent,
    PatientDemographicViewComponent,
    PatientAllergyViewComponent,
    DataManagementComponent,
    DiagnosisTabComponent,
    DiagnosisDialogComponent,
    MedicationTabComponent,
    MedicationDialogComponent,
    ProcedureTabComponent,
    ProcedureDialogComponent,
    AllergyTabComponent,
    AllergyDialogComponent
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
