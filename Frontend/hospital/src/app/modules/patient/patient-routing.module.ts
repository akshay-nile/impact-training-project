import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/patient/components/dashboard/dashboard.component';
import { DemographicsComponent } from './components/demographics/patient-details.component';
import { EmergencyContactInfoComponent } from './components/emergencycontactinfo/emergencycontactinfo.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'demographics', component: DemographicsComponent },
  { path: 'nominee', component: EmergencyContactInfoComponent },
  { path: 'visit-details', component: PatientVisitDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }