import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/patient/components/dashboard/dashboard.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { EmergencyContactInfoComponent } from './components/emergencycontactinfo/emergencycontactinfo.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent,children:[
      { path: '', redirectTo: 'appointment', pathMatch: 'full' },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'visit-history', component: PatientVisitHistoryComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: 'demographics', component: DemographicsComponent },
  { path: 'nominee', component: EmergencyContactInfoComponent },
  { path: 'visit-details', component: PatientVisitDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }