import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authgurds/authguard.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainBodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'patient',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule)
  },
  {
    path: 'nurse',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/nurse/nurse.module').then(m => m.NurseModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
