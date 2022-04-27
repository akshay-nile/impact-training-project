import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/components/shared/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: '', redirectTo: 'staff', pathMatch: 'full' },
      { path: 'staff', component: StaffManagementComponent },
      { path: 'patients', component: PatientManagementComponent },
      { path: 'data', component: DataManagementComponent },
      { path: 'profile', component:  ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
