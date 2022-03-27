import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmergencyContactInfoComponent } from './components/emergencycontactinfo/emergencycontactinfo.component';
import { DemographicsComponent } from './components/demographics/patient-details.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

console.log('Loading patient module...');

@NgModule({
  declarations: [
    DashboardComponent,
    EmergencyContactInfoComponent,
    DemographicsComponent,
    PatientVisitDetailsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PatientModule { }
