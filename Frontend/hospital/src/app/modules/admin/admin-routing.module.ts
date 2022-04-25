import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'patient-management', component: PatientManagementComponent },
      { path: 'data-management', component: DataManagementComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
